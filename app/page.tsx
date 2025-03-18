import { Card } from "@/components/ui/card";

export default function AboutPage() {
  const skills = [
    {
      category: "Software Development",
      items: ["TypeScript", "React", "Node.js", "Next.js", "Python", "SQL"],
    },
    {
      category: "Electronics",
      items: ["Arduino", "Raspberry Pi", "PCB Design", "IoT Development"],
    },
    {
      category: "Creative",
      items: ["Photography", "Video Production", "Adobe Creative Suite"],
    },
    {
      category: "Business",
      items: ["Digital Marketing", "Project Management", "Business Strategy"],
    },
  ];

  const experience = [
    {
      title: "Software Engineer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description: "Leading development of web applications and IoT solutions.",
    },
    {
      title: "Freelance Developer",
      company: "Self-employed",
      period: "2020 - 2022",
      description: "Delivered custom software solutions for various clients.",
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-16">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
              Who is Monzer?
            </h1>
            <p className="text-lg text-muted-foreground">
              A passionate software engineer and creative professional with a unique blend of technical expertise and artistic vision. My journey spans across software development, electronics, and digital media, always driven by the desire to create meaningful and innovative solutions.
            </p>
            <p className="text-lg text-muted-foreground">
              With a bachelor's degree in Software Engineering and Business, I bring a holistic approach to every project, combining technical excellence with strategic thinking.
            </p>
          </div>
          <div className="lg:flex-1">
            <div className="relative aspect-square max-w-md mx-auto">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000"
                alt="Portrait"
                className="rounded-2xl object-cover shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup) => (
              <Card key={skillGroup.category} className="p-6">
                <h3 className="font-semibold text-lg mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="text-muted-foreground">
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <Card key={exp.title} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                  <p className="text-muted-foreground">{exp.period}</p>
                </div>
                <p className="text-muted-foreground">{exp.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}