<script>
	import * as m from "$lib/paraglide/messages.js";
	import { page } from '$app/stores';
</script>

<h3>
	{#if $page.status === 4040}
		{m.pages_error_404_title()}
	{:else}
		{$page.error?.message}
	{/if}
</h3>

<a href="/">
	{m.pages_error_cta()}
</a>
