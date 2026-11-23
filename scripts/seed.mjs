// Run via the authenticated Sanity CLI. Existing records are preserved on every import.
import { readFileSync } from "node:fs";
import { getCliClient } from "sanity/cli";
const records = JSON.parse(
  readFileSync(new URL("../content/seed.json", import.meta.url), "utf8"),
);
const client = getCliClient({ apiVersion: "2025-02-19" });
const tx = client.transaction();
for (const record of records) tx.createIfNotExists(record);
await tx.commit();
console.log(`Imported missing records into ${client.config().dataset}.`);
