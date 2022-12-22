// @ts-nocheck

/**
 * @type {import("@inlang/core/config").Config['readBundles']}
 */
export const readBundles = async ({ $import, bundleIds }) => {
  return await Promise.all(
    bundleIds.map(async (id) => {
      const module = await $import(`./resources/${id}.js`);
      return bundleFrom(resourceFrom(module.default), id);
    })
  );
};

export const writeBundles = async ({ $import, bundles, $fs }) => {
  await Promise.all(
    bundles.map(async (bundle) => {
      await $fs.writeFile(
        `./resources/${bundle.id.name}.js`,
        serializeResource(bundle.resources[0]),
        {
          encoding: "utf8",
        }
      );
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
