<script lang="ts">
    import { Send, Bell, Smartphone, Users } from '@lucide/svelte';
    import Button from '$lib/components/ui/Button.svelte';

    let title = $state('');
    let body = $state('');
    let target = $state('all'); // 'all', 'verified', 'vip'
    let loading = $state(false);

    async function handleSend() {
        if (!title || !body) return;
        loading = true;
        // Logic to trigger Cloud Function for push notifications
        setTimeout(() => {
            loading = false;
            alert('Notification sent to ' + target + ' users!');
            title = '';
            body = '';
        }, 1500);
    }
</script>

<div class="max-w-2xl space-y-8">
    <div class="flex flex-col">
        <h1 class="text-2xl font-bold">Push Notifications</h1>
        <p class="text-gray-400 text-sm">Send system-wide alerts to your users</p>
    </div>

    <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <div class="flex gap-4">
            <div class="p-3 bg-pink-50 text-pink-500 rounded-2xl">
                <Bell size={32} />
            </div>
            <div class="flex-1">
                <h3 class="font-bold text-gray-800">New Announcement</h3>
                <p class="text-xs text-gray-400">Users will receive this as a push notification and in-app alert.</p>
            </div>
        </div>

        <div class="space-y-4 pt-4">
            <div>
                <label for="target" class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Target Audience</label>
                <select id="target" bind:value={target} class="w-full border rounded-xl p-3 bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-pink-500 transition-all">
                    <option value="all">All Registered Users</option>
                    <option value="verified">Verified Users Only</option>
                    <option value="vip">VIP Members Only</option>
                </select>
            </div>

            <div>
                <label for="title" class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Notification Title</label>
                <input id="title" type="text" bind:value={title} placeholder="e.g. Special Offer!" class="w-full border rounded-xl p-3 bg-gray-50 outline-none focus:ring-2 focus:ring-pink-500 transition-all" />
            </div>

            <div>
                <label for="body" class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Message Body</label>
                <textarea id="body" bind:value={body} rows="4" placeholder="Type your message here..." class="w-full border rounded-xl p-3 bg-gray-50 outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none"></textarea>
            </div>
        </div>

        <div class="pt-4">
            <Button onclick={handleSend} disabled={loading || !title || !body} class="w-full h-14 flex items-center justify-center gap-2">
                <Send size={20} />
                {loading ? 'SENDING...' : 'BROADCAST NOTIFICATION'}
            </Button>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
            <div class="p-3 bg-white text-blue-500 rounded-xl shadow-sm">
                <Smartphone size={24} />
            </div>
            <div>
                <p class="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Reach</p>
                <p class="text-xl font-black text-blue-900">8.4k Devices</p>
            </div>
        </div>
        <div class="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-center gap-4">
            <div class="p-3 bg-white text-green-500 rounded-xl shadow-sm">
                <Users size={24} />
            </div>
            <div>
                <p class="text-[10px] font-bold text-green-400 uppercase tracking-wider">Active</p>
                <p class="text-xl font-black text-green-900">1.2k Online</p>
            </div>
        </div>
    </div>
</div>
