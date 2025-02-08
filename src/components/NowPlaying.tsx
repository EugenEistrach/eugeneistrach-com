"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useQuery } from "@tanstack/react-query";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
}

async function fetchSpotifyData(): Promise<SpotifyData> {
  const response = await fetch("/api/spotify-now-playing");
  if (!response.ok) {
    throw new Error("Failed to fetch Spotify data");
  }
  return response.json();
}

export default function NowPlaying() {
  const { data: spotifyData = { isPlaying: false }, isLoading } = useQuery({
    queryKey: ["spotify-now-playing"],
    queryFn: fetchSpotifyData,
    refetchInterval: 5000,
  });

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex items-center gap-2 px-2 ">
          <motion.div
            className="h-7 w-7 flex items-center justify-center"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              className="w-4 h-4 text-[#1DB954]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-100"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </motion.div>
          <span className="text-xs font-medium text-white/80">
            Loading status...
          </span>
        </div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        {spotifyData.isPlaying ? (
          <PlayingRing key="playing" spotifyData={spotifyData} />
        ) : (
          <NotPlayingRing key="not-playing" />
        )}
      </AnimatePresence>
    );
  }, [isLoading, spotifyData]);

  return (
    <div className="relative flex h-10  items-center justify-center md:justify-end">
      <motion.div
        layout
        transition={{
          type: "spring",
          bounce: 0.5,
        }}
        style={{ borderRadius: 32 }}
        className=" w-fit min-w-[100px] overflow-hidden rounded-full bg-black"
      >
        <motion.div
          transition={{
            type: "spring",
            bounce: 0.5,
          }}
          initial={{
            scale: 0.9,
            opacity: 0,
            filter: "blur(5px)",
          }}
          animate={{
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              delay: 0.05,
            },
          }}
        >
          {content}
        </motion.div>
      </motion.div>
    </div>
  );
}

function NotPlayingRing() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="relative flex h-9 items-center"
      style={{ width: 266 }}
    >
      <div className="relative h-7 w-7 ml-1 shrink-0">
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="flex h-full w-full items-center justify-center bg-[#2a2a2a]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-white"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center px-2">
        <span className="truncate text-xs font-medium text-white">
          Making the perfect playlist
        </span>
      </div>
    </motion.div>
  );
}

function PlayingRing({ spotifyData }: { spotifyData: SpotifyData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="relative flex h-9 items-center"
      style={{ width: 266 }}
    >
      <a
        href={spotifyData.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-full w-full items-center group hover:scale-[1.02] transition-transform"
      >
        <div className="relative h-7 w-7 ml-1 shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={spotifyData.albumArt}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 overflow-hidden rounded-full"
            >
              {spotifyData.albumArt ? (
                <img
                  src={spotifyData.albumArt}
                  alt={spotifyData.title || "Album Art"}
                  className="h-full w-full object-cover transition-all group-hover:brightness-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#2a2a2a]" />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-[1.5px] border-black bg-[#1DB954]">
            <div className="absolute inset-0 rounded-full bg-[#1DB954] animate-pulse" />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center px-2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${spotifyData.title}-${spotifyData.artist}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col"
            >
              <span className="truncate text-xs font-medium text-white transition-colors group-hover:text-[#1DB954]">
                {spotifyData.title}
              </span>
              <span className="truncate text-[10px] text-white/65 transition-opacity group-hover:text-white/80">
                {spotifyData.artist}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative h-7 w-7 ml-auto mr-1 shrink-0">
          <div className="absolute inset-0 rounded-full bg-[#1DB954]/10 overflow-hidden transition-colors group-hover:bg-[#1DB954]/20">
            <div className="flex h-full items-center justify-center gap-[2px]">
              {[0.8, 1, 0.6, 0.4, 0.9].map((height, i) => (
                <motion.div
                  key={i}
                  className="h-[16px] w-[2px] bg-[#1DB954]"
                  animate={{
                    scaleY: [height, 0.2, height],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  style={{
                    transformOrigin: "center",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
