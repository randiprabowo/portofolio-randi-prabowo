import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { Schema } from "@sanity/schema";
import { schemaTypes } from "../sanity/schema.ts";
import { cv, projectLinks } from "../lib/links.ts";
const records = JSON.parse(
  readFileSync(new URL("../content/seed.json", import.meta.url), "utf8"),
);

test("Studio compiles all seed types and provides the social editor", () => {
  const schema = Schema.compile({ name: "portfolio", types: schemaTypes });
  for (const record of records)
    assert.ok(schema.get(record._type), record._type);
  assert.ok(schema.get("socialLink"));
  assert.equal(
    new Set(records.map((record) => record._id)).size,
    records.length,
  );
  assert.equal(
    records.filter((record) => record._id.startsWith("drafts.")).length,
    1,
  );
});

test("project website and repository links can be independently absent", () => {
  const labels = { live: "Live", github: "GitHub" };
  const liveUrl = "https://example.test/demo";
  const githubUrl = "https://example.test/repository";
  for (const [fields, expected] of [
    [{}, []],
    [{ liveUrl }, ["Live"]],
    [{ githubUrl }, ["GitHub"]],
    [{ liveUrl, githubUrl }, ["Live", "GitHub"]],
  ]) {
    assert.deepEqual(
      projectLinks(fields, labels).map((link) => link.label),
      expected,
    );
  }
  assert.deepEqual(
    projectLinks(
      { liveUrl: "javascript:void(0)", githubUrl: "invalid" },
      labels,
    ),
    [],
  );
});

test("a CV requires an asset and uses a localized label and a download URL", () => {
  assert.equal(cv(null, "en"), undefined);
  assert.equal(cv({}, "id"), undefined);
  const asset = {
    resumeUrl: "https://example.test/file.pdf?version=2",
    resumeLabel: { id: "CV terbaru", en: "Current CV" },
  };
  assert.equal(cv(asset, "id").label, "CV terbaru");
  assert.equal(new URL(cv(asset, "en").url).searchParams.get("dl"), "CV.pdf");
  assert.equal(new URL(cv(asset, "en").url).searchParams.get("version"), "2");
});
