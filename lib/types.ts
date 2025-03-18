export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'software' | 'electronics' | 'photography' | 'video' | 'marketing';
  image: string;
  featured: boolean;
  content: string;
  date: string;
}

export interface AboutContent {
  title: string;
  introduction: string;
  portrait: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
}

export interface ContactInfo {
  email: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
}