"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityEnvironment } from "./sanity/env";
import { schemaTypes } from "./sanity/schema";

const env = sanityEnvironment();
const config = env
  ? defineConfig({
      name: "portfolio",
      title: "Portfolio",
      basePath: "/studio",
      ...env,
      plugins: [
        structureTool({
          structure: (S) =>
            S.list()
              .title("Portfolio content")
              .items([
                S.listItem()
                  .title("Profile & site settings")
                  .child(
                    S.document()
                      .schemaType("siteSettings")
                      .documentId("siteSettings"),
                  ),
                S.divider(),
                ...S.documentTypeListItems().filter(
                  (item) => item.getId() !== "siteSettings",
                ),
              ]),
        }),
      ],
      schema: {
        types: schemaTypes,
        templates: (templates) =>
          templates.filter((t) => t.schemaType !== "siteSettings"),
      },
      document: {
        actions: (actions, ctx) =>
          ctx.schemaType === "siteSettings"
            ? actions.filter(
                (a) =>
                  a.action === "publish" ||
                  a.action === "discardChanges" ||
                  a.action === "restore",
              )
            : actions,
      },
    })
  : [];
export default config;
