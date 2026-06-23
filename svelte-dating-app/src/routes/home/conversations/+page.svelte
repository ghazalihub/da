<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { userStore } from '$lib/stores/user';
    import { ConversationsApi } from '$lib/services/social';
    import { MessageSquare } from '@lucide/svelte';
    import { LAST_MESSAGE, TIMESTAMP, USER_FULLNAME, USER_PROFILE_PHOTO, MESSAGE_READ } from '$lib/constants';

    let conversations = $state<any[]>([]);
    let unsubscribe: () => void;

    onMount(() => {
        if ($userStore) {
            unsubscribe = ConversationsApi.getConversations($userStore.userId, (convs) => {
                conversations = convs;
            });
        }
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

<div class="p-4 space-y-4">
    <h1 class="text-2xl font-bold mb-6">Chats</h1>

    {#if conversations.length === 0}
        <div class="text-center py-20 text-gray-500">
            <MessageSquare size={48} class="mx-auto mb-4 opacity-20" />
            <p>No conversations yet</p>
        </div>
    {:else}
        {#each conversations as conv}
            <a href="/chat/{conv.id}" class="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border {conv[MESSAGE_READ] === false ? 'border-pink-200 bg-pink-50/20' : 'border-gray-100'}">
                <img src={conv[USER_PROFILE_PHOTO] || '/logo.png'} alt="" class="w-14 h-14 rounded-full object-cover" />
                <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-baseline">
                        <p class="font-bold text-gray-900 truncate">{conv[USER_FULLNAME]}</p>
                        <p class="text-[10px] text-gray-400">
                            {conv[TIMESTAMP]?.toDate() ? new Date(conv[TIMESTAMP].toDate()).toLocaleDateString() : ''}
                        </p>
                    </div>
                    <p class="text-sm text-gray-500 truncate {conv[MESSAGE_READ] === false ? 'font-bold text-pink-600' : ''}">
                        {conv[LAST_MESSAGE]}
                    </p>
                </div>
            </a>
        {/each}
    {/if}
</div>
