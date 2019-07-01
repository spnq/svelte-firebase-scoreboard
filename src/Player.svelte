<script>
    import { firestore } from './Firebase';
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    export let name;
    export let points;
    export let winner;
    
    let hidden = false;
    let result;

    const query = firestore.collection('players').where("name", "==", name).get();
    const dispatch = createEventDispatcher()

    const increment = async () => {
        let snapshot = await query;
        result = 'win';
        snapshot.forEach( doc => firestore.collection('players').doc(doc.id).update({points: points += 1}))
        dispatch('updateLog', {name, result, time: Date.now()})
    }
    const decrement = async () => {
        let snapshot = await query;
        result = 'decrease';
        snapshot.forEach( doc => firestore.collection('players').doc(doc.id).update({points: points -= 1}))
        dispatch('updateLog', {name, result, time: Date.now()});
    }

</script>

<style>
	h1 {color: black;}
	.card {
		background-color: rgb(132, 204, 174);
		width: 30%;
		border-radius: 2px;
    }
    
    button { 
        padding: 0.5rem 2rem;
        border: none;
        border-radius: 2px;
        background-color: rgb(180, 148, 179)
    }
    .shadow {box-shadow:  0 5px 3px rgba(0, 0, 0, 0.12), 0 3px 2px rgba(0, 0, 0, 0.24)}
    .card h1, h3{text-align: center}
    .controls { display: flex; justify-content: space-around;  flex-wrap: wrap;}
    @media screen and (max-width: 769px) {
        .controls { flex-direction: column }
        .card {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            width: 80%;
            margin-bottom: 2rem;
        }
	}
</style>

	<div class="card shadow" in:fly="{{ y: 200, duration: 700 }}">
        {#if winner}
    		<h1>👑 {name}</h1>
        {:else}
            <h1>{name}</h1>
        {/if}
		<h3>{points}</h3>
        <section class="controls">
            <button class="shadow" on:click={increment}>WIN</button>
        {#if !hidden}
            <button class="shadow" on:click={decrement}>DECREASE POINTS</button>
        {/if}
        </section>
	</div>

