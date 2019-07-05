<script>
	import Player from './Player.svelte'
	import Logger from './Logger.svelte'
	import { firestore, increment } from './Firebase'
	import { fly } from 'svelte/transition'
	import { collectionData } from 'rxfire/firestore'

	let players = [];
	let log = [];
	const playersQuery =  firestore.collection('players');
	const logQuery =  firestore.collection('log');
	const message = 'Loading...';

	const changePoints = async (points, playerName) => {
		const player = await playersQuery.where("name", "==", playerName).get();
		player.forEach( doc => playersQuery.doc(doc.id).update({points: increment(points)}));
	}

	const incrementPoints = playerName => changePoints(1, playerName);
	const decrementPoints = playerName => changePoints(-1, playerName);


	const updateLog = ({detail: {name, result, time}}) => {
		result === 'win' ? incrementPoints(name) : decrementPoints(name)
		logQuery.add({name, result, time})
	}

	const onRevert = ({detail: {name, result, time, id}}) => {
		result === 'win' ? decrementPoints(name) : incrementPoints(name)
		logQuery.doc(id).delete().then();
	}

    collectionData(logQuery, 'id').subscribe( newLog => log = [...newLog.sort( (a,b) => b.time -  a.time)].slice(0,10))
	
	collectionData(playersQuery, 'id').subscribe( updatedPlayers => {
		players = [...updatedPlayers];
		let winner = players.reduce((acc, val) => acc.points > val.points ? acc : val);
		if (players.filter( player => player.points === winner.points).length > 1) return;
		players.filter( player => player === winner).map(next => Object.assign(next, {winner: true}))
	}, error => message = `Fetching data failed! ${error}`)

</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/firacode/distr/fira_code.css">
</svelte:head>

<style>
	*{font-family: "Fira Code"}
	:global(body){background: #048b80}
	.glad {
		height: 80vh;
	}
	.container {margin-top: 3rem; display: flex; justify-content: space-around; width: 100%; flex-wrap: wrap}
	.logger {margin-top: 3rem; display: flex; flex-direction: column; align-items: center; width: 100%; flex-wrap: wrap}
</style>

<link rel="stylesheet" href="" />

<section class="container">
		{#if players.length === 0}
		<p in:fly="{{ y: 200, duration: 700 }}">
			<img class="glad" src="./tenor.gif" alt="valakas">
		</p>
		{:else}
			{#each players as $player}
				<Player on:updateLog={updateLog} {...$player} ></Player>
			{/each}
		{/if}
</section>
<section class="logger">
	<Logger log={log} on:revert={onRevert}></Logger>
</section>
