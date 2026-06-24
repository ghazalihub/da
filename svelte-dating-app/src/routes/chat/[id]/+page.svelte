<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { page } from '$app/state';
    import { userStore } from '$lib/stores/user';
    import { MessagesApi } from '$lib/services/messages';
    import { Send, Camera, MoreVertical, Trash2, Ban } from '@lucide/svelte';
    import { APP_PRIMARY_COLOR, USER_ID, MESSAGE_TEXT, MESSAGE_TYPE, TIMESTAMP } from '$lib/constants';

    const withUserId = page.params.id;
    let messages = $state<any[]>([]);
    let newMessage = $state('');
    let unsubscribe: () => void;

    onMount(() => {
        if ($userStore) {
            unsubscribe = MessagesApi.getMessages($userStore.userId, withUserId, (msgs) => {
                messages = msgs;
            });
        }
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

    async function handleSend() {
        if (!newMessage.trim() || !$userStore) return;

        const text = newMessage;
        newMessage = '';

        await MessagesApi.saveMessage({
            type: 'text',
            senderId: $userStore.userId,
            receiverId: withUserId,
            fromUserId: $userStore.userId,
            textMsg: text,
            imgLink: ''
        });
    }
</script>

<div class="flex flex-col h-full bg-gray-50">
    <header class="p-4 border-b bg-white flex justify-between items-center shadow-sm">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-200"></div>
            <h2 class="font-bold">Chat</h2>
        </div>
        <div class="flex gap-2">
            <button class="p-2 text-gray-400 hover:text-pink-500"><Ban size={20} /></button>
            <button class="p-2 text-gray-400 hover:text-pink-500"><Trash2 size={20} /></button>
        </div>
    </header>

    <div class="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
        {#each messages as msg}
            <div class="max-w-[80%] p-3 rounded-2xl shadow-sm {msg[USER_ID] === $userStore?.userId ? 'self-end bg-pink-500 text-white rounded-br-none' : 'self-start bg-white text-gray-800 rounded-bl-none'}">
                <p>{msg[MESSAGE_TEXT]}</p>
                <p class="text-[10px] mt-1 opacity-70">
                    {msg[TIMESTAMP]?.toDate() ? new Date(msg[TIMESTAMP].toDate()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                </p>
            </div>
        {/each}
    </div>

    <footer class="p-4 bg-white border-t safe-area-bottom">
        <form class="flex gap-2" onsubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <button type="button" class="p-2 text-gray-400 hover:text-pink-500">
                <Camera size={24} />
            </button>
            <input
                type="text"
                bind:value={newMessage}
                placeholder="Type a message..."
                class="flex-1 border rounded-full px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <button
                type="submit"
                disabled={!newMessage.trim()}
                class="p-2 bg-pink-500 text-white rounded-full disabled:opacity-50"
            >
                <Send size={20} />
            </button>
        </form>
    </footer>
</div>
