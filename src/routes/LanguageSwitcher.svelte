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
				class={(language === selectedLanguage ? 'text-white ' : 'text-black/70 ') +
					' relative py-1 px-3 text-md z-20'}
			>
				{language}
			</div>
		</button>
	{/each}

	<div
		class={(selectedLanguage === languages[0] ? 'translate-x-[0px] ' : 'translate-x-[42px] ') +
			'absolute w-[43px] h-[30px] translate-y-[5px] bg-[#f73c02] top-0 rounded-md z-10 shadow-lg '}
	/>
</div>
