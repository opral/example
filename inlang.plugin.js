// @ts-nocheck
// example plugin

/**
 * Plugin config.
 *
 * @typedef {Object} PluginConfig
 * @property {string} pathPattern
 *  Defines the path pattern for the bundles.
 *  For example `./resources/{bundleId}.js`.
 */

/**
 * @returns {import("@inlang/core/config".Config['readBundles'])}
 */
export const readBundles = async ({ $import, config, pluginConfig }) => {
  return await Promise.all(
    config.bundleIds.map(async (id) => {
      const path = pluginConfig.pathPattern.replace("{bundleId}", id);
      const module = await $import(path);
      return bundleFrom(resourceFrom(module.default), id);
    })
  );
};

export const writeBundles = async ({ $fs, bundles, pluginConfig }) => {
  await Promise.all(
    bundles.map(async (bundle) => {
      const path = pluginConfig.pathPattern.replace(
        "{bundleId}",
        bundle.id.name
      );
      await $fs.writeFile(path, serializeResource(bundle.resources[0]), {
        encoding: "utf8",
      });
    })
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
 * @param {import("@inlang/core/ast").Resource} resource
 * @param {import("@inlang/core/ast").Bundle['id']['name']} bundleId
 * @returns {import("@inlang/core/ast").Bundle}
 */
function bundleFrom(resource, bundleId) {
  return {
    type: "Bundle",
    id: {
      type: "Identifier",
      name: bundleId,
    },
    resources: [resource],
  };
}

/**
 *
 * @param {Record<string, string>} obj
 * @returns {import("@inlang/core/ast").Resource}
 */
function resourceFrom(obj) {
  return {
    type: "Resource",
    id: { type: "Identifier", name: "default" },
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
