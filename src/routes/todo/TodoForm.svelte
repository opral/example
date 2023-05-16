<script lang="ts">
	import { enhance } from '$app/forms';
	import { i } from '@inlang/sdk-js';
</script>

<form method="POST" action="?/add" use:enhance>
	<input name="title" type="text" placeholder={i('app.placeholder')} />

	<button title={i('app.addTodo')}>+</button>
</form>
