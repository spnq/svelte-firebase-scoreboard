<script>
	import Player from './Player.svelte'
	import { firestore } from './Firebase'
	import { fly } from 'svelte/transition'
	

	let players = [];

	async function getPlayers() {
		const ref = await firestore.collection('players');
		const snapshot = await ref.get();
		players = snapshot.docs.map(doc => doc.data())
		let winner = players.reduce((acc, val) => acc.points > val.points ? acc : val);
		players.filter( player => player === winner).map(next => Object.assign(next, {winner: true}))
		return players;
	}
</script>

<style>
	@import url(https://unpkg.com/firacode/distr/fira_code.css);
	*{font-family: "Fira Code"}
	:global(body){background: #9e9e9e}
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
				<Player {...player} ></Player>
			{/each}
		{/if}
	{:catch err}
		<p>{err}</p>
	{/await}
	
</section>
