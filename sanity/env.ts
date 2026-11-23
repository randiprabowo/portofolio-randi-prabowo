export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";
export function sanityEnvironment() {
  if (!projectId && !dataset) return null;
  if (!projectId || !dataset)
    throw new Error(
      "Set both NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
    );
  return { projectId, dataset, apiVersion };
}
