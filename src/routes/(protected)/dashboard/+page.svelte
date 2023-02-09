<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>Admin</h1>

{#if $page.data?.user}
	<pre>{JSON.stringify($page, null, 2)}</pre>
	<p>Welcome {$page.data.user.name} 👋🏼</p>
	<p>{$page.data.user.email} 👋🏼</p>
{/if}

{#if $page.data?.user.role === 'ADMIN'}
	<p>Admin</p>
{/if}

{#if $page.data?.user.role === 'USER'}
	<p>User</p>
{/if}
