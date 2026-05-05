// contexts/OfflineContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface OfflineContextType {
  isOnline: boolean;
  isOffline: boolean;
  pendingActions: PendingAction[];
  addPendingAction: (action: PendingAction) => void;
  clearPendingAction: (id: string) => void;
  retryPendingAction: (id: string) => Promise<void>;
}

export interface PendingAction {
  id: string;
  type: 'checkout' | 'order' | 'update' | 'create';
  data: any;
  timestamp: number;
  retryCount: number;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const isOnline = useOnlineStatus();
  const [pendingActions, setPendingActions] = useState<PendingAction[]>(() => {
    const saved = localStorage.getItem('pendingActions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pendingActions', JSON.stringify(pendingActions));
  }, [pendingActions]);

  useEffect(() => {
    if (isOnline && pendingActions.length > 0) {
      // Attempt to sync pending actions when coming back online
      syncPendingActions();
    }
  }, [isOnline]);

  const syncPendingActions = async () => {
    for (const action of pendingActions) {
      await retryPendingAction(action.id);
    }
  };

  const addPendingAction = (action: PendingAction) => {
    setPendingActions(prev => [...prev, action]);
  };

  const clearPendingAction = (id: string) => {
    setPendingActions(prev => prev.filter(a => a.id !== id));
  };

  const retryPendingAction = async (id: string) => {
    const action = pendingActions.find(a => a.id === id);
    if (!action) return;

    // Implement retry logic based on action type
    // This will depend on your API structure
    try {
      // Example: retry the action
      // await retryAction(action);
      clearPendingAction(id);
    } catch (error) {
      console.error('Failed to retry action:', error);
      setPendingActions(prev =>
        prev.map(a =>
          a.id === id ? { ...a, retryCount: a.retryCount + 1 } : a
        )
      );
    }
  };

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        isOffline: !isOnline,
        pendingActions,
        addPendingAction,
        clearPendingAction,
        retryPendingAction,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within OfflineProvider');
  }
  return context;
}