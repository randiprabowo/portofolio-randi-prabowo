"use client";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { useTheme } from "@/components/useTheme";
export default function Studio() {
  const scheme = useTheme();
  return scheme ? <NextStudio config={config} scheme={scheme} /> :
    <noscript>Enable JavaScript to use Sanity Studio.</noscript>;
}
