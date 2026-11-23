"use client";
import { useEffect } from "react";
import { useAnimate } from "motion/react-mini";

/** The server renders every line fully visible. Only enhance the first paint on larger screens. */
export function HeroCopy({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  useEffect(() => {
    const preference = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    if (!preference.matches) return;
    const words = scope.current?.querySelectorAll<HTMLElement>("h1 span");
    if (!words?.length) return;
    const animation = animate(
      words,
      { opacity: [0.85, 1], transform: ["translateY(8px)", "translateY(0)"] },
      {
        duration: 0.4,
        delay: (index) => Math.min(index, 3) * 0.045,
        ease: [0.22, 1, 0.36, 1],
      },
    );
    const finish = () => animation.complete();
    preference.addEventListener("change", finish);
    return () => {
      preference.removeEventListener("change", finish);
      animation.stop();
    };
  }, [animate, scope]);
  return (
    <div className="hero-copy" ref={scope}>
      {children}
    </div>
  );
}
