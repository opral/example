/**
 * @type {import("@inlang/core/config").Config}
 */
export async function config({ $import }) {
  const plugin = await $import("./inlang.plugin.js");
  const pluginConfig = {
    pathPattern: "./resources/{bundleId}.js",
  };

  return {
    referenceBundleId: "en",
    bundleIds: ["en", "de", "fr"],
    readBundles: (args) => plugin.readBundles({ ...args, pluginConfig }),
    writeBundles: (args) => plugin.writeBundles({ ...args, pluginConfig }),
  };
}
