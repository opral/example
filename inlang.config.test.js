import { config } from "./inlang.config.js";
import fs from "node:fs/promises";
import { initialize$import } from "@inlang/core/config";
import { query } from "@inlang/core/query";

const $import = initialize$import({
  basePath: "/Users/samuel/Documents/GitHub.nosync/demo/",
  // @ts-ignore
  fs: fs,
});

// @ts-ignore
const bundles = await config.readBundles({ $fs: fs, $import });

console.log(query(bundles[0]).ids());
