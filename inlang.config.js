/**
 * Using JSDoc to get typesafety.
 *
 * @type {import("@inlang/core/config").DefineConfig}
 */
export async function defineConfig(env) {
  const plugin = await env.$import(
    "https://cdn.jsdelivr.net/gh/samuelstroschein/inlang-plugin-json@1.0.0/dist/index.js"
  );

  const pluginConfig = {
    pathPattern: "./resources/{language}.json",
  };

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
