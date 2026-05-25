export interface Contributor {
  name: string;
  githubUrl: string;
}

export interface Project {
  id: string;
  name: string;
  image: string;
  video?: string;
  description: string;
  techStack: string[];
  liveDemoUrl?: string;
  githubUrl: string;
  dateCreated: string;
  timeCreatedIn: string;
  isLive: boolean;
  featured: boolean;
  contributors: Contributor[];
  videoLinks?: string[];
  whyBuildIt?: string;
  whyBuildItTitle?: string;
}

export const projectsData: Project[] = [
  {
    id: "12",
    name: "MemContext",
    video:
      "https://res.cloudinary.com/dyetf2h9n/video/upload/v1779697675/video-output-933BEE3F-04E3-480D-951A-04B3C9860639-2_prgze4.mp4",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/v1779696984/WhatsApp_Image_2026-05-25_at_13.45.41_p11nd5.jpg",
    description:
      "MemContext closes the biggest gap in AI-assisted development: **agents forget**. Preferences, project context, and prior decisions vanish between sessions across Claude, Cursor, ChatGPT, and every other tool.\n\nIt's a **persistent memory layer** for MCP-compatible clients. Drop in an API key, add the MCP config, and your assistant starts **remembering across sessions, tools, and projects**.\n\n• **Hybrid Retrieval** - **Vector embeddings + PostgreSQL full-text search** so both semantic queries and exact keywords surface the right memory\n• **Evolving Memory** - **Temporal facts auto-expire** and ranking adapts to feedback, so current truth always wins over stale context\n• **Project-Scoped** - Memories isolated per project so unrelated work never bleeds into the wrong session\n• **Cross-Tool Sync** - Works with **Claude, Cursor, OpenCode, Codex CLI, Windsurf, ChatGPT, Gemini**, and every MCP-compatible client\n• **Turborepo Monorepo** - **Hono API, MCP server, Next.js dashboard, docs, and marketing site** all in one workspace",
    whyBuildItTitle: "What I Built in This",
    whyBuildIt:
      "I built the **entire frontend and UI/UX** for MemContext, both the **marketing site** and the **product dashboard**.\n\n• **Interactive SVG-based isometric hero** showing AI tools syncing memory in real-time\n• **Custom illustrations and product visualizations** for each feature, hand-crafted in SVG\n• **Animated micro-interactions** powered by Framer Motion for hover, scroll, and state transitions\n• **Data-driven dashboard UI** with custom charts, stat cards, and live data tables\n• **Cohesive dark + orange design system** with consistent typography, spacing, and corner-bracket framing across every screen",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "Lucide Icons",
      "Hono",
      "Drizzle",
      "Neon",
      "PostgreSQL",
      "MCP",
      "Turborepo",
      "Upstash Redis",
      "OpenRouter",
      "Vercel AI SDK",
    ],
    liveDemoUrl: "https://memcontext.in/",
    githubUrl: "https://github.com/cyberboyAyush/memcontext",
    dateCreated: "March 2026",
    timeCreatedIn: "2 months",
    isLive: true,
    featured: true,
    contributors: [
      { name: "Ayush Sharma", githubUrl: "https://github.com/cyberboyayush" },
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
  },
  {
    id: "11",
    name: "MUJ General",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/v1775342146/Untitled_design_18_tvyrou.png",
    description:
      "Institutional **Research Repository and Journal Publication Platform** for **Manipal University Jaipur**, built as a full publishing pipeline with submissions, peer review, moderation, and a public archive.\n\n• **Role-Based Access Control** - Three-tier roles (**reader, editor, admin**) with server-side enforcement via **Better Auth** sessions\n• **Editor Access Workflow** - Verified readers can request editor access; admins approve or reject with review metadata and promote users on approval\n• **Versioned Research Items** - Every submission tracked with **full revision history** and reviewable diffs across versions\n• **Multi-Stage Publication Pipeline** - Submission, peer review with recommendations, moderation decisions, and final publication\n• **Journals as Publication Layer** - Journals, volumes, and issues sit on top of research items, supporting both **online-first** and **issue-assigned** publication models\n• **Editorial Board Management** - Per-journal editorial boards with role assignments and admin-managed membership\n• **S3-Compatible File Storage** - PDFs and assets stored in **Cloudflare R2** via the standard S3 API for provider portability\n• **Saved Research** - Client-only bookmarking via **Zustand store** persisted to localStorage, hydrated client-side to avoid SSR mismatch\n• **Email Verification + Credentials Auth** - **Better Auth** email/password flow gated by verification before role elevation\n• **Activity Logs and Moderation History** - Full audit trail for moderation decisions, submissions, and admin actions",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Drizzle",
      "Neon",
      "Better Auth",
      "Cloudflare R2",
    ],
    liveDemoUrl: "https://muj-general.aysh.me/",
    githubUrl: "https://github.com/VrandaaGarg/muj-general",
    dateCreated: "February 2026",
    timeCreatedIn: "4 days",
    isLive: true,
    featured: true,
    contributors: [
      { name: "Ayush Sharma", githubUrl: "https://github.com/cyberboyayush" },
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
  },
  {
    id: "10",
    name: "CappyChat",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/v1759138327/AV_1_zztl3w.png",
    description:
      "Next-generation AI chat platform engineered for **performance** and **scalability**.\n\n• **30+ Premium AI Models** - GPT-5, Gemini 2.5, Claude 4, Grok 4, DeepSeek, Qwen with **intelligent routing**\n• **Sub-100ms Response Time** - Local-first architecture with **IndexedDB + Appwrite** cloud integration\n• **Plan Mode** - Interactive diagrams and visualizations using **Mermaid syntax**\n• **AI-Powered Image Generation** - Google Gemini 2.5 Flash with **context-aware** generation\n• **Voice Input** - OpenAI Whisper **speech-to-text** integration\n• **Intelligent Web Search** - Parallel AI, Tavily, and Exa with **automatic tool selection**\n• **Multi-Format File Upload** - AI analysis with **PDF thumbnails** and pagination\n• **Real-Time Sync** - Instant synchronization across all devices with **WebSocket** connections\n• **Advanced Features** - BYOK support, tiered access system, **Better Stack** logging, **Upstash Redis** rate limiting",
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Zustand",
      "Appwrite",
      "OpenRouter",
      "Cloudinary",
      "Better Stack",
    ],
    liveDemoUrl: "https://cappychat.com",
    githubUrl: "https://github.com/cyberboyayush/cappychat",
    dateCreated: "January 2025",
    timeCreatedIn: "2 weeks",
    isLive: true,
    contributors: [
      { name: "Ayush Sharma", githubUrl: "https://github.com/cyberboyayush" },
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
    featured: true,
  },
  {
    id: "9",
    name: "Bashio",
    video:"https://res.cloudinary.com/dyetf2h9n/video/upload/v1769146942/BashIOVideo_1_qlrib7.mp4",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/v1769023957/Natural_language_to_shell_commands._Stop_Googling_start_doing._1_u8e0qd.png",
    description:
      "AI-powered CLI tool that converts **plain English into shell commands**. Stop Googling, start doing.\n\n• **Natural Language to Shell** - Describe what you want, get the exact command\n• **Multiple AI Providers** - Claude, OpenAI, GitHub Copilot, Ollama, OpenRouter with **easy switching**\n• **Chat Mode** - Full-screen AI chat with **streaming responses** and session history\n• **Custom Shortcuts** - Save frequently used commands with **placeholders**\n• **Safety First** - Warns about **dangerous commands** before execution\n• **Command Options** - Execute, explain, copy, or edit commands before running\n• **Local Storage** - All data stored locally at `~/.bashio/` with **no telemetry**\n• **Usage Statistics** - Track command history and **suggest shortcuts**\n• **Theme Support** - Multiple color themes with **easy switching**\n• **Published on npm** - Install globally with `npm i -g bashio`",
    techStack: [
      "TypeScript",
      "Node.js",
      "Claude API",
      "OpenAI API",
      "Ollama",
      "tsup",
      "Biome",
    ],
    liveDemoUrl: "https://www.npmjs.com/package/bashio",
    githubUrl: "https://github.com/VrandaaGarg/bashio",
    dateCreated: "January 2026",
    timeCreatedIn: "1 week",
    isLive: true,
    featured: false,
    contributors: [
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
  },
   {
    id: "8",
    name: "ResuMate",
    image: "https://resumate.vrandagarg.in/banner.png",
    description:
      "AI-powered resume builder designed to help job seekers craft **professional, ATS-friendly resumes** with **intelligent optimization**.\n\n• **Step-by-Step Builder** - Guided form inputs for personal info, education, experience, and **certifications**\n• **Resume Upload & Analysis** - Upload resumes (PDF/DOCX) with instant **ATS scoring**\n• **Create from Upload** - Auto-populate templates with **intelligent parsing**\n• **Live Preview & Editor** - Real-time editing with **formatting options** and hyperlink support\n• **3 Professional Templates** - Classic, Sidebar, and Standard with **instant switching**\n• **AI Bullet Enhancer** - Transform points into **action-oriented** statements\n• **Role-Specific Optimization** - Tailor resumes with **AI-powered suggestions**\n• **Job Description Matching** - Get match scores and **improvement tips**\n• **ATS Compatibility Checker** - Score (0-100) on **ATS friendliness**\n• **PDF Export** - Download **pixel-perfect PDFs** ready for applications",
    techStack: [
      "React (Vite)",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "OpenAI API",
      "Firebase",
      "Appwrite",
      "react-to-print",
    ],
    liveDemoUrl: "https://resumate.vrandagarg.in/",
    githubUrl: "https://github.com/VrandaaGarg/ResuMate",
    dateCreated: "May 2025",
    timeCreatedIn: "3 weeks",
    isLive: true,
    contributors: [
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
    featured: true,
  },
  {
    id: "7",
    name: "Quoridor Online",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/v1765577464/Quoridor_gctz2q.png",
    description:
      "A beautiful, animated implementation of the classic strategy board game **Quoridor**, built with Next.js and real-time multiplayer capabilities.\n\n• **Local Pass & Play** - Two-player mode on a **single device**\n• **Online Multiplayer** - Real-time matches with friends via **shareable room codes**\n• **Real-Time Synchronization** - Serverless-friendly approach using **HTTP + SSE (Server-Sent Events)** with **Redis** as single source of truth",
    whyBuildIt:
      "The goal was to understand **how real-time systems work under the hood** without requiring user sign-ups. I explored how to synchronize game state instantly between two players, researching various real-time communication patterns: **Short Polling**, **Long Polling**, **WebSockets / Socket.io**, and **Server-Sent Events (SSE)**.\n\n**Implementation Details:**\nFor this project, I implemented a **Serverless-friendly approach using HTTP + SSE (Server-Sent Events)**.\n• **Redis** acts as the single source of truth for game state\n• **SSE** pushes updates instantly to clients without them needing to refresh or poll\n• The system is completely stateless and frictionless, users can jump in via a link and play immediately",
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
      "Redis (Upstash)",
      "Server-Sent Events (SSE)",
      "React Icons",
    ],
    liveDemoUrl: "https://quoridor.vrandagarg.in",
    githubUrl: "https://github.com/VrandaaGarg/quoridor-game",
    dateCreated: "December 2025",
    timeCreatedIn: "2 days",
    isLive: true,
    featured: true,
    contributors: [
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
  },
  {
    id: "6",
    name: "CappyUI",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/v1766867568/image_xij1nl.png",
    description:
      "Beautiful animated React component library for building **stunning interfaces faster**.\n\n• **Copy-Paste Components** - Ready-to-use components for **rapid development**\n• **Built with Modern Stack** - **React, Tailwind CSS, and Framer Motion**\n• **TypeScript Support** - Full type safety with **TypeScript** integration\n• **Next.js Compatible** - Works seamlessly with **Next.js** projects\n• **shadcn/ui Inspired** - Following the **copy-paste philosophy**\n• **Radix UI Primitives** - Built on top of **accessible primitives**\n• **Interactive Demos** - Live previews for every component\n• **Developer Friendly** - Easy to customize and extend",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Next.js",
      "Radix UI",
      "MDX",
    ],
    liveDemoUrl: "https://ui.cappychat.com",
    githubUrl: "https://github.com/VrandaaGarg/cappyui",
    dateCreated: "December 2025",
    timeCreatedIn: "2 weeks",
    isLive: true,
    featured: true,
    contributors: [
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
  },
  
 
  {
    id: "5",
    name: "SkillCompass",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/q_60/v1752582426/skillcompass_ci3gur.png",
    description:
      "AI-powered learning platform that **revolutionizes education** by creating **personalized learning experiences** tailored to individual needs, skills, and career aspirations.\n\n• **AI-Generated Learning Paths** - Personalized curricula based on **your profile and goals**\n• **Interactive Content** - Engaging modules, explanations, and **learning resources**\n• **Smart Flashcards** \n• **Adaptive Quizzes** - Dynamic assessments that **adapt to your progress**\n• **Real-Time Analytics** - Comprehensive progress tracking and **performance insights**\n• **Gamification** - Points, streaks, and achievements to **keep you motivated**\n• **AI Coaching** - Intelligent nudges and **personalized recommendations**\n• **Dual AI Engine** - Powered by **Gemini 2.0 Flash** and **Groq (Llama 3.3 70B)**\n• **Cloud Synchronization** - Learn anytime, anywhere with **24/7 availability**",
    techStack: [
      "React 18",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Appwrite",
      "Gemini 2.0",
      "Groq (Llama 3.3)",
      "Cloudflare",
    ],
    liveDemoUrl: "https://skillcompass.glucon-d.xyz/",
    githubUrl: "https://github.com/Glucon-D/SkillCompass",
    dateCreated: "June 2025",
    timeCreatedIn: "48 hours",
    isLive: true,
    contributors: [
      { name: "Ayush Sharma", githubUrl: "https://github.com/cyberboyayush" },
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
      { name: "Raghav Gaba", githubUrl: "https://github.com/raghavvvgaba" },
      { name: "Atishay Jain", githubUrl: "https://github.com/atishay-jain04" },
    ],
    featured: false,
  },
  {
    id: "4",
    name: "SmartBite",
    image: "https://smartbite.vrandagarg.in/banner.png",
    description:
      "Full-stack restaurant ordering system for **single restaurant owners** to **digitize their service** with intuitive UI.\n\n• **Role-Based Access** - **User, Admin, and Super Admin** roles\n• **Cart System** - Quantity control with **subtotal, tax, and delivery** calculations\n• **Order Management** - Order tracking with **status updates** (static for now)\n• **Review System** - **Write, edit, and delete** reviews\n• **Dish Management** - CRUD operations for **menu items**\n• **Orders Dashboard** - Admin view with **date/name filters**\n• **Customer Management** - **Promote/demote** admin (Super Admin only)\n• **Order Notifications** - Automated **email alerts** via EmailJS\n• **Context API** - State management for **Cart, Auth, and Orders**\n• **Smooth Animations** - **Framer Motion** transitions",
    techStack: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Appwrite",
      "EmailJS",
      "Context API",
      "React Router",
    ],
    liveDemoUrl: "https://smartbite.vrandagarg.in/",
    githubUrl: "https://github.com/VrandaaGarg/smartbite",
    dateCreated: "April 2025",
    timeCreatedIn: "1 weeks",
    isLive: true,
    contributors: [
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
    featured: false,
  },
  {
    id: "2",
    name: "FinWise",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/q_60/v1752582425/finwise_obzcir.png",
    description:
      "AI-powered investment assistant helping **beginners understand and plan investments** based on **risk, capital, age, and financial goals**.\n\n• **Gemini AI Fund Suggestions** - Personalized investment recommendations via **Google Gemini AI**\n• **Live Gold Rate Integration** - Real-time gold prices via **MetalsAPI**\n• **FunBot AI Chatbot** - Interactive financial assistant for **investment queries**\n• **Beginner-Focused Blog** - Educational content with **AI-powered summarization**\n• **'I'm 18' Mode** - Simplified explanations for **complex financial concepts**\n• **Multi-Step Profile Form** - User profiling for **goal and risk-based investing**\n• **Secure Authentication** - User management with **Appwrite Auth & Database**\n• **Real-Time Market Data** - Financial API integration for **live investment insights**\n• **Smooth UX Design** - Polished interface with **Framer Motion animations**\n• **Educational Focus** - Built for **financial literacy** and beginner investors",
    techStack: [
      "React",
      "Vite",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Appwrite",
      "Gemini API",
      "MetalsAPI",
      "React Icons",
    ],
    liveDemoUrl: "https://finwise.ayush-sharma.in/",
    githubUrl: "https://github.com/Glucon-D/FinWise",
    dateCreated: "August 2024",
    timeCreatedIn: "1 week",
    isLive: true,
    contributors: [
      { name: "Ayush Sharma", githubUrl: "https://github.com/cyberboyayush" },
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
      { name: "Atishay Jain", githubUrl: "https://github.com/atishay-jain04" },
      { name: "Raghav Gaba", githubUrl: "https://github.com/raghavvvgaba" },
      { name: "Raghav Katta", githubUrl: "https://github.com/raghavxkatta" },
    ],
    featured: false,
  },
  // {
  //   id: "1",
  //   name: "Portfolio",
  //   image:
  //     "https://res.cloudinary.com/dyetf2h9n/image/upload/v1765637887/banner_hfyoau.png",
  //   description:
  //     "This portfolio showcases my skills, projects, and experiences. It features a modern design with smooth animations, responsive layout, and interactive elements.",
  //   techStack: [
  //     "Next JS",
  //     "TypeScript",
  //     "Tailwind CSS",
  //     "Framer Motion",
  //     "Lucide Icons",
  //   ],
  //   liveDemoUrl: "https://vrandagarg.in/",
  //   githubUrl: "https://github.com/VrandaaGarg/next-portfolio",
  //   dateCreated: "July 2024",
  //   timeCreatedIn: "2 weeks",
  //   isLive: true,
  //   contributors: [
  //     { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
  //   ],
  //   featured: false,
  // },
];
