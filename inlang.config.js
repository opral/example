/**
 * Using JSDoc to get typesafety.
 *
 * @type {import("@inlang/core/config").InitializeConfig}
 */
export async function initializeConfig(env) {
  const plugin = await env.$import(
    "https://cdn.jsdelivr.net/gh/samuelstroschein/inlang-plugin-json@1.0.0/dist/index.js"
  );

  const pluginConfig = {
    pathPattern: "./resources/{language}.json",
  };
  
  throw Error("error in initializeConfig");

  return {
    referenceLanguage: "en",
    languages: ["en", "de", "fr"],
    readResources: (args) => {
      return plugin.readResources({ ...args, ...env, pluginConfig });
      // reading resources
    },
    writeResources: (args) => {
      // writing resources
      return plugin.writeResources({ ...args, ...env, pluginConfig });
    },
  };
}
