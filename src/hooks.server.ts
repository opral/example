import { getRuntimeFromLocals } from '@inlang/sdk-js/adapter-sveltekit/server'
import type { Cookies } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid'

// TODO: store language in a cookie to access it on the server

export const handle = ({ resolve, event }) => {
	event.locals.userId = getUserId(event.cookies)

	return resolve(event);
}

const getUserId = (cookies: Cookies) => {
	const id = cookies.get('userId')
	if (id) return id

	const newId = uuid()
	cookies.set('userId', newId)

	return newId
}

// TODO: also wrap `handleError`
export const handleError = async ({ event }) => {
	const { i } = getRuntimeFromLocals(event.locals)

	return {
		message: i('server.error'),
	};
};