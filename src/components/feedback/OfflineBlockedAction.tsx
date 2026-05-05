// components/feedback/OfflineBlockedAction.tsx
import { WifiOff, X } from 'lucide-react';

interface OfflineBlockedActionProps {
  actionName: string;
  onDismiss?: () => void;
}

export function OfflineBlockedAction({ actionName, onDismiss }: OfflineBlockedActionProps) {
  return (
    <div className="fixed bottom-20 right-4 z-50 animate-slide-up">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <WifiOff className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-yellow-800 mb-1">
              ድርጊቱ አልተሟላም
            </h4>
            <p className="text-sm text-yellow-700">
              "{actionName}" ን ለማከናወን የኢንተርኔት ግንኙነት ያስፈልጋል።
              እባክዎ ከበይነመረቡ ጋር ተገናኝተው እንደገና ይሞክሩ።
            </p>
          </div>
          {onDismiss && (
            <button onClick={onDismiss} className="flex-shrink-0">
              <X size={16} className="text-yellow-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}