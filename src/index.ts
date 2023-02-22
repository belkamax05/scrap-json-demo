import { existsSync, mkdirSync, writeFileSync } from "fs";
import path = require("path");
import { convertHtmlToJson } from "./convertHtmlToJson";
import { getUrlAsJson } from "./getUrlAsJson";

const safeStringify = (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === "object" && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent
  );
  cache = null;
  return retVal;
};

const run = async () => {
  const jsonFromUrl = await getUrlAsJson("http://bash.org/");
  const jsonFromData = await convertHtmlToJson(
    '<html><head></head><body><div id="hi-from-id">Hi div content</div></body></html>'
  );
  if (!existsSync("out")) {
    mkdirSync("out", 0o0744);
  }
  writeFileSync("out/url-response.json", safeStringify(jsonFromUrl));
  writeFileSync("out/data-response.json", safeStringify(jsonFromData));
};

run();
