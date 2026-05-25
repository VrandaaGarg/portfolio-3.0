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
      "Shipped end-to-end product features across the marketing site and dashboard, owning the work from UI design through API integration.",
      "Built high-touch micro-interactions and polished UX patterns that make key product moments feel premium and easy to follow.",
      "Redesigned the dashboard UX to streamline cross-page workflows and reduce friction for the operations team.",
      "Built internal tools and workflow improvements that lifted day-to-day team productivity, including real-time updates for the car-queue system.",
      "Turned tight, deadline-driven scopes into shipped features quickly without compromising on UI quality.",
    ],
    technologies: [
      "Next.js",
      "React.js",
      // "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Appwrite",
    ],
    logo: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1757182382/logo_etjtoe.png",
    left: false,
    type: "experience",
    iconType: "code",
  },
];
