<script lang="ts">
	import { languages, switchLanguage, loadResource } from '@inlang/sdk-js';
</script>

{#each languages as language}
	<button
		on:focus={() => loadResource(language)}
		on:mouseover={() => loadResource(language)}
		on:click={() => switchLanguage(language)}
	>
		{language}
	</button>
{/each}
