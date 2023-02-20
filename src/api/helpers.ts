import { NetworkStatus } from "@apollo/client";

// memoize
export const getApolloNetworkStatus = (status: NetworkStatus) => {
  return {
    isLoading: status === NetworkStatus.loading,
    isError: status === NetworkStatus.error,
    isIdle: status === NetworkStatus.ready,
    isFetchingMore: status === NetworkStatus.fetchMore,
    isRefetching: status === NetworkStatus.refetch,
    isPolling: status === NetworkStatus.poll,
    isReady: status === NetworkStatus.ready,
  };
};
