<script lang="ts">
    import { MapPin, Search, ArrowLeft, Navigation } from '@lucide/svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import { goto } from '$app/navigation';

    let search = $state('');
    let loading = $state(false);

    async function handleSelect() {
        loading = true;
        // Logic to update user's passport location
        setTimeout(() => {
            loading = false;
            goto('/home/discover');
        }, 1500);
    }
</script>

<div class="h-screen flex flex-col bg-gray-50">
    <header class="p-4 border-b bg-white flex items-center gap-4 shadow-sm z-10">
        <button onclick={() => history.back()} class="p-2 text-gray-400 hover:text-pink-500 transition-colors">
            <ArrowLeft size={24} />
        </button>
        <h2 class="font-bold text-gray-800">Passport</h2>
    </header>

    <div class="flex-1 relative overflow-hidden flex flex-col">
        <!-- Mock Map Area -->
        <div class="absolute inset-0 bg-blue-100 flex items-center justify-center opacity-30">
            <div class="text-blue-300 flex flex-col items-center">
                <Navigation size={64} class="animate-bounce" />
                <p class="font-bold uppercase tracking-[0.3em] mt-4">Map View</p>
            </div>
        </div>

        <!-- Search Overlay -->
        <div class="p-6 relative z-10">
            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 space-y-4 max-w-md mx-auto">
                <p class="text-sm font-bold text-gray-400 uppercase tracking-widest text-center">Travel to any location</p>
                <div class="relative">
                    <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input
                        type="text"
                        bind:value={search}
                        placeholder="Search city or country..."
                        class="w-full pl-12 pr-4 py-4 border-2 border-gray-50 rounded-2xl focus:border-pink-500 focus:ring-0 outline-none transition-all bg-gray-50/50"
                    />
                </div>
            </div>
        </div>

        <!-- Location Details (Bottom Card) -->
        {#if search.length > 3}
            <div class="mt-auto p-6 relative z-10 animate-in slide-in-from-bottom duration-500">
                <div class="bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-6 max-w-md mx-auto border border-pink-50">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-pink-100 text-pink-500 rounded-2xl flex items-center justify-center">
                            <MapPin size={32} />
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-gray-800">{search}</h3>
                            <p class="text-sm text-gray-400">Selected Passport Destination</p>
                        </div>
                    </div>

                    <Button onclick={handleSelect} disabled={loading} class="w-full h-14 text-lg">
                        {loading ? 'TRAVELLING...' : 'GO TO THIS LOCATION'}
                    </Button>
                </div>
            </div>
        {/if}
    </div>
</div>
