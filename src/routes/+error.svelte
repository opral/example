<script>
	import { i } from '@inlang/sdk-js';
	import { page } from '$app/stores';
</script>

<h3>
	{#if $page.status === 4040}
		{i('pages.404.title')}
	{:else}
		{$page.error?.message}
	{/if}
</h3>

<a href="/">
	{i('pages.404.cta')}
</a>
