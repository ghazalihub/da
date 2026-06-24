<script lang="ts">
    import { onMount } from 'svelte';
    import { UsersApi } from '$lib/services/users';
    import { userStore } from '$lib/stores/user';
    import ProfileCard from '$lib/components/ui/ProfileCard.svelte';
    import { Sparkles, MapPin } from '@lucide/svelte';

    let users = $state<any[]>([]);
    let loading = $state(true);
    let currentIndex = $state(0);

    onMount(async () => {
        if ($userStore) {
            users = await UsersApi.getUsers($userStore, []);
            loading = false;
        }
    });

    function next() {
        currentIndex++;
    }
</script>

<div class="h-full flex flex-col p-6">
    <div class="flex justify-between items-center mb-6">
        <div>
            <h1 class="text-2xl font-black text-gray-800">Discover</h1>
            <p class="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                <MapPin size={12} class="text-pink-500" /> New York, USA
            </p>
        </div>
        <button class="p-3 bg-white rounded-2xl shadow-sm text-pink-500 hover:scale-105 transition-transform border border-gray-50">
            <Sparkles size={20} fill="currentColor" />
        </button>
    </div>

    <div class="flex-1 flex items-center justify-center relative">
        {#if loading}
            <div class="w-full aspect-[3/4] bg-white rounded-[2rem] shadow-xl animate-pulse flex items-center justify-center">
                <div class="w-20 h-20 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
        {:else if currentIndex < users.length}
            {@const currentUser = users[currentIndex]}
            <div class="w-full max-w-sm animate-in zoom-in-95 duration-500">
                <ProfileCard
                    user={currentUser}
                    onLike={next}
                    onDislike={next}
                    onInfo={() => {}}
                />
            </div>
        {:else}
            <div class="text-center space-y-4 max-w-xs">
                <div class="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-pink-500">
                    <Sparkles size={32} />
                </div>
                <h3 class="text-xl font-bold text-gray-900">No more people around you</h3>
                <p class="text-gray-500 text-sm leading-relaxed">Try increasing your distance range or changing your filters in settings.</p>
                <a href="/home/settings" class="inline-block text-pink-500 font-bold text-sm hover:underline uppercase tracking-widest">Go to Settings</a>
            </div>
        {/if}
    </div>
</div>
