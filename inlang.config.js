/**
 *
 * @type {import("@inlang/core/config").Config}
 */
export async function config({ $import }) {
  const { readBundles, writeBundles } = await $import(
    "./inlang.config.module.js"
  );

  return {
    referenceBundleId: "en",
    bundleIds: ["en", "de", "fr"],
    readBundles: readBundles,
    writeBundles: writeBundles,
  };
}
