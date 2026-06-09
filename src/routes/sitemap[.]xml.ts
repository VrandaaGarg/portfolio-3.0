import { createFileRoute } from "@tanstack/react-router";
import { projectsData } from "@/data/projects";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = "https://vrandagarg.in";
        const now = new Date().toISOString();
        const featuredProjects = projectsData.filter((project) => project.featured);

        const urls = [
          `<url><loc>${baseUrl}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
          `<url><loc>${baseUrl}/projects</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
          ...featuredProjects.map((project) => {
            const slug = project.name.toLowerCase().replace(/\s+/g, "-");
            return `<url><loc>${baseUrl}/projects/${slug}</loc><lastmod>${new Date(project.dateCreated).toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`;
          }),
        ];

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`,
          { headers: { "Content-Type": "application/xml" } }
        );
      },
    },
  },
});
