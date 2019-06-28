<script>
	import Player from './Player.svelte'
	import { firestore } from './Firebase'
	import { fly } from 'svelte/transition'
	import { collectionData } from 'rxfire/firestore'


	let players = [];
	const query =  firestore.collection('players')
	const message = 'Loading...'

	collectionData(query, 'id').subscribe( updatedPlayers => {
		players = [...updatedPlayers];
		let winner = players.reduce((acc, val) => acc.points > val.points ? acc : val);
		players.filter( player => player === winner).map(next => Object.assign(next, {winner: true}))
	}, error => message = `Fetching data failed! ${error}`)

</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/firacode/distr/fira_code.css">
</svelte:head>

<style>
	*{font-family: "Fira Code"}
	:global(body){background: #9e9e9e}
	.container {margin-top: 3rem; display: flex; justify-content: space-around; width: 100%; flex-wrap: wrap}
</style>

<link rel="stylesheet" href="" />

<section class="container">
		{#if players.length === 0}
		<p in:fly="{{ y: 200, duration: 700 }}">{message}</p>
		{:else}
			{#each players as $player}
				<Player {...$player} ></Player>
			{/each}
		{/if}
</section>
