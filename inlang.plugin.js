// example plugin

/**
 * Plugin config.
 *
 * @typedef {Object} PluginConfig
 * @property {string} pathPattern
 *  Defines the path pattern for the bundles.
 *  For example `./resources/{language}.js`.
 */

/**
 * @param { Record<string, any> } args
 * @returns {ReturnType<import("@inlang/core/config").Config['readResources']>}
 */
export const readResources = async ({ $import, config, pluginConfig }) => {
  return await Promise.all(
    config.languages.map(async (/** @type {string} */ id) => {
      const path = pluginConfig.pathPattern.replace("{language}", id);
      const module = await $import(path);
      return resourceFrom(module.default, id);
    })
  );
};

/**
 * @param { Record<string, any> } args
 * @returns {ReturnType<import("@inlang/core/config").Config['writeResources']>}
 */
export const writeResources = async ({ $fs, resources, pluginConfig }) => {
  await Promise.all(
    resources.map(
      async (/** @type { import("@inlang/core/ast").Resource } */ resource) => {
        const path = pluginConfig.pathPattern.replace(
          "{language}",
          resource.id.name
        );
        await $fs.writeFile(path, serializeResource(resource), {
          encoding: "utf8",
        });
      }
    )
  );
};

/**
 *
 * @param {import("@inlang/core/ast").Resource} resource}
 */
function serializeResource(resource) {
  const obj = {};
  for (const message of resource.body) {
    // @ts-ignore
    obj[message.id.name] = message.pattern.elements[0].value;
  }
  return "export default " + JSON.stringify(obj, null, 2);
}

/**
 *
 * @param {Record<string, string>} obj
 * @param {string} id
 * @returns {import("@inlang/core/ast").Resource}
 */
function resourceFrom(obj, id) {
  return {
    type: "Resource",
    id: { type: "Identifier", name: id },
    languageTag: {
      type: "LanguageTag",
      language: id,
    },
    body: Object.entries(obj).map(([key, value]) => {
      return {
        type: "Message",
        id: {
          type: "Identifier",
          name: key,
        },
        pattern: {
          type: "Pattern",
          elements: [{ type: "Text", value }],
        },
      };
    }),
  };
}
