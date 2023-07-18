<script lang="ts">
	import { enhance } from '$app/forms';
	import { i } from '@inlang/sdk-js';
</script>

<form method="POST" action="?/add" use:enhance class="flex items-center gap-1">
	<input
		class="h-10 border border-slate-300 rounded-lg px-3 grow"
		name="title"
		type="text"
		placeholder={i('app.placeholder')}
	/>

	<button title={i('app.addTodo')}>
		<div
			class="w-10 h-10 bg-slate-700 border border-slate-300 flex justify-center items-center font-medium text-xl text-slate-50 pb-[3px] rounded-lg shadow-lg hover:bg-slate-900"
		>
			+
		</div>
	</button>
</form>
