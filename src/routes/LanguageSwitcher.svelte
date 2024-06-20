<script>
	import { i18n } from '$lib/i18n';
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';
</script>

<div class="relative bg-white w-fit border border-slate-300 rounded-xl py-1 px-[6px]">
	{#each availableLanguageTags as language}
		<a
			hreflang={language}
			href={i18n.route($page.url.pathname)}
			class={(languageTag() === language ? 'text-white ' : 'text-black/70 ') +
				' relative py-1 px-3 text-md z-20'}
		>
			{language}
		</a>
	{/each}

	<div
		class={(languageTag() === availableLanguageTags[0]
			? 'translate-x-[0px] '
			: 'translate-x-[42px] ') +
			'absolute w-[43px] h-[30px] translate-y-[5px] bg-[#f73c02] top-0 rounded-md z-10 shadow-lg '}
	/>
</div>
