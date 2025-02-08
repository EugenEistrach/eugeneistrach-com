import {
  Rocket,
  Telescope,
  HeartPulse,
  Gamepad,
  Zap,
  Wrench,
  Sparkles,
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
        <p>Exploring new ways to solve everyday problems with technology.</p>
        <p>Always excited to try out fresh ideas and approaches.</p>
      </div>
    ),
  },
  {
    Icon: Telescope,
    label: "Tech Exploration",
    color: "bg-cyan-100 text-cyan-700",
    description: (
      <div className="space-y-3">
        <p>Discovering and learning about new technologies and tools.</p>
        <p>Understanding how they can make our lives better.</p>
      </div>
    ),
  },
  {
    Icon: HeartPulse,
    label: "Running",
    color: "bg-indigo-100 text-indigo-700",
    description: (
      <div className="space-y-3">
        <p>Staying active and healthy through regular running.</p>
        <p>Finding the perfect balance between work and wellness.</p>
      </div>
    ),
  },
  {
    Icon: Gamepad,
    label: "Game Development",
    color: "bg-fuchsia-100 text-fuchsia-700",
    description: (
      <div className="space-y-3">
        <p>Creating fun and engaging games as a creative outlet.</p>
        <p>Learning about game design and interactive experiences.</p>
      </div>
    ),
  },
  {
    Icon: Zap,
    label: "New Challenges",
    color: "bg-pink-100 text-pink-700",
    description: (
      <div className="space-y-3">
        <p>Taking on difficult projects that push my boundaries.</p>
        <p>Growing through continuous learning and adaptation.</p>
      </div>
    ),
  },
  {
    Icon: Wrench,
    label: "Side Projects",
    color: "bg-rose-100 text-rose-700",
    description: (
      <div className="space-y-3">
        <p>Building useful tools and apps in my free time.</p>
        <p>Turning interesting ideas into real projects.</p>
      </div>
    ),
  },
  {
    Icon: Sparkles,
    label: "AI",
    color: "bg-orange-100 text-orange-700",
    description: (
      <div className="space-y-3">
        <p>Exploring how AI can help solve real-world problems.</p>
        <p>Making technology smarter and more helpful.</p>
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
