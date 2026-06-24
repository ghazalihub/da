<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { userStore } from '$lib/stores/user';
    import { BlockedUsersApi } from '$lib/services/blocked';
    import { Ban, Trash2 } from '@lucide/svelte';

    let users = $state<any[]>([]);
    let unsubscribe: () => void;

    onMount(() => {
        if ($userStore) {
            unsubscribe = BlockedUsersApi.getBlockedUsers($userStore.userId, (data) => {
                users = data;
            });
        }
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

    async function handleUnblock(id: string) {
        if (!$userStore) return;
        if (confirm('Unblock this user?')) {
            await BlockedUsersApi.unblockUser($userStore.userId, id);
        }
    }
</script>

<div class="p-6 space-y-6 min-h-full bg-white">
    <h1 class="text-2xl font-bold flex items-center gap-2">
        <Ban class="text-pink-500" /> Blocked Users
    </h1>

    <div class="divide-y">
        {#each users as user}
            <div class="py-4 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                        <Ban size={20} />
                    </div>
                    <div>
                        <p class="font-bold text-gray-800">User ID: {user.blocked_user_id.substring(0, 8)}...</p>
                        <p class="text-xs text-gray-400">Blocked on {user.timestamp?.toDate() ? new Date(user.timestamp.toDate()).toLocaleDateString() : ''}</p>
                    </div>
                </div>
                <button onclick={() => handleUnblock(user.blocked_user_id)} class="text-pink-500 font-bold text-sm hover:underline">
                    UNBLOCK
                </button>
            </div>
        {/each}

        {#if users.length === 0}
            <div class="text-center py-20 text-gray-500">
                <p>Your block list is empty</p>
            </div>
        {/if}
    </div>
</div>
