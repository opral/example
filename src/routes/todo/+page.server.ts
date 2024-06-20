import { fail } from '@sveltejs/kit';
import type { Todo } from './model.js';
import { v4 as uuid } from 'uuid';
import * as m from '$lib/paraglide/messages.js';

const db = new Map<string, Todo[]>();

export const load = async ({ locals }) => {
	const todos = db.get(locals.userId) || [];

	// const { i } = getRuntimeFromLocals(locals);
	// console.log(i('server.logs.loaded', { count: todos.length }));

	return { todos };
};

export const actions = {
	add: async ({ request, locals }) => {
		const data = await request.formData();
		const title = data.get('title');
		// TODO: translate
		if (!title) return fail(400, { error: m.server_error_missingField({ field: 'title' }) });
		if (!(typeof title === 'string'))
			return fail(400, { error: m.server_error_incorrectField({ field: 'title' }) });

		const todo: Todo = {
			id: uuid(),
			title,
			completed: false
		};

		const { userId } = locals;
		const todos = db.get(userId) || [];
		db.set(userId, [...todos, todo]);

		// console.log(i('server.logs.added', { id: userId }));
	},

	toggle: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (!id) return fail(400, { error: m.server_error_missingField({ field: 'id' }) });
		if (!(typeof id === 'string'))
			return fail(400, { error: m.server_error_incorrectField({ field: 'id' }) });

		const { userId } = locals;
		const todos = db.get(userId) || [];
		db.set(
			userId,
			todos.map((todo) => (todo.id !== id ? todo : { ...todo, completed: !todo.completed }))
		);

		// console.log(i(`server.logs.${'completed'}`, { id: userId }));
	},

	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id');
		// TODO: translate
		if (!id) return fail(400, { error: m.server_error_missingField({ field: 'id' }) });
		if (!(typeof id === 'string'))
			return fail(400, { error: m.server_error_incorrectField({ field: 'title' }) });

		const { userId } = locals;
		const todos = db.get(userId) || [];
		db.set(
			userId,
			todos.filter((todo) => todo.id !== id)
		);
	}
};
