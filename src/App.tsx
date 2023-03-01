import { useI18n } from "@solid-primitives/i18n";
import { $DEVCOMP, createSignal, For } from "solid-js";

export function App() {
  const [t, { locale }] = useI18n();
  const [shoeName, setShoeName] = createSignal("Nike Air Max");

  return (
    <div class="max-w-sm mx-auto py-8 space-y-4">
      <div class="tabs tabs-boxed justify-center shadow">
        <For
          each={[
            ["en", "🇬🇧"],
            ["de", "🇩🇪"],
            ["fr", "🇫🇷"],
          ]}
        >
          {([languageCode, emoji]) => (
            <a
              class="tab"
              onClick={() => locale(languageCode)}
              classList={{ "tab-active": locale() === languageCode }}
            >
              {languageCode} {emoji}
            </a>
          )}
        </For>
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">{t("inputQuestion")}</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
          value={shoeName()}
          onInput={(e) => setShoeName((e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="card w-full bg-base-100 shadow">
        <figure>
          <img src="https://source.unsplash.com/400x225/?shoes,commerical" alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {t("shoeCardTitle", { name: shoeName() })}
            <div class="badge badge-secondary text-center h-fit">{t("new")}</div>
          </h2>
          <p>{t("shoeDescription")}</p>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">{t("categoryFashion")}</div>
            <div class="badge badge-outline">{t("categoryProducts")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
