<script>
	import '../app.css';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import GlobalLoader from '$lib/components/ui/GlobalLoader.svelte';
	import { loadingStore } from '$lib/stores/loading.store';
	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';
</script>

<GlobalLoader visible={!!$navigating || $loadingStore} />

<div
	class="bg-background-light dark:bg-background-dark font-body flex min-h-screen flex-col text-gray-900 transition-colors duration-300 dark:text-gray-100"
>
	<Navbar />

	<main class="flex-grow">
		<slot />
	</main>

	<Footer />
	<Modal />
</div>
