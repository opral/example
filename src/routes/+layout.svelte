<script>
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import './app.css';
	import { i } from '@inlang/sdk-js';
	import { page } from '$app/stores';

	console.log($page.url.pathname);
</script>

<div class="flex flex-col h-screen w-screen">
	<div class="flex justify-center items-center w-screen grow">
		<div
			class="relative w-[370px] bg-slate-50 p-8 rounded-2xl -translate-y-4 border border-slate-200"
		>
			<div class="absolute top-8 right-8">
				<LanguageSwitcher />
			</div>
			{#if $page.url.pathname === '/todo'}
				<a
					class="absolute top-8 left-8 hover:bg-slate-200 h-10 px-3 -ml-2 rounded-lg flex justify-center items-center text-slate-500 hover:text-slate-900"
					href="/"
				>
					{i('pages.todo.goToHome')}
				</a>
			{/if}
			<Header />
			<slot />
		</div>
	</div>
	<Footer />
</div>
