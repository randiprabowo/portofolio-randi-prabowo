// Run manually after the portfolio owner approves the staged review.
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { getCliClient } from "sanity/cli";

const records = JSON.parse(await readFile("content/review/resume.json", "utf8"));
const profile = records.find((record) => record._id === "siteSettings");
const client = getCliClient({ apiVersion: "2025-02-19" });
const { projectId, dataset } = client.config();
if (projectId !== "fpaz2q9j" || dataset !== "production") {
  throw new Error("This review is for fpaz2q9j / production.");
}

const assets = [
  { kind: "image", field: profile.profileImage, path: "content/review/portrait.png", filename: "Randi-Prabowo.png", contentType: "image/png" },
  { kind: "file", field: profile.resumeFile, path: "CV-Randi-Prabowo-Updates.pdf", filename: "CV-Randi-Prabowo-Updates.pdf", contentType: "application/pdf" },
];

// Validate both source files before the first remote write.
const inputs = await Promise.all(assets.map(async (asset) => {
  const bytes = await readFile(asset.path);
  const digest = createHash("sha1").update(bytes).digest("hex");
  if (asset.field.asset._ref.split("-")[1] !== digest) {
    throw new Error("File differs from the reviewed asset: " + asset.path);
  }
  return { ...asset, bytes };
}));

for (const { kind, field, bytes, filename, contentType } of inputs) {
  const asset = await client.assets.upload(kind, bytes, { filename, contentType });
  field.asset._ref = asset._id;
}

const transaction = client.transaction();
for (const { _id, _type, ...fields } of records) {
  transaction.createIfNotExists({ _id, _type }).patch(_id, { set: fields });
}
await transaction.commit();
console.log(`Published ${records.length} reviewed documents with profile assets in ${projectId}/${dataset}.`);
