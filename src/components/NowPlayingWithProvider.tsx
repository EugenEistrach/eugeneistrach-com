"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NowPlaying from "./NowPlaying";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function NowPlayingWithProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <NowPlaying />
    </QueryClientProvider>
  );
}
