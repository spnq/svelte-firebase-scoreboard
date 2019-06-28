<script>
    import { fly, fade, slide } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte'
    export let item;
    export let editMode;

    const dispatch = createEventDispatcher()
    const revert = () => dispatch('revert', {...item})


</script>

<style>
    .log{
        width: 90%;
		background-color: rgb(212, 207, 207);
		border-radius: 2px;
        padding: 0.5px;
        margin-bottom: 8px;
        text-align: center;
        box-shadow:  0 5px 3px rgba(0, 0, 0, 0.12), 0 3px 2px rgba(0, 0, 0, 0.24)
    }
</style>

<div transition:slide class="log">
    <h4>Name: {item.name}, result: {item.result}, time: {new Date(item.time).toLocaleString()}</h4>
    {#if editMode}
        <p transition:fade  on:click={revert}>REVERT</p>
    {/if}
</div>