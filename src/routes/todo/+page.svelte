<script>
	import { i } from '@inlang/sdk-js';
	import TodoForm from './TodoForm.svelte';
	import TodoList from './TodoList.svelte';

	export let data
</script>

<TodoList todos={data.todos}/>

<TodoForm />

<a href="/">
	{i('pages.todo.goToHome')}
</a>