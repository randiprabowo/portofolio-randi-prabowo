import type { PortableTextBlock } from "sanity";
import type { Locale } from "./locale";

export type Localized<T = string> = Record<Locale, T>;
export interface Photo {
  _type: "photo";
  _key?: string;
  asset: { _type: "reference"; _ref: string };
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt: Localized;
}
interface RecordBase {
  _id: string;
  sortOrder?: number;
}
export interface Settings extends RecordBase {
  _type: "siteSettings";
  name: string;
  roleTitle: Localized;
  tagline?: Localized;
  location?: Localized;
  aboutSummary?: Localized;
  approach?: Localized;
  heroIntro?: Localized;
  availabilityStatus?: Localized;
  seoTitle?: Localized;
  seoDescription?: Localized;
  profileImage?: Photo;
  resumeUrl?: string;
  resumeLabel?: Localized;
  resumeLanguage?: Locale;
  email?: string;
  phone?: string;
}
export interface Period {
  startDate?: string;
  endDate?: string;
}
export interface Project extends RecordBase, Period {
  _type: "project";
  title: string;
  slug: { current: string };
  summary: Localized;
  role: Localized;
  category?: Localized;
  context?: Localized;
  description?: Localized<PortableTextBlock[]>;
  outcome?: Localized;
  coverImage?: Photo;
  gallery?: Photo[];
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}
export interface Experience extends RecordBase, Period {
  _type: "experience";
  company: string;
  position: Localized;
  location?: Localized;
  description?: Localized;
  highlights?: Localized[];
  isCurrent?: boolean;
}
export interface Skill extends RecordBase {
  _type: "skill";
  name: string;
  category: string;
  level?: Localized;
  featured?: boolean;
}
export interface Education extends RecordBase, Period {
  _type: "education";
  title: Localized;
  institution: string;
  kind: string;
  credentialUrl?: string;
  description?: Localized;
}
export interface Social extends RecordBase {
  _type: "socialLink";
  platform: string;
  url: string;
  label: Localized;
  enabled: boolean;
}
export type Content =
  Settings | Project | Experience | Skill | Education | Social;
