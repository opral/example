<script>
  import { t, locale } from "./i18n";
</script>

<nav class="container bg-gray-100 rounded-b py-2 px-4">
  <div class="flex flex-col items-center">
    <p>{$t("select-language")}</p>
    <sl-tab-group bind:this={languageSelector}>
      <sl-tab
        slot="nav"
        panel="en"
        on:click={() => {
          $locale = "en";
        }}>{"🇬🇧 English"}</sl-tab
      >
      <sl-tab
        slot="nav"
        panel="de"
        on:click={() => {
          $locale = "de";
        }}>{"🇩🇪 German"}</sl-tab
      >
      <sl-tab
        slot="nav"
        panel="es"
        on:click={() => {
          $locale = "es";
        }}>{"🇪🇸 Spanish"}</sl-tab
      >
    </sl-tab-group>
  </div>
</nav>
<main class="container p-4 flex justify-center">
  <div class="space-y-4">
    <h1 class="text-xl font-bold">{$t("title")}</h1>
    <sl-card class="card-overview">
      <img
        slot="image"
        src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
        alt="A kitten sits patiently between a terracotta pot and decorative grasses."
      />

      <strong>{$t("card-title")}</strong><br />
      {@html $t("card-description")}

      <div slot="footer">
        <sl-button variant="primary" pill>{$t("button-info")}</sl-button>
        <sl-rating />
      </div>
    </sl-card>
  </div>
</main>

<p>{$t("storm")}</p>


<p>{$t('nauta')}</p>

<style>
  .card-overview {
    max-width: 300px;
  }

  .card-overview [slot="footer"] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
