import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/afrodev",
      icon: Github,
      description: "Check out my open-source projects and contributions",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/monzer-faisal",
      icon: Linkedin,
      description: "Connect with me professionally",
    },
    {
      name: "Email",
      href: "mailto:monzergmc1@gmail.com",
      icon: Mail,
      description: "Send me a message directly",
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Interested in collaboration or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {socialLinks.map((link) => (
            <Card key={link.name} className="p-6">
              <Link 
                href={link.href}
                className="flex flex-col items-center text-center space-y-4 transition-colors hover:text-primary"
              >
                <link.icon className="h-8 w-8" />
                <h2 className="text-xl font-semibold">{link.name}</h2>
                <p className="text-muted-foreground">{link.description}</p>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Professional Inquiries</h2>
          <p className="text-muted-foreground mb-8">
            For business opportunities and collaborations, please reach out through LinkedIn or email.
            I typically respond within 24-48 hours.
          </p>
          <Button asChild size="lg">
            <Link href="mailto:monzergmc1@gmail.com">
              Send Email
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}