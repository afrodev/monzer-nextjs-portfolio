import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllProjects } from "@/lib/projects";

export default async function Home() {
  const allProjects = await getAllProjects();
  
  // Filter out "Urban landscapes" and prioritize Bobabike
  const featuredProjects = allProjects
    .filter(project => project.id !== "urban-photography") // Remove Urban landscapes project
    .sort((a, b) => {
      // Put Bobabike first
      if (a.id === "bobabike") return -1;
      if (b.id === "bobabike") return 1;
      // Otherwise maintain the original sort (by date)
      return a.date < b.date ? 1 : -1;
    });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/DALLE3-hero-v1.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/80" /> {/* Dark overlay for better text readability */}
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
              Tech, Creativity & Everything In Between
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              I’m Monzer, a software engineer, creative, and entrepreneur. I love bringing ideas to life.
            </p>
            <p className="mt-6 text-lg leading-8 text-white">
            Whether it’s building full-stack web applications, embedded systems, or creating visuals with photography and videography—This portfolio showcases some of my best work across coding, electronics, photography, video, 
            marketing, and business ventures!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button variant="outline" asChild className="bg-white/10 hover:bg-white/20 text-white border-white">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              A few handpicked favorites
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="flex flex-col items-start">
                <div className="relative w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="aspect-[16/9] w-full rounded-t-lg bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-t-lg ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl p-6">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={project.date} className="text-gray-500">
                      {project.date}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                      {project.category}
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-300">
                      <Link href={`/projects/${project.id}`}>
                        <span className="absolute inset-0" />
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button asChild variant="outline">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}