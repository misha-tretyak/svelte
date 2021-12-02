<script context="module">
    import { client } from './apollo';
    import { json_file, tails } from './store';
    import { UPDATE_TAIL, REMOVE_TAIL } from './graphql';
</script>

<script>
    import { mutate } from 'svelte-apollo';
    import AddTail from "./AddTail.svelte";

    let editableTail = null;
    let isAddTail = false;
    let tailDetails = null;
    let files;
    export let params;
    let url = localStorage.getItem('json_url');
    let file_data = [];

    json_file.subscribe(value => {
        file_data = value;
    });

    $: {
        if (files && files[0]) {
            let binfile = files[0];
            let reader = new FileReader();
            reader.onload = function(event) {
                json_file.update(prev => [...prev, ...JSON.parse(event.target.result)]);
            }
            reader.readAsText(binfile);
        }
        if (url) {
            readJSON();
        }
    }

    async function deleteTail(json_id) {
        try {
            await mutate(client, {
                mutation: REMOVE_TAIL,
                variables: { json_id }
            });
        } catch (err) {
            console.error(err);
        }
    }

    function setTailDetails(json_id) {
        if (file_data) {
            tailDetails = file_data.find((item) => item.id === json_id);
        }
    }

    function readJSON() {
        if (url) {
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    json_file.update(prev => [...prev, ...json]);
                });
            localStorage.setItem('json_url', url);
        }
    }

    function downloadJSON() {
        const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(file_data));
        const element = document.getElementById('downloadJSON');
        element.href = 'data:' + data;
        element.download = 'new_json.json';
    }

    async function editTail(json_id, tail) {
        try {
            await mutate(client, {
                mutation: UPDATE_TAIL,
                variables: { json_id, tail }
            });
            editableTail = null;
        } catch (err) {
            console.error(err);
            editableTail = null;
        }
    }
</script>
    <h2 class="title">Settings</h2>
    <div class="fileContainer">
        <label class="fileInput">
            <input type="file" bind:files={files}/>
            Upload your JSON file
        </label>
        <h5>OR</h5>
        <input class="inputUrl" type="text" id="json-url-input" placeholder="Paste link to your JSON file" bind:value={url} />
    </div>
    <div class="fileContent">{file_data ? JSON.stringify(file_data) : '[]'}</div>
    <div class="btnContainer">
        <a class="downloadJSON" id="downloadJSON" on:click={() => downloadJSON()}>Download JSON</a>
    </div>
<div class="manageTailsContainer">
    <h2>List Tails</h2>
    {#await $tails}
        <h4>Loading...</h4>
    {:then result}
        {#each result.data.long_tails as tail (tail.json_id)}
            {#if editableTail === tail.json_id }
                <div class="tailItem">
                    <input class="tail" type="text" id="tail-name" bind:value={tail.tail} />
                    <button on:click={() => editTail(tail.json_id, tail.tail)}>Save</button>
                    <button on:click={() => editableTail = null}>Cancel</button>
                </div>
            {:else}
                <div class="tailItem">
                    <p class="tail" on:click={() => setTailDetails(tail.json_id)}>{tail.tail}</p>
                    <button on:click={() => deleteTail(tail.json_id)}>Delete</button>
                    <button on:click={() => editableTail = tail.json_id}>Edit</button>
                </div>
            {/if}
        {:else}
            <li>No tails found</li>
        {/each}
    {:catch error}
        <li>Error loading tails: {error}</li>
    {/await}
</div>

        <h2 class="title">Create new tail</h2>
        <div class="addTailBlock">
    {#if isAddTail}
            <AddTail />
        <button on:click={() => isAddTail = false}> Close </button>
    {:else}
        <button on:click={() => isAddTail = true}> Create new tail </button>
    {/if}
        </div>


<style>

</style>