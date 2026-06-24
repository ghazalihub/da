<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { userStore } from '$lib/stores/user';
    import { MatchesApi } from '$lib/services/social';
    import { Heart } from '@lucide/svelte';

    let matches = $state<any[]>([]);
    let unsubscribe: () => void;

    onMount(() => {
        if ($userStore) {
            unsubscribe = MatchesApi.getMatches($userStore.userId, (ms) => {
                matches = ms;
            });
        }
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

<div class="p-4 space-y-4">
    <h1 class="text-2xl font-bold mb-6">Matches</h1>

    {#if matches.length === 0}
        <div class="text-center py-20 text-gray-500">
            <Heart size={48} class="mx-auto mb-4 opacity-20" />
            <p>No matches yet. Keep swiping!</p>
        </div>
    {:else}
        <div class="grid grid-cols-2 gap-4">
            {#each matches as match}
                <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    <div class="aspect-square bg-gray-200">
                        <!-- Match photo logic here -->
                    </div>
                    <div class="p-3">
                        <p class="font-bold text-gray-900 truncate">Match</p>
                        <p class="text-xs text-gray-500">
                            {match.timestamp?.toDate() ? new Date(match.timestamp.toDate()).toLocaleDateString() : ''}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
