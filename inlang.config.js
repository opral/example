/**
 * Using JSDoc to get typesafety.
 *
 * *@type {import("@inlang/core/config").DefineConfig}
 * @type {import("../../core/dist/config/index.js").DefineConfig}
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
  if (typeof process !== "undefined" && process?.version === "v16.14.2") {
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
      return plugin.readResources({ ...args, ...env, pluginConfig });
    },
    writeResources: (args) => {
      return plugin.writeResources({ ...args, ...env, pluginConfig });
    },
    ideExtension: {
      translationFinders: [
        async (/** @type {{ "documentText": string; }} */ args) => {
          const regex = /{?t\(['"](?<messageId>\S+)['"]\)}?/gm;
          const str = args.documentText;
          let match;
          const result = [];

          while ((match = regex.exec(str)) !== null) {
            const startLine = (str.slice(0, Math.max(0, match.index)).match(/\n/g) || []).length + 1;
            const startPos = match.index - str.lastIndexOf('\n', match.index - 1);
            const endPos = match.index + match[0].length - str.lastIndexOf('\n', match.index + match[0].length - 1);
            const endLine = (str.slice(0, Math.max(0, match.index + match[0].length)).match(/\n/g) || []).length + 1;

            if (match.groups && 'messageId' in match.groups) {
              result.push({
                messageId: match.groups['messageId'],
                position: {
                  start: {
                    line: startLine,
                    character: startPos
                  },
                  end: {
                    line: endLine,
                    character: endPos
                  }
                }
              })
            }
          }
          return result;
        }
      ],
      extractMessageOptions: [
        {
          callback: (messageId) => `{t("${messageId}")}`,
        },
        {
          callback: (messageId) => `t("${messageId}")`,
        },
      ],
    },
  };
}
