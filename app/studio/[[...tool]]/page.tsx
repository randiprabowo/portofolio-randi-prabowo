import { sanityEnvironment } from "@/sanity/env";
import Studio from "./Studio";
export default function StudioPage() {
  if (!sanityEnvironment())
    return (
      <main
        style={{
          maxWidth: "48rem",
          margin: "10vh auto",
          padding: "1.5rem",
          fontFamily: "system-ui",
        }}
      >
        <h1>Connect Sanity Studio</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> in the environment and restart
          the app. See the repository README for setup and seed import.
        </p>
      </main>
    );
  return <Studio />;
}
