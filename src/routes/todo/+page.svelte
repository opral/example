<script>
	import TodoForm from './TodoForm.svelte';
	import TodoList from './TodoList.svelte';

	export let data;
	export let form;
</script>

{#if form?.error}
	<p>{form.error}</p>
{/if}

<div class="flex flex-col h-[450px] gap-4">
	<TodoList todos={data.todos} />

	<TodoForm />
</div>
