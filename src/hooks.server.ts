import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/database';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const user = await db.user.findUnique({
		where: {
			authToken: session
		},
		select: {
			name: true,
			email: true,
			role: true
		}
	});

	if (user) {
		event.locals.user = {
			name: user.name || '',
			email: user.email,
			role: user.role.name
		};
	}

	return await resolve(event);
};
