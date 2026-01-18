<script lang="ts">
	import { fade } from 'svelte/transition';
	export let visible: boolean = true;
</script>

{#if visible}
	<div class="fixed inset-0 z-[100] grid h-full w-full place-items-center bg-[#212121]" out:fade>
		<div class="relative container">
			<div class="preloader">
				<span class="shape-1"></span>
				<span class="shape-2"></span>
				<span class="shape-3"></span>
			</div>
			<div class="shadow-anim"></div>
			<p class="mt-16 text-center text-sm font-medium tracking-wider text-gray-400">
				Please wait. NStation don't use Government Servers.
			</p>
		</div>
	</div>
{/if}

<style>
	.container {
		position: relative;
	}

	.preloader {
		animation: rotate 2.3s cubic-bezier(0.75, 0, 0.5, 1) infinite;
		width: 64px;
		height: 64px;
		margin: 0 auto;
		position: relative;
	}

	@keyframes rotate {
		50% {
			transform: rotate(360deg);
		}
		100% {
			transform: rotate(720deg);
		}
	}

	.preloader span {
		--c: #f23f3f;
		position: absolute;
		display: block;
		height: 64px;
		width: 64px;
		background: var(--c);
		border: 1px solid var(--c);
		border-radius: 100%;
	}

	.shape-1 {
		transform: translate(-28px, -28px);
		animation: shape_1 2.3s cubic-bezier(0.75, 0, 0.5, 1) infinite;
	}

	@keyframes shape_1 {
		60% {
			transform: scale(0.4);
		}
	}

	.shape-2 {
		transform: translate(28px, -28px);
		animation: shape_2 2.3s cubic-bezier(0.75, 0, 0.5, 1) infinite;
	}

	@keyframes shape_2 {
		40% {
			transform: scale(0.4);
		}
	}

	.shape-3 {
		position: relative;
		border-radius: 0px !important;
		transform: scale(0.98) rotate(-45deg);
		animation: shape_3 2.3s cubic-bezier(0.75, 0, 0.5, 1) infinite;
	}

	@keyframes shape_3 {
		50% {
			border-radius: 100%;
			transform: scale(0.5) rotate(-45deg);
		}
		100% {
			transform: scale(0.98) rotate(-45deg);
		}
	}

	.shadow-anim {
		position: relative;
		top: 30px;
		left: 50%;
		transform: translateX(-50%);
		display: block;
		height: 16px;
		width: 64px;
		border-radius: 50%;
		background-color: #d9d9d9;
		border: 1px solid #d9d9d9;
		animation: shadow 2.3s cubic-bezier(0.75, 0, 0.5, 1) infinite;
	}

	@keyframes shadow {
		50% {
			transform: translateX(-50%) scale(0.5);
			border-color: #f2f2f2;
		}
	}
</style>
