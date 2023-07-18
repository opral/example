import { getRuntimeFromLocals } from '@inlang/sdk-js/adapter-sveltekit/server';
import { fail } from '@sveltejs/kit';
import type { Todo } from './model.js';
import { v4 as uuid } from 'uuid';

const db = new Map<string, Todo[]>();

export const load = async ({ locals }) => {
	const todos = db.get(locals.userId) || [];

	// const { i } = getRuntimeFromLocals(locals);
	// console.log(i('server.logs.loaded', { count: todos.length }));

	return { todos };
};

export const actions = {
	add: async ({ request, locals }) => {
		const { i } = getRuntimeFromLocals(locals);

		const data = await request.formData();
		const title = data.get('title');
		// TODO: translate
		if (!title) return fail(400, { error: i('server.error.missingField', { field: 'title' }) });
		if (!(typeof title === 'string'))
			return fail(400, { error: i('server.error.incorrectField', { field: 'title' }) });

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
		const { i } = getRuntimeFromLocals(locals);

		const data = await request.formData();
		const id = data.get('id');
		// TODO: translate
		if (!id) return fail(400, { error: i('server.error.missingField', { field: 'id' }) });
		if (!(typeof id === 'string'))
			return fail(400, { error: i('server.error.incorrectField', { field: 'id' }) });

		const { userId } = locals;
		const todos = db.get(userId) || [];
		db.set(
			userId,
			todos.map((todo) => (todo.id !== id ? todo : { ...todo, completed: !todo.completed }))
		);

		// console.log(i(`server.logs.${'completed'}`, { id: userId }));
	},

	delete: async ({ request, locals }) => {
		const { i } = getRuntimeFromLocals(locals);

		const data = await request.formData();
		const id = data.get('id');
		// TODO: translate
		if (!id) return fail(400, { error: i('server.error.missingField', { field: 'id' }) });
		if (!(typeof id === 'string'))
			return fail(400, { error: i('server.error.incorrectField', { field: 'id' }) });

		const { userId } = locals;
		const todos = db.get(userId) || [];
		db.set(
			userId,
			todos.filter((todo) => todo.id !== id)
		);

		// console.log(i('server.logs.deleted', { id: userId }));
	}
};
