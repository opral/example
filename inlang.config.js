/**
 * @type {import("@inlang/core/config").InitializeConfig}
 */
export async function config(env) {
  const plugin = await env.$import("./inlang.plugin.js");

  const pluginConfig = {
    pathPattern: "./resources/{language}.js",
  };

  return {
    referenceLanguage: "en",
    languages: ["en", "de", "fr"],
    readResources: (args) =>
      plugin.readResources({ ...args, ...env, pluginConfig }),
    writeResources: (args) =>
      plugin.writeResources({ ...args, ...env, pluginConfig }),
  };
}
