// // hooks/useOfflineQuery.ts
// import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
// import { useOffline } from '../contexts/OfflineContext';
// import { useEffect, useState } from 'react';

// interface OfflineQueryOptions<TData = unknown> extends Omit<UseQueryOptions<TData>, 'queryKey'> {
//   queryKey: unknown[];
//   cacheOnly?: boolean;
//   showOfflineUI?: boolean;
// }

// interface OfflineQueryResult<TData> extends UseQueryResult<TData> {
//   isOfflineError: boolean;
//   hasCachedData: boolean;
// }

// export function useOfflineQuery<TData = unknown>(
//   options: OfflineQueryOptions<TData>
// ): OfflineQueryResult<TData> {
//   const { isOffline } = useOffline();
//   const [hasCachedData, setHasCachedData] = useState(false);
  
//   const queryResult = useQuery({
//     retry: isOffline ? 0 : 3,
//     retryDelay: 1000,
//     staleTime: isOffline ? 1000 * 60 * 5 : 1000 * 60,
//     ...options,
//   });

//   // Check if we have cached data available
//   useEffect(() => {
//     if (queryResult.data && !queryResult.isLoading) {
//       setHasCachedData(true);
//     }
//   }, [queryResult.data, queryResult.isLoading]);

//   const isOfflineError = isOffline && queryResult.isError && !hasCachedData;

//   return {
//     ...queryResult,
//     isOfflineError,
//     hasCachedData,
//   };
// }