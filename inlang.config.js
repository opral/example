/**
 *
 * @type {import("@inlang/core/config").Config}
 */
export async function config({ $import }) {
  const { readBundles, writeBundles } = await $import(
    "./inlang.config.module.js"
  );

  const bundleIds = ["en", "de", "fr"];

  return {
    referenceBundleId: "en",
    bundleIds: bundleIds,
    readBundles: (args) => readBundles({ ...args, bundleIds }),
    writeBundles: writeBundles,
  };
}
