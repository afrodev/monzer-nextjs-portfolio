import { Card } from "@/components/ui/card";
import { getAllProjects } from "@/lib/projects";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
            My Projects
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Exploring the intersection of technology, creativity, and innovation through various projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative aspect-[16/9]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-x-4 text-xs mb-3">
                    <time dateTime={project.date} className="text-muted-foreground">
                      {project.date}
                    </time>
                    <span className="relative z-10 rounded-full bg-secondary px-3 py-1.5 font-medium">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}