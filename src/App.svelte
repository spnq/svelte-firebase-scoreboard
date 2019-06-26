<script>
	import Player from './Player.svelte'
	import { firestore } from './Firebase'
	import { fly } from 'svelte/transition'
	
	async function getPlayers() {
		const snapshot = await firestore.collection('players').get();
		return snapshot.docs.map(doc => doc.data());
	}
</script>

<style>
	@import url(https://unpkg.com/firacode/distr/fira_code.css);
	*{font-family: "Fira Code"}
	.container {margin-top: 3rem; display: flex; justify-content: space-around; width: 100%; flex-wrap: wrap}
</style>

<link rel="stylesheet" href="" />

<section class="container">
	{#await getPlayers()}
		<p in:fly="{{ y: 200, duration: 700 }}">Request pending...</p>
	{:then value}
		{#if value.length === 0}
		<p in:fly="{{ y: 200, duration: 700 }}">No Players!</p>
		{:else}
			{#each value as player}
				<Player {...player}></Player>
			{/each}
		{/if}
	{/await}
	
</section>
