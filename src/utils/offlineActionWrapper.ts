// utils/offlineActionWrapper.ts
import { showError } from './toast';
import { PendingAction, useOffline } from '../contexts/OfflineContext';

interface ActionOptions {
  requireOnline?: boolean;
  cacheable?: boolean;
  pendingActionType?: PendingAction['type'];
  onOfflineBlock?: () => void;
  onPendingSaved?: () => void;
}

export function createOfflineAction<T extends (...args: any[]) => Promise<any>>(
  action: T,
  options: ActionOptions = {}
): T {
  const { requireOnline = true, pendingActionType, onOfflineBlock, onPendingSaved } = options;

  return (async (...args: Parameters<T>) => {
    const isOnline = navigator.onLine;
    
    // If action requires internet and we're offline
    if (requireOnline && !isOnline) {
      if (onOfflineBlock) {
        onOfflineBlock();
      } else {
        showError('ይህን ድርጊት ለማከናወን የኢንተርኔት ግንኙነት ያስፈልጋል');
      }
      throw new Error('Offline: Action requires internet connection');
    }

    try {
      const result = await action(...args);
      return result;
    } catch (error) {
      // If offline and action is cacheable, save for later
      if (!isOnline && options.cacheable && pendingActionType) {
        const pendingAction: PendingAction = {
          id: `${Date.now()}-${Math.random()}`,
          type: pendingActionType,
          data: args[0],
          timestamp: Date.now(),
          retryCount: 0,
        };
        
        // Save to localStorage via context
        const { addPendingAction } = useOffline();
        addPendingAction(pendingAction);
        
        if (onPendingSaved) {
          onPendingSaved();
        } else {
          showError('ድርጊቱ ተቀምጧል። ኢንተርኔት ሲመለስ በራስ ሰር ይከናወናል');
        }
      }
      throw error;
    }
  }) as T;
}

