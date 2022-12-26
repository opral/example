/**
 * @type {import("@inlang/core/config").InitializeConfig}
 */
export async function config({ $import }) {
  const plugin = await $import("./inlang.plugin.js");
  const pluginConfig = {
    pathPattern: "./resources/{bundleId}.js",
  };

  return {
    referenceLanguage: "en",
    languages: ["en", "de", "fr"],
    readResources: (args) => plugin.readResources({ ...args, pluginConfig }),
    writeResources: (args) => plugin.writeResources({ ...args, pluginConfig }),
  };
}
