// components/feedback/OfflineState.tsx
// components/feedback/OfflineState.tsx
import { WifiOff, RefreshCw, Database } from 'lucide-react';

interface OfflineStateProps {
  hasCachedData?: boolean;
  onRetry?: () => void;
  pendingActions?: number;
}

export function OfflineState({ hasCachedData = false, onRetry, pendingActions = 0 }: OfflineStateProps) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
        <WifiOff className="w-8 h-8 text-yellow-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        ከኢንተርኔት ጋር አልተገናኘም
      </h3>
      <p className="text-gray-500 mb-4">
        እባክዎ የኢንተርኔት ግንኙነትዎን ያረጋግጡ
      </p>
      
      {hasCachedData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 max-w-md mx-auto">
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <Database size={18} />
            <span className="font-semibold">ከማህደር የተወሰደ ውሂብ</span>
          </div>
          <p className="text-sm text-blue-600">
            የቀድሞ ውሂብ እያዩ ነው። አንዳንድ መረጃዎች ያልተሟሉ ሊሆኑ ይችላሉ።
          </p>
        </div>
      )}

      {pendingActions > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 max-w-md mx-auto">
          <p className="text-sm text-orange-700">
            {pendingActions} ያልተሟሉ ተግባራት አሉ። ኢንተርኔት ሲመለስ በራስ ሰር ይሞከራሉ።
          </p>
        </div>
      )}

      {onRetry && (
        <button onClick={onRetry} className="btn-primary inline-flex items-center gap-2">
          <RefreshCw size={18} />
          እንደገና ሞክር
        </button>
      )}
    </div>
  );
}