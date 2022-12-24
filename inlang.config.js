/**
 * @type {import("@inlang/core/config").Config}
 */
export async function config(env) {
  const plugin = await env.$import("./inlang.plugin.js");
  const pluginConfig = {
    pathPattern: "./resources/{bundleId}.js",
  };

  return {
    referenceBundleId: "en",
    bundleIds: ["en", "de", "fr"],
    readBundles: (args) =>
      plugin.readBundles({ ...args, ...env, pluginConfig }),
    writeBundles: (args) =>
      plugin.writeBundles({ ...args, ...env, pluginConfig }),
  };
}
