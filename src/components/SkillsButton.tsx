import {
  Lightbulb,
  Code2,
  Workflow,
  Layers,
  Globe,
  BadgeCheck,
  MessageCircle,
} from "lucide-react";
import type { BadgeItem } from "./Badge";
import { ExpandableSection } from "./ExpandableSection";

const skills: BadgeItem[] = [
  {
    Icon: Lightbulb,
    label: "Problem Solving",
    color: "bg-lime-100 text-lime-700",
    description: (
      <div className="space-y-3">
        <p>
          Taking big, complex problems and breaking them down into smaller,
          manageable pieces.
        </p>
        <p>
          Finding creative solutions by looking at problems from different
          angles.
        </p>
      </div>
    ),
  },
  {
    Icon: Code2,
    label: "Development",
    color: "bg-yellow-100 text-yellow-700",
    description: (
      <div className="space-y-3">
        <p>
          Building websites and applications that are easy to use and maintain.
        </p>
        <p>
          Writing code that's clean, efficient, and works well for everyone.
        </p>
      </div>
    ),
  },
  {
    Icon: Workflow,
    label: "Automation",
    color: "bg-red-100 text-red-700",
    description: (
      <div className="space-y-3">
        <p>
          Making computers do repetitive tasks automatically, saving time and
          reducing errors.
        </p>
        <p>Creating tools that help teams work faster and more efficiently.</p>
      </div>
    ),
  },
  {
    Icon: Layers,
    label: "Architecture",
    color: "bg-orange-100 text-orange-700",
    description: (
      <div className="space-y-3">
        <p>
          Planning how different parts of a system work together, like
          blueprints for a building.
        </p>
        <p>Making sure systems are built to grow and adapt over time.</p>
      </div>
    ),
  },
  {
    Icon: Globe,
    label: "Platform Operations",
    color: "bg-amber-100 text-amber-700",
    description: (
      <div className="space-y-3">
        <p>
          Keeping online services running smoothly and reliably around the
          clock.
        </p>
        <p>
          Making sure systems are fast, secure, and always available when
          needed.
        </p>
      </div>
    ),
  },
  {
    Icon: BadgeCheck,
    label: "Quality Assurance",
    color: "bg-green-100 text-green-700",
    description: (
      <div className="space-y-3">
        <p>Making sure everything works correctly before it goes live.</p>
        <p>Finding and fixing problems early to deliver reliable software.</p>
      </div>
    ),
  },
  {
    Icon: MessageCircle,
    label: "Support",
    color: "bg-blue-100 text-blue-700",
    description: (
      <div className="space-y-3">
        <p>
          Helping team members solve technical problems and learn new skills.
        </p>
        <p>
          Making complex technical concepts easy to understand for everyone.
        </p>
      </div>
    ),
  },
];

export function SkillButton() {
  return (
    <ExpandableSection
      label="wear many hats"
      textColor="text-blue-500"
      items={skills}
    />
  );
}
