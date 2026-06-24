<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { userStore } from '$lib/stores/user';
    import { ProfileStatsApi } from '$lib/services/stats';
    import { XCircle } from '@lucide/svelte';

    let items = $state<any[]>([]);
    let unsubscribe: () => void;

    onMount(() => {
        if ($userStore) {
            unsubscribe = ProfileStatsApi.getDislikes($userStore.userId, (data) => {
                items = data;
            });
        }
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

<div class="p-4 space-y-4">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <XCircle class="text-pink-500" /> Disliked Profiles
    </h1>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        {#each items as item}
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 aspect-[3/4] relative">
                <div class="absolute inset-0 bg-gray-200 animate-pulse"></div>
            </div>
        {/each}

        {#if items.length === 0}
            <div class="col-span-full text-center py-20 text-gray-500">
                <p>No disliked profiles yet</p>
            </div>
        {/if}
    </div>
</div>
