<script lang="ts">
	import oscar from '$lib/images/oscar-wilde.png';
	let prompt = '';
	let response = '';

	const handleSubmit = async () => {
		const res = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({
				prompt: `Make a tweet about: ${prompt} and add emojis to make it more fun.`
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
		response = await res.json();
	};
</script>

<div class="pt-14 px-8 mx-auto max-w-xl">
	<div class="flex flex-row mb-8">
		<img src={oscar} alt="Cadena Logo" class=" h-16 ml-7 mr-4" />
		<h1 class="text-3xl font-bold text-gray-900">Oscar Wilde Quotations</h1>
	</div>
	<div class="p-8 bg-slate-800 min-h-[240px] rounded-2xl flex flex-col items-center">
		<form on:submit|preventDefault={() => handleSubmit()} class="w-full max-w-lg">
			<div class="pb-2 flex items-center border-b-2 border-orange-600">
				<input
					class="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 leading-tight focus:outline-none"
					type="text"
					placeholder="Ask Oscar to quote on any topic."
					bind:value={prompt}
				/>
				<button
					class="flex-shrink-0 bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded"
					type="submit"
				>
					Generate
				</button>
			</div>
		</form>
		{#if response}
			<div class="w-full max-w-lg mt-4">
				<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<p class="text-gray-700 text-base">{response}</p>
				</div>
			</div>
		{/if}
	</div>
</div>
