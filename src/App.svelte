<script>
	import router from 'page';
	import Settings from "./Settings.svelte";
	import Tail from "./Tail.svelte";
	import {tails} from "./store";

	let page;
	let params;

	router('/', () => (page = Settings));
	router(
			'/tail/:tail',
			(ctx, next) => {
				params = ctx.params;
				next();
			},
			() => (page = Tail)
	);
	router('/*', () => page = Settings);
	router.start();
</script>

	<div class="sidebar">
		<a  href="/">Settings</a>
		{#await $tails}
			<h4>Loading...</h4>
		{:then result}
			{#each result.data.long_tails as long_tail (long_tail.json_id)}
				<a href="/tail/{long_tail.tail}">
					{long_tail.tail}
				</a>
			{/each}
		{/await}
	</div>
<main>
	<svelte:component this="{page}" params="{params}" />

	<style>
		.sidebar {
			position: fixed;
			overflow: scroll;
			width: 12rem;
			padding-left: 40px;
			padding-top: 50px;
			text-align: center;
			background-color: black;
			top: 0;
			left: 0;
			right: 12rem;
			bottom: 0;
			border-bottom-right-radius: 57px;
			border-top-right-radius: 57px;
		}

		.sidebar a {
			text-decoration: none;
			padding: 8px;
			margin-top: 7px;
			display: block;
			width: 100%;
			color: white;
		}

		.sidebar a.active {
			background-color: white;
			border-bottom-left-radius: 95px;
			border-top-left-radius: 95px;
			color: black !important;
			text-decoration: none;
			padding: 8px;
			margin-top: 7px;
			display: block;
			width: 100%;
		}

		.main {
			min-height: 100%;
			margin-left: 15rem;
			padding: 30px 20px;
		}

		input[type="file"] {
			display: none;
		}

		.title {
			text-align: center;
		}

		.fileInput {
			cursor: pointer;
			background: #000000;
			border-radius: 33px;
			font-size: 14px;
			color: #FFFFFF;
			height: 20px;
			padding: 10px 15px;
		}

		.inputUrl {
			height: 40px;
			margin: 0;
		}

		.downloadJSON, button {
			cursor: pointer;
			background: #000000;
			border-radius: 33px;
			font-size: 14px;
			color: #FFFFFF;
			padding: 10px 15px;
		}
		.downloadJSON {
			height: 20px;
		}

		input {
			border: 1px solid #000000;
			box-sizing: border-box;
			border-radius: 33px;
		}

		.tailItem {
			display: grid;
			grid-template-columns: 400px 100px 100px;
			gap: 30px;
			margin-bottom: 10px;
		}

		.addTailBlock, .addTail {
			display: flex;
			flex-direction: row;
			gap: 20px;
			justify-content: center;
		}

		.fileContainer {
			justify-content: center;
			align-items: center;
			display: flex;
			flex-direction: row;
			gap: 15px;
			margin-bottom: 10px;
		}

		.fileContent {
			margin: auto;
			border-radius: 10px;
			border: 1px solid #000000;
			padding: 10px;
			width: 600px;
			height: 450px;
			overflow: scroll;
			background-color: #cccccc;
		}

		.manageTailsContainer {
			justify-content: center;
			align-items: center;
			display: flex;
			flex-direction: column;
		}

		.btnContainer {
			padding: 10px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			gap: 20px;
		}
	</style>
</main>
