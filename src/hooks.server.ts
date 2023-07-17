import { getRuntimeFromLocals } from '@inlang/sdk-js/adapter-sveltekit/server';
import type { Cookies } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';

export const handle = ({ resolve, event }) => {
	event.locals.userId = getUserId(event.cookies);

	// TODO: store language in a cookie to access it on the server
	// currently we need to set this manually

	return resolve(event);
};

const getUserId = (cookies: Cookies) => {
	const id = cookies.get('userId');
	if (id) return id;

	const newId = uuid();
	cookies.set('userId', newId);

	return newId;
};

// TODO: also wrap `handleError`
export const handleError = async ({ error, event }) => {
	console.error(error);
	const { i } = getRuntimeFromLocals(event.locals);

	return {
		message: i('server.error.generic')
	};
};
