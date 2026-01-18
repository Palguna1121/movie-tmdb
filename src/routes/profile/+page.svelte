<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import { fade } from 'svelte/transition';

	let activeTab = 'settings'; // Default to settings as requested

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: 'dashboard' },
		{ id: 'settings', label: 'Settings', icon: 'settings' },
		{ id: 'security', label: 'Security', icon: 'security' }
	];

	// Mock Settings Data (Experimental)
	let settings = {
		emailNotifications: true,
		autoplay: false,
		quality: '1080p',
		language: 'English',
		publicProfile: true
	};

	const qualities = ['720p', '1080p', '4K'];
	const languages = ['English', 'Bahasa Indonesia', 'Español'];
</script>

<svelte:head>
	<title>Profile - NStation</title>
</svelte:head>

<div class="min-h-screen pt-24 pb-12">
	<Container>
		<!-- Header / Hero Profile -->
		<div class="mb-12 flex flex-col items-center gap-8 md:flex-row">
			<div class="relative">
				<div
					class="border-primary h-32 w-32 overflow-hidden rounded-full border-4 bg-zinc-800 shadow-2xl"
				>
					<div class="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
						N
					</div>
				</div>
				<button
					class="absolute right-0 bottom-0 rounded-full border border-gray-600 bg-zinc-800 p-2 transition-colors hover:bg-zinc-700"
					aria-label="Edit Profile Picture"
				>
					<span class="material-icons text-sm text-white">edit</span>
				</button>
			</div>

			<div class="space-y-2 text-center md:text-left">
				<h1 class="text-3xl font-black text-white">N Code</h1>
				<p class="text-gray-400">Premium Member • Joined Jan 2025</p>
				<div class="mt-2 flex flex-wrap justify-center gap-3 md:justify-start">
					<span
						class="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-500"
					>
						Gold Tier
					</span>
					<span
						class="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-500"
					>
						Early Adopter
					</span>
				</div>
			</div>
		</div>

		<!-- Main Content Grid -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
			<!-- Sidebar Navigation -->
			<div class="lg:col-span-1">
				<div class="sticky top-24 space-y-2 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
					{#each tabs as tab}
						<button
							class="flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 {activeTab ===
							tab.id
								? 'bg-primary text-white shadow-lg'
								: 'text-gray-400 hover:bg-white/10 hover:text-white'}"
							on:click={() => (activeTab = tab.id)}
						>
							<span class="material-icons">{tab.icon}</span>
							<span class="font-medium">{tab.label}</span>
						</button>
					{/each}

					<div class="my-2 border-t border-white/10 pt-2">
						<button
							class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-500 transition-colors hover:bg-red-500/10"
						>
							<span class="material-icons">logout</span>
							<span class="font-medium">Sign Out</span>
						</button>
					</div>
				</div>
			</div>

			<!-- Content Area -->
			<div class="lg:col-span-3">
				<div class="min-h-[500px] rounded-xl bg-white/5 p-6 backdrop-blur-sm md:p-8">
					<!-- Settings Tab (Default) -->
					{#if activeTab === 'settings'}
						<div in:fade={{ duration: 300 }} class="space-y-8">
							<div>
								<h2 class="mb-6 text-2xl font-bold text-white">Account Settings</h2>
								<div class="space-y-6">
									<!-- Toggle Group -->
									<div
										class="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4 transition-colors hover:border-white/10"
									>
										<div>
											<h3 class="font-bold text-white">Email Notifications</h3>
											<p class="text-sm text-gray-400">Receive updates about new releases</p>
										</div>
										<button
											class="relative h-6 w-12 rounded-full transition-colors {settings.emailNotifications
												? 'bg-green-500'
												: 'bg-gray-600'}"
											on:click={() => (settings.emailNotifications = !settings.emailNotifications)}
											aria-label="Toggle Email Notifications"
											aria-pressed={settings.emailNotifications}
										>
											<div
												class="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform {settings.emailNotifications
													? 'translate-x-6'
													: 'translate-x-0'}"
											></div>
										</button>
									</div>

									<div
										class="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4 transition-colors hover:border-white/10"
									>
										<div>
											<h3 class="font-bold text-white">Public Profile</h3>
											<p class="text-sm text-gray-400">Allow others to see your watchlists</p>
										</div>
										<button
											class="relative h-6 w-12 rounded-full transition-colors {settings.publicProfile
												? 'bg-green-500'
												: 'bg-gray-600'}"
											on:click={() => (settings.publicProfile = !settings.publicProfile)}
											aria-label="Toggle Public Profile"
											aria-pressed={settings.publicProfile}
										>
											<div
												class="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform {settings.publicProfile
													? 'translate-x-6'
													: 'translate-x-0'}"
											></div>
										</button>
									</div>

									<!-- Autoplay Toggle -->
									<div
										class="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4 transition-colors hover:border-white/10"
									>
										<div>
											<h3 class="font-bold text-white">Autoplay Previous/Next</h3>
											<p class="text-sm text-gray-400">Automatically play next episode</p>
										</div>
										<button
											class="relative h-6 w-12 rounded-full transition-colors {settings.autoplay
												? 'bg-green-500'
												: 'bg-gray-600'}"
											on:click={() => (settings.autoplay = !settings.autoplay)}
											aria-label="Toggle Autoplay"
											aria-pressed={settings.autoplay}
										>
											<div
												class="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform {settings.autoplay
													? 'translate-x-6'
													: 'translate-x-0'}"
											></div>
										</button>
									</div>

									<!-- Dropdowns -->
									<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
										<div class="space-y-2">
											<label for="quality-select" class="text-sm font-bold text-gray-300"
												>Streaming Quality</label
											>
											<select
												id="quality-select"
												bind:value={settings.quality}
												class="focus:ring-primary w-full rounded-lg border border-gray-700 bg-black/50 px-4 py-3 text-white focus:ring-2 focus:outline-none"
											>
												{#each qualities as q}
													<option value={q}>{q}</option>
												{/each}
											</select>
										</div>
										<div class="space-y-2">
											<label for="language-select" class="text-sm font-bold text-gray-300"
												>Language</label
											>
											<select
												id="language-select"
												bind:value={settings.language}
												class="focus:ring-primary w-full rounded-lg border border-gray-700 bg-black/50 px-4 py-3 text-white focus:ring-2 focus:outline-none"
											>
												{#each languages as l}
													<option value={l}>{l}</option>
												{/each}
											</select>
										</div>
									</div>
								</div>
							</div>

							<!-- Save Button (Mock) -->
							<div class="flex justify-end border-t border-white/10 pt-6">
								<button
									class="bg-primary rounded-lg px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-700 active:scale-95"
								>
									Save Changes
								</button>
							</div>
						</div>
						<!-- Other Tabs Placeholder -->
					{:else}
						<div
							in:fade={{ duration: 300 }}
							class="flex h-[400px] flex-col items-center justify-center space-y-4 text-gray-500"
						>
							<span class="material-icons text-6xl opacity-20"
								>{tabs.find((t) => t.id === activeTab)?.icon}</span
							>
							<p class="text-xl font-medium">This section is currently under development.</p>
							<p class="text-sm">Check back later for updates!</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</Container>
</div>
