<script>
	import { i } from '@inlang/sdk-js';
	import TodoForm from './TodoForm.svelte';
	import TodoList from './TodoList.svelte';

	export let data;
	export let form;
</script>

{#if form?.error}
	<p>{form.error}</p>
{/if}

<TodoList todos={data.todos} />

<TodoForm />

<a href="/">
	{i('pages.todo.goToHome')}
</a>
