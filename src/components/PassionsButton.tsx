import {
  Rocket,
  Telescope,
  HeartPulse,
  Gamepad,
  Zap,
  Wrench,
  Sparkles,
  Music,
} from "lucide-react";
import type { BadgeItem } from "./Badge";
import { ExpandableSection } from "./ExpandableSection";

const passions: BadgeItem[] = [
  {
    Icon: Rocket,
    label: "Innovation",
    color: "bg-emerald-100 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>Fascinated by world-changing ideas.</p>
        <p>Waiting for flying cars (can't drive normal ones anyway).</p>
      </div>
    ),
  },
  {
    Icon: Telescope,
    label: "Code Explorer",
    color: "bg-cyan-100 text-cyan-700",
    description: (
      <div className="space-y-3">
        <p>Love trying out new tech.</p>
        <p>My GitHub is a graveyard of experiments.</p>
      </div>
    ),
  },
  {
    Icon: HeartPulse,
    label: "Running",
    color: "bg-indigo-100 text-indigo-700",
    description: (
      <div className="space-y-3">
        <p>Running from my problems.</p>
        <p>Literally.</p>
      </div>
    ),
  },
  {
    Icon: Gamepad,
    label: "Game Development",
    color: "bg-fuchsia-100 text-fuchsia-700",
    description: (
      <div className="space-y-3">
        <p>Making games is like solving puzzles.</p>
        <p>Bugs included, free of charge.</p>
      </div>
    ),
  },
  {
    Icon: Zap,
    label: "New Challenges",
    color: "bg-pink-100 text-pink-700",
    description: (
      <div className="space-y-3">
        <p>If it scares me, I'm doing it.</p>
        <p>What's the worst that could happen?</p>
      </div>
    ),
  },
  {
    Icon: Wrench,
    label: "Side Projects",
    color: "bg-rose-100 text-rose-700",
    description: (
      <div className="space-y-3">
        <p>Building stuff just because I can.</p>
        <p>Finished projects: 404.</p>
      </div>
    ),
  },
  {
    Icon: Sparkles,
    label: "AI",
    color: "bg-orange-100 text-orange-700",
    description: (
      <div className="space-y-3">
        <p>Fascinated by AI possibilities.</p>
        <p>Please don't take my job.</p>
      </div>
    ),
  },
  {
    Icon: Music,
    label: "Music",
    color: "bg-violet-100 text-violet-700",
    description: (
      <div className="space-y-3">
        <p>Could spend hours making the perfect playlist.</p>
        <p>Silence is overrated anyway.</p>
      </div>
    ),
  },
];

export function PassionButton() {
  return (
    <ExpandableSection
      label="interests"
      textColor="text-red-500"
      items={passions}
    />
  );
}
