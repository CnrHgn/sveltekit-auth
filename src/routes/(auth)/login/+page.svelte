<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div>
	<h1>Login</h1>

	<form action="?/login" method="POST" use:enhance>
		<div>
			<label for="email">Email</label>
			<input type="email" name="email" id="email" required />
		</div>

		<div>
			<label for="password">Password</label>
			<input type="Password" name="password" id="password" required />
		</div>

		<button type="submit">Log in</button>

		{#if form?.fail}
			<div>{form?.message}</div>
		{/if}
	</form>
</div>
