// hooks/useOfflineGuard.ts
import { useOffline } from '../contexts/OfflineContext';
import { showError } from '../utils/toast';
import { useState } from 'react';

export function useOfflineGuard() {
  const { isOffline, pendingActions } = useOffline();
  const [showBlockedMessage, setShowBlockedMessage] = useState<string | null>(null);

  const guardAction = (actionName: string, action: () => void | Promise<void>) => {
    if (isOffline) {
      setShowBlockedMessage(actionName);
      showError(`"${actionName}" ለማከናወን የኢንተርኔት ግንኙነት ያስፈልጋል`);
      setTimeout(() => setShowBlockedMessage(null), 5000);
      return false;
    }
    
    action();
    return true;
  };

  return {
    guardAction,
    isOffline,
    hasPendingActions: pendingActions.length > 0,
    pendingActionsCount: pendingActions.length,
    showBlockedMessage,
  };
}