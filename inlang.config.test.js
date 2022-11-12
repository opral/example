import { config } from "./inlang.config.js";
import fs from "node:fs/promises";
import { $import } from "@inlang/core/config";

// @ts-ignore
console.log(await config.readBundles({ fs: fs }));
