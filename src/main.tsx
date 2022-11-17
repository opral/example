/* @refresh reload */
import { render } from "solid-js/web";
import "./style.css";
import { App } from "./App.jsx";
import { createI18nContext, I18nContext } from "@solid-primitives/i18n";
import fr from "../resources/fr.js";
import en from "../resources/en.js";
import de from "../resources/de.js";

const i18n = createI18nContext({ fr, en, de }, "en");

render(
  () => (
    <I18nContext.Provider value={i18n}>
      <App />
    </I18nContext.Provider>
  ),
  document.getElementById("root") as HTMLElement
);
