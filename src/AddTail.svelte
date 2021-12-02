<script>
  import { mutate } from 'svelte-apollo';
  import { client } from './apollo';
  import { json_file } from './store';
  import { CREATE_TAIL } from './graphql';

  let tail = '';
  let title = '';
  let description = '';

  async function addTail(e) {
    e.preventDefault();
    try {
      if (tail && title && description) {
        const result = await mutate(client, {
          mutation: CREATE_TAIL,
          variables: { tail }
        });
        json_file.update(prev => [...prev, {id: result.data.insert_long_tails_one.json_id, title, description}]);
        tail = '';
        title = '';
        description = '';
      } else {
        alert('Please provide all values!')
      }
    } catch(error) {
      console.error(error);
      if (error.message === 'GraphQL error: Uniqueness violation. duplicate key value violates unique constraint "long_tails_tail_key"') {
        alert(`This tail already exists!`);
        tail = '';
        title = '';
        description = '';
      }
    }
  }
</script>

<form on:submit={addTail} class="addTail">
  <input placeholder="Name on DB" type="text" id="tail-name" bind:value={tail} />
  <input placeholder="Title on JSON" type="text" id="tail-title" bind:value={title} />
  <input placeholder="Description on JSON" type="text" id="tail-description" bind:value={description} />
  <button type="submit">Create</button>
</form>