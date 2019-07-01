<script>
	import { fly } from 'svelte/transition'
    import LogItem from './LogItem.svelte'
    import { createEventDispatcher } from 'svelte'
    export let log;
    let editMode = false;
    const dispatch = createEventDispatcher();

    const onRevert = (event) => dispatch('revert', event.detail)
    const toggleEdit = () => editMode = !editMode;
</script>

<style>

    .card{
		width: 70%;
		background-color: #AF8191;
		border-radius: 2px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: inset 0.1px 0.1px 10px rgba(0,0,0,0.9);
    }
    .edit{
        text-align: end
    }
    .edit-block{
        display: flex;
        flex-direction: row-reverse;
        width: 70%;
    }

    @media screen and (max-width: 769px) {
    .card{ width: 100% }
    .edit-block{ width: 90% }
}
</style>
    
{#if log.length > 0}
    <div in:fly="{{ y: 200, duration: 700 }}" class="edit-block">
        <p class="edit" on:click={toggleEdit}>Edit</p>
    </div>
    <div in:fly="{{ y: 200, duration: 700 }}" class="card">
        {#each log as item}
            <LogItem item={item} editMode={editMode} on:revert={onRevert}></LogItem>
        {/each}
    </div>
{/if}