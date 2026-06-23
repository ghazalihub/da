<script lang="ts">
    import { onMount } from 'svelte';
    import { db } from '$lib/firebase';
    import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
    import { userStore } from '$lib/stores/user';
    import { C_NOTIFICATIONS, N_READ, TIMESTAMP } from '$lib/constants';
    import { Bell } from '@lucide/svelte';

    let notifications = $state<any[]>([]);

    onMount(() => {
        if ($userStore) {
            const q = query(
                collection(db, C_NOTIFICATIONS),
                where('n_receiver_id', '==', $userStore.userId),
                orderBy(TIMESTAMP, 'desc')
            );

            return onSnapshot(q, (snapshot) => {
                notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            });
        }
    });
</script>

<div class="p-6 space-y-4">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <Bell class="text-pink-500" /> Notifications
    </h1>

    {#if notifications.length === 0}
        <div class="text-center py-20 text-gray-500">
            <p>No notifications yet</p>
        </div>
    {:else}
        {#each notifications as n}
            <div class="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border {n.n_read ? 'opacity-60' : 'border-pink-100 bg-pink-50/30'}">
                <img src={n.n_sender_photo_link || '/logo.png'} alt="" class="w-12 h-12 rounded-full object-cover" />
                <div class="flex-1">
                    <p class="font-semibold text-gray-900">{n.n_sender_fullname || 'System'}</p>
                    <p class="text-sm text-gray-600">{n.n_message}</p>
                </div>
                {#if !n.n_read}
                    <div class="w-2 h-2 bg-pink-500 rounded-full"></div>
                {/if}
            </div>
        {/each}
    {/if}
</div>
