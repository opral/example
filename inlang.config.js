/**
 * @type {import("@inlang/core/config").InitializeConfig}
 */
export async function initializeConfig(env) {
  // importing https://github.com/samuelstroschein/inlang-plugin-json
  const plugin = await env.$import(
    "https://cdn.jsdelivr.net/gh/samuelstroschein/inlang-plugin-json@1.0.0/dist/index.js"
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
