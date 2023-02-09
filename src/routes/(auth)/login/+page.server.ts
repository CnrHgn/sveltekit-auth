import { redirect, fail } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcrypt';

import { db } from '$lib/database';

enum Role {
	ADMIN = 'ADMIN',
	USER = 'USER'
}

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

const login: Action = async ({ request, cookies }) => {
	const data = await request.formData();
	const email = data.get('email');
	const password = data.get('password');

	if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
		return fail(400, { fail: true, message: 'Invalid email or password' });
	}

	const user = await db.user.findUnique({
		where: {
			email: email
		}
	});

	if (!user) {
		return fail(400, { fail: true, message: 'User does not exist' });
	}

	const userPassword = await bcrypt.compare(password, user.password);

	if (!userPassword) {
		return fail(400, { fail: true, message: 'Invalid email or password' });
	}

	// generate a new authtoken for the user
	const authenticatedUser = await db.user.update({
		where: {
			email: email
		},
		data: {
			authToken: crypto.randomUUID()
		}
	});

	// create cookie with the authtoken
	cookies.set('session', authenticatedUser.authToken, {
		path: '/',
		maxAge: 60 * 60 * 24 * 7, // 1 week
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production'
	});

	throw redirect(302, '/dashboard');
};

export const actions: Actions = { login };
