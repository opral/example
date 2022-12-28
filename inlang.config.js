/**
 * @type {import("@inlang/core/config").InitializeConfig}
 */
export async function config(env) {
  const plugin = await env.$import(
    "https://cdn.jsdelivr.net/gh/inlang/plugin-template/dist/index.js"
  );

  const pluginConfig = {
    pathPattern: "./resources/{language}.json",
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
