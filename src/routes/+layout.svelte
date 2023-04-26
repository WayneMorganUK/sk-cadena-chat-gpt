<script>
	import '../app.postcss';
</script>

<slot />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.fuchsia.100);
	}
</style>
