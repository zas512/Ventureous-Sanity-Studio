import "dotenv/config";
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

if (!projectId) {
  console.warn(
    "Missing or invalid SANITY_STUDIO_PROJECT_ID - some features may not work"
  );
}
if (!dataset) {
  console.warn(
    "Missing or invalid SANITY_STUDIO_DATASET - some features may not work"
  );
}

function getStudioHost(): string | undefined {
  const host = process.env.HOST_NAME;
  const productionHostName = process.env.SANITY_STUDIO_PRODUCTION_HOSTNAME;
  if (productionHostName) {
    if (host && host !== "main") {
      return `${host}-${productionHostName}`;
    }
    return productionHostName;
  }
  if (projectId) {
    return `${projectId}`;
  }
  return;
}

const studioHost = getStudioHost();

if (studioHost) {
  console.info(`Sanity Studio Host: https://${studioHost}.sanity.studio`);
}

export default defineCliConfig({
  api: {
    projectId,
    dataset
  },
  studioHost,
  deployment: {
    appId: "wc4vm9s0ngamm6hidmotz2y5",
    autoUpdates: false
  },
  schemaExtraction: {
    enabled: true,
    enforceRequiredFields: true
  },
  typegen: {
    enabled: true,
    formatGeneratedCode: true,
    path: "./**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "./sanity.types.ts",
    overloadClientMethods: true
  }
});
