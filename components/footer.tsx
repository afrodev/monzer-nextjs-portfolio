import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { socialLinks } from "@/lib/social-links";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {socialLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-muted-foreground hover:text-primary">
              <span className="sr-only">{link.name}</span>
              <link.icon className="h-6 w-6"/>
          </Link>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} Monzer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}