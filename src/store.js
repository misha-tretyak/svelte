import { writable, derived } from "svelte/store";
import { subscribe } from "svelte-apollo";
import { client } from "./apollo";
import { TAIL_LIST_SUB } from "./graphql";

export const json_file = writable( []);

export const tails = subscribe(client, { query: TAIL_LIST_SUB});
