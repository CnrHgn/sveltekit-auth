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

const register: Action = async ({ request }) => {
	const data = await request.formData();
	const name = data.get('name');
	const email = data.get('email');
	const password = data.get('password');

	if (
		typeof email !== 'string' ||
		typeof name !== 'string' ||
		typeof password !== 'string' ||
		!email ||
		!name ||
		!password
	) {
		return fail(400, { fail: true, message: 'Invalid email or password' });
	}

	const user = await db.user.findUnique({
		where: {
			email: email
		}
	});

	if (user) {
		return fail(400, { fail: true, message: 'User already exists' });
	}

	await db.user.create({
		data: {
			name,
			email,
			password: await bcrypt.hash(password, 10),
			authToken: crypto.randomUUID()
		}
	});

	throw redirect(302, '/login');
};

export const actions: Actions = { register };
