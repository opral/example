import { FluentBundle, FluentResource } from "@fluent/bundle";
import Cookies from "js-cookie";
import { derived, get, writable } from "svelte/store";
import de from "./resources/de.ftl";
import en from "./resources/en.ftl";
import es from "./resources/es.ftl";

/**
 * Holds all available resources.
 *
 * Resources is initiliazed via the `loadResources`
 * function. Thus, don't forget to load the resources.
 */
const resources = {
  de: new FluentResource(de),
  en: new FluentResource(en),
  es: new FluentResource(es),
};

/**
 * The base language code acts as fallback in case a translation does not exist.
 *
 * The base language is the language used during development. In most cases it's
 * English.
 */
const baseLanguageCode = "en";

/**
 * Gets the pattern of an id.
 *
 * The id can be a sole language id `hello`, or a combined
 * message/attribute id `hello.world`.
 */
function getPattern(id, bundle) {
  if (id.includes(".")) {
    const message = bundle.getMessage(id.split(".")[0]);
    const attributePattern = message?.attributes[id.split(".")[1]];
    return attributePattern;
  } else {
    const message = bundle.getMessage(id);
    // pattern can be null, want to avoid using null thus if null -> undefined
    const messagePattern = message?.value ?? undefined;
    return messagePattern;
  }
}

/**
 * Formats the pattern of a `Message` or an `Attribute`.
 *
 */
function format(id, args, errors) {
  const _locale = get(locale);
  const bundle = new FluentBundle([_locale]);
  bundle.addResource(resources[_locale]);
  const pattern = getPattern(id, bundle);
  if (pattern === undefined) {
    return `missing "${id}"`;

    // not using fallback to illustrate problem of missing translations
    // bundle.addResource(resources[baseLanguageCode]);
    // const fallbackPattern = getPattern(id, bundle);
    // if (fallbackPattern) {
    //   console.info("Using fallback pattern.");
    //   return bundle.formatPattern(fallbackPattern, args, errors);
    // } else {
    //   console.error(
    //     `No fallback exists. Are you sure that the id "${id}" exists?`
    //   );
    //   return id;
    // }
  }
  return bundle.formatPattern(pattern, args, errors);
}

/**
 * Store with the current locale the users visits the site in.
 *
 * Is initialized with the locale from the `locale` cookie.
 */
// The locale cookie is initilaized in the `hooks.ts`
export const locale = writable(Cookies.get("locale") ?? baseLanguageCode);

/**
 * Each time the locale changes, the locale cookie value is set.
 *
 * It is assumed that the locale is only explicitly changed when the user
 * changes his prefference.
 */
locale.subscribe((value) => {
  Cookies.set("locale", value, { expires: 365 });
});

/**
 * Translation function which automatically "rebuilds" if the locale changes.
 *
 * @example
 *
 */
export const t = derived(locale, () => format);
