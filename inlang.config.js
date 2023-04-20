// @ts-check

/**
 * @type { import("@inlang/core/config").DefineConfig }
 */
export async function defineConfig(env) {
  const plugin = await env.$import(
    "https://cdn.jsdelivr.net/gh/samuelstroschein/inlang-plugin-json@1/dist/index.js"
  );

  const { standardLintRules } = await env.$import(
    "https://cdn.jsdelivr.net/gh/inlang/standard-lint-rules@1/dist/index.js"
  );

  const pluginConfig = {
    pathPattern: "./resources/{language}.json",
  };

  return {
    referenceLanguage: "en",
    languages: await plugin.getLanguages({ ...env, pluginConfig }),
    readResources: (args) => plugin.readResources({ ...args, ...env, pluginConfig }),
    writeResources: (args) => plugin.writeResources({ ...args, ...env, pluginConfig }),
    lint: {
      rules: [standardLintRules()],
    },
    ideExtension: {
      messageReferenceMatchers: [
        async ( /** @type {{ "documentText": string; }} */ args) => {
          const regex = /(?<!\w){?t\(['"](?<messageId>\S+)['"]\)}?/gm;
          const str = args.documentText;
          let match;
          const result = [];

          while ((match = regex.exec(str)) !== null) {
            const startLine =
              (str.slice(0, Math.max(0, match.index)).match(/\n/g) || [])
              .length + 1;
            const startPos =
              match.index - str.lastIndexOf("\n", match.index - 1);
            const endPos =
              match.index +
              match[0].length -
              str.lastIndexOf("\n", match.index + match[0].length - 1);
            const endLine =
              (
                str
                .slice(0, Math.max(0, match.index + match[0].length))
                .match(/\n/g) || []
              ).length + 1;

            if (match.groups && "messageId" in match.groups) {
              result.push({
                messageId: match.groups["messageId"],
                position: {
                  start: {
                    line: startLine,
                    character: startPos,
                  },
                  end: {
                    line: endLine,
                    character: endPos,
                  },
                },
              });
            }
          }
          return result;
        },
      ],
      extractMessageOptions: [{
          callback: (messageId) => `{t("${messageId}")}`,
        },
        {
          callback: (messageId) => `t("${messageId}")`,
        },
      ],
    },
  };
}
