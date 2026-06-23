<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { CommunityApi } from '$lib/services/social';
    import { Landmark, Users } from '@lucide/svelte';

    let communities = $state<any[]>([]);
    let unsubscribe: () => void;

    onMount(() => {
        unsubscribe = CommunityApi.getCommunities((cs) => {
            communities = cs;
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

<div class="p-4 space-y-4">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <Landmark class="text-pink-500" /> Communities
    </h1>

    <div class="grid grid-cols-1 gap-4">
        {#each communities as comm}
            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div class="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500">
                    <Users size={32} />
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-lg text-gray-900">{comm.name}</h3>
                    <p class="text-sm text-gray-500 line-clamp-1">{comm.description}</p>
                    <div class="flex items-center gap-2 mt-2 text-xs font-medium text-pink-600 bg-pink-50 w-fit px-2 py-1 rounded">
                        <span>{comm.members_count || 0} members</span>
                    </div>
                </div>
                <button class="bg-pink-500 text-white px-4 py-2 rounded-lg font-bold text-sm">Join</button>
            </div>
        {/each}

        {#if communities.length === 0}
            <div class="text-center py-20 text-gray-500 bg-white rounded-2xl border border-dashed">
                <p>No communities found. Be the first to start one!</p>
            </div>
        {/if}
    </div>
</div>
