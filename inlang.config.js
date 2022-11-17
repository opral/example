/** @type {import("@inlang/core/config").Config} */
export const config = {
  referenceBundleId: "en",
  bundleIds: ["en", "de", "fr"],
  readBundles: async () => {
    return await Promise.all(
      config.bundleIds.map(async (id) => {
        const resource = await import(`./resources/${id}.js`);
        return bundleFrom(resourceFrom(resource), id);
      })
    );
  },
};

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
 * @param {import("./resources/types.js").Resource} obj
 * @returns {import("@inlang/core/ast").Resource}
 */
function resourceFrom(obj) {
  return {
    type: "Resource",
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
