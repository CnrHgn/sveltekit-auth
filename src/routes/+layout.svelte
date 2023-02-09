<script lang="ts">
	import '@picocss/pico/css/pico.css';
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
</script>

<svelte:head>
	<title>Svelte Auth</title>
</svelte:head>

<main class="container">
	<nav>
		<ul>
			<li><strong><a href="/"> Brand</a></strong></li>
		</ul>
		<ul>
			{#if !$page.data.user}
				<li><a href="/login">Login</a></li>
				<li><a href="/register">Register</a></li>
			{/if}
			{#if $page.data.user}
				<li><a href="/dashboard">Dashboard</a></li>
				<li>
					<form
						action="/logout"
						method="POST"
						use:enhance={({ action }) => {
							return async ({ result }) => {
								console.log(1);

								// rerun the `load` function for the page
								// https://kit.svelte.dev/docs/modules#$app-navigation-invalidateall
								invalidateAll();

								// since we're customizing the default behaviour
								// we don't want to reimplement what `use:enhance` does
								// so we can use `applyResult` and pass the `result`
								await applyAction(result);
							};
						}}
						style="display: inline;"
					>
						<button type="submit">Log out</button>
					</form>
				</li>
			{/if}
		</ul>
	</nav>
	<nav />

	<slot />
</main>
