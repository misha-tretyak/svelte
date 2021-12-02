<script>
    import { json_file, tails } from './store';

    let file_data = [];
    let tailDetails;
    let error = '';
    export let params;

    json_file.subscribe(value => {
        file_data = value;
    });

    const getDetails = async (tails, tail) => {
        const temp_tail = tails.find((item) => item.tail === tail);
        if (file_data.length) {
            return file_data.find((item) => item.id === temp_tail.json_id);
        } else {
            error = 'Please provide JSON!';
        }
    }
</script>


{#await $tails then tails_response}
    {#await getDetails(tails_response.data.long_tails, params.tail) then result}
        <div class="title">
            {#if result}
                <h1>{result.title}</h1>
                <br>
                <br>
                <h3>{result.description}</h3>
            {:else}
                <h1>Nothing found for: `{params.tail}`</h1>
                <p>{error}</p>
            {/if}
        </div>
    {/await}
{/await}

