<script lang="ts">
	import {
		languages,
		switchLanguage,
		loadResource,
		language as selectedLanguage
	} from '@inlang/sdk-js';
</script>

<div class="relative bg-white w-fit border border-slate-300 rounded-xl py-1 px-[6px]">
	{#each languages as language}
		<button
			on:focus={() => loadResource(language)}
			on:mouseover={() => loadResource(language)}
			on:click={() => switchLanguage(language)}
		>
			<div
				class={(language === selectedLanguage ? 'text-white bg-[#f73c02] top-0 rounded-md z-10 shadow-lg ' : 'text-black/70 ') +
					' relative py-1 px-3 text-md z-20 hover:font-bold'}
			>
				{language}
			</div>
		</button>
	{/each}
</div>