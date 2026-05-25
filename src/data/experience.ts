export interface Experience {
  id?: string;
  name: string;
  company?: string;
  role: string;
  description: string[];
  duration: string;
  technologies: string[];
  logo: string;
  left: boolean;
  type: "achievement" | "experience" | "education";
  iconType: "trophy" | "medal" | "code" | "academic";
  isCurrent?: boolean;
  positions?: {
    role: string;
    duration: string;
    type: "promotion" | "role_change";
  }[];
}

export const experienceData: Experience[] = [
  {
    id: "1",
    name: "Kakiyo OÜ",
    role: "Full Stack Developer",
    company: "",
    duration: "Jan 2026 - Present",
    isCurrent: true,
    positions: [
      {
        role: "Full Stack Developer",
        duration: "Jan 2026 - Present",
        type: "promotion",
      },
      {
        role: "Frontend Developer",
        duration: "Nov 2025 - Jan 2026",
        type: "role_change",
      },
    ],
    description: [
      "Fully implemented the company hiring platform end-to-end, from candidate flows and admin moderation to interview scheduling and review workflows.",
      "Built a content creation dashboard for the content team, enabling collaborative editing and faster, AI-assisted publishing.",
      "Improved the dashboard UX with cleaner navigation between pages and a smoother day-to-day flow for the team.",
      "Simplified the user onboarding flow on the dashboard, reducing friction and helping new users get to their first action faster.",
      "Shipped polished micro-interactions and motion details across the product to make key moments feel premium and easy to follow.",
    ],
    technologies: [
      "Next.js",
      "React.js",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Appwrite",
      "PlanetScale",
      "Redis",
    ],
    logo: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1757182382/logo_etjtoe.png",
    left: false,
    type: "experience",
    iconType: "code",
  },
];
