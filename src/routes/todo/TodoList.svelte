<script lang="ts">
	import { i, language } from '@inlang/sdk-js';
	import type { Todo } from './model.js';
	import { enhance } from '$app/forms';

	export let todos: Todo[];

	const dateFormatter = Intl.DateTimeFormat(language, { weekday: 'long' });
</script>

<div>
	{i('app.today', { date: dateFormatter.format(new Date()) })}
</div>

<p>{i('app.nrOfTodos', { count: todos.length })}</p>

<ul>
	{#each todos as todo}
		<li>
			<form method="POST" use:enhance>
				<input type="hidden" name="id" value={todo.id} />

					<button formaction="?/toggle" title={i(`app.${todo.completed ? 'markAsIncomplete' : 'markAsDone'}`)}>
						<input type="checkbox" name="done" checked={todo.completed} />
					</button>

				{todo.title}

				<button formaction="?/delete" title={i('app.deleteTodo')}>x</button>
			</form>
		</li>
	{/each}
</ul>


<style>
	[type="checkbox"] {
		pointer-events: none;
	}
</style>