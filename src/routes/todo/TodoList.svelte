<script lang="ts">
	import type { Todo } from './model.js';
	import { enhance } from '$app/forms';
	import { languageTag } from '$lib/paraglide/runtime.js';
	import * as m from '$lib/paraglide/messages.js';

	export let todos: Todo[];

	const dateFormatter = Intl.DateTimeFormat(languageTag(), { weekday: 'long' });
</script>

<div class="flex justify-between pt-16 border-b border-slate-200 pb-6">
	<div class="text-base text-slate-800 font-medium">
		{m.app_today({ date: dateFormatter.format(new Date()) })}
	</div>

	<p class="text-slate-500">{m.app_nrOfTodos({ count: todos.length })}</p>
</div>

<ul class="grow flex flex-col">
	{#each todos as todo}
		<li>
			<form method="POST" use:enhance class="flex gap-4 items-center">
				<input type="hidden" name="id" value={todo.id} />

				<button
					formaction="?/toggle"
					title={todo.completed ? m.app_markAsIncomplete() : m.app_markAsDone()}
					class="flex items-center"
				>
					<input type="checkbox" name="done" checked={todo.completed} class="w-4 h-4" />
				</button>

				<div class="grow">
					{todo.title}
				</div>

				<button
					class="w-10 h-10 flex justify-center items-center font-medium text-2xl text-slate-700 rounded-lg hover:bg-slate-200 hover:text-slate-900"
					formaction="?/delete"
					title={m.app_deleteTodo()}
				>
					<div class="rotate-45 pb-[3px]">+</div>
				</button>
			</form>
		</li>
	{/each}
</ul>

<style>
	[type='checkbox'] {
		pointer-events: none;
	}
</style>
