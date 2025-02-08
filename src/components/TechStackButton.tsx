import type { BadgeItem } from "./Badge";
import { ExpandableSection } from "./ExpandableSection";

const techStack: BadgeItem[] = [
  {
    label: "React",
    Icon: "/icons/tech/react-light.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>A popular tool for building interactive websites and apps.</p>
        <p>Makes websites feel smooth and responsive to user actions.</p>
      </div>
    ),
  },
  {
    label: "TypeScript",
    Icon: "/icons/tech/typescript.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>An enhanced version of JavaScript that helps catch errors early.</p>
        <p>Makes code more reliable and easier to maintain.</p>
      </div>
    ),
  },
  {
    label: "Motion",
    Icon: "/icons/tech/motion-light.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>Adds smooth animations and transitions to websites.</p>
        <p>Makes the user experience more engaging and dynamic.</p>
      </div>
    ),
  },
  {
    label: "Astro",
    Icon: "/icons/tech/astro-light.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>A modern tool for building fast-loading websites.</p>
        <p>Combines the best parts of different web technologies.</p>
      </div>
    ),
  },
  {
    label: "Shopify",
    Icon: "/icons/tech/shopify.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>A platform for building and running online stores.</p>
        <p>Makes it easy to sell products and manage inventory.</p>
      </div>
    ),
  },
  {
    label: "TailwindCSS",
    Icon: "/icons/tech/tailwindcss.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>A tool for quickly styling websites and making them look good.</p>
        <p>Helps create consistent and responsive designs.</p>
      </div>
    ),
  },
  {
    label: "Figma",
    Icon: "/icons/tech/figma.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>A design tool for creating website and app layouts.</p>
        <p>Helps plan how things will look before building them.</p>
      </div>
    ),
  },
  {
    label: "Playwright",
    Icon: "/icons/tech/playwright.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>Automatically tests websites to ensure everything works.</p>
        <p>Helps catch problems before users see them.</p>
      </div>
    ),
  },
  {
    label: "Tanstack",
    Icon: "/icons/tech/tanstack.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>A family of tools that help build better websites.</p>
        <p>Handles common tasks like navigation and data loading.</p>
      </div>
    ),
  },
  {
    label: "Node.js",
    Icon: "/icons/tech/nodejs.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>Runs JavaScript code on servers instead of just browsers.</p>
        <p>Powers the behind-the-scenes parts of websites.</p>
      </div>
    ),
  },
  {
    label: "PostgreSQL",
    Icon: "/icons/tech/postgresql.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>A powerful database system for storing and organizing data.</p>
        <p>Keeps information safe and easy to access.</p>
      </div>
    ),
  },
  {
    label: "SQLite",
    Icon: "/icons/tech/sqlite.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>A reliable database that stores information directly in your app.</p>
        <p>Works great for both small and large projects.</p>
      </div>
    ),
  },
  {
    label: "Docker",
    Icon: "/icons/tech/docker.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>Helps automate the process of deploying applications.</p>
        <p>Makes it quick and reliable to update apps with new features.</p>
      </div>
    ),
  },
  {
    label: "Azure",
    Icon: "/icons/tech/azure.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>Microsoft's cloud platform for running websites and services.</p>
        <p>Provides powerful tools for hosting and scaling apps.</p>
      </div>
    ),
  },
  {
    label: "Vercel",
    Icon: "/icons/tech/vercel-light.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>A platform that makes deploying websites quick and easy.</p>
        <p>Automatically handles many technical details.</p>
      </div>
    ),
  },
  {
    label: "GitHub",
    Icon: "/icons/tech/github-light.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>A platform for storing and sharing code with others.</p>
        <p>Makes it easy to collaborate on projects.</p>
      </div>
    ),
  },
  {
    label: "Git",
    Icon: "/icons/tech/git.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>Tracks changes in code over time.</p>
        <p>Helps teams work together without conflicts.</p>
      </div>
    ),
  },
  {
    label: "Claude AI",
    Icon: "/icons/tech/claude-ai-icon.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>An AI assistant that helps with various tasks.</p>
        <p>Can understand and generate human-like text.</p>
      </div>
    ),
  },
  {
    label: "v0",
    Icon: "/icons/tech/v0-light.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>An AI tool that helps turn designs into code.</p>
        <p>Speeds up the process of building websites.</p>
      </div>
    ),
  },
  {
    label: "Raycast",
    Icon: "/icons/tech/raycast.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>A productivity tool that makes computer tasks faster.</p>
        <p>Provides quick access to common actions.</p>
      </div>
    ),
  },
  {
    label: "Cursor",
    Icon: "/icons/tech/cursor.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>An AI-powered editor that can understand and help write code.</p>
        <p>Can automate complex coding tasks and increase productivity.</p>
      </div>
    ),
  },
  {
    label: "OpenAI",
    Icon: "/icons/tech/OpenAI_light.svg",
    color: "border-emerald-500 text-emerald-700",
    description: (
      <div className="space-y-3">
        <p>Provides tools to add AI features to applications.</p>
        <p>Powers features like chat assistants and text generation.</p>
      </div>
    ),
  },
];

export function TechStackButton() {
  return (
    <ExpandableSection
      label="technologies"
      textColor="text-emerald-500"
      items={techStack}
    />
  );
}
