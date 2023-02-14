/**
 * Using JSDoc to get typesafety.
 *
 * @type {import("@inlang/core/config").DefineConfig}
 */
export async function defineConfig(env) {
  /**
   * VSCode is using Node 16.14.2, which doesn't support importing from data uris.
   * Until https://github.com/microsoft/vscode/pull/166430 is merged and stable, this workaround is needed.
   *
   * @type {{ readResources: any; writeResources: any; }}
   */
  let plugin;
  // eslint-disable-next-line unicorn/prefer-ternary, no-undef
  if (process && process.version === 'v16.14.2') {
    plugin = await import("./.inlang/inlang-plugin-json.js");
  } else {
    plugin = await env.$import(
      "https://cdn.jsdelivr.net/gh/samuelstroschein/inlang-plugin-json@1/dist/index.js"
    );
  }

  const pluginConfig = {
    pathPattern: "./resources/{language}.json",
  };

  return {
    referenceLanguage: "en",
    languages: ["en", "de", "fr"],
    readResources: (args) => {
      // reading resources
      return plugin.readResources({ ...args, ...env, pluginConfig });
    },
    writeResources: (args) => {
      // writing resources
      return plugin.writeResources({ ...args, ...env, pluginConfig });
    },
    // @ts-ignore
    ideExtension: {
      extractMessageOptions: [{
        id: 'As JSX string',
        callback: (/** @type {string} */ messageId) => `{t("${messageId}")}`
      }, {
        id: 'As JS string',
        callback: (/** @type {string} */ messageId) => `t("${messageId}")`
      }]
    }
  };
}
