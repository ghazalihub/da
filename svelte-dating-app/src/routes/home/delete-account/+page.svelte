<script lang="ts">
    import { Trash2, AlertTriangle, ArrowLeft } from '@lucide/svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import { userStore } from '$lib/stores/user';
    import { auth } from '$lib/firebase';
    import { goto } from '$app/navigation';

    let loading = $state(false);

    async function handleDelete() {
        if (!confirm('Are you absolutely sure? This cannot be undone.')) return;
        loading = true;
        // Logic to delete account data and auth
        setTimeout(async () => {
            await auth.signOut();
            loading = false;
            goto('/auth/signin');
        }, 2000);
    }
</script>

<div class="p-6 max-w-md mx-auto space-y-8 min-h-full bg-white">
    <button onclick={() => history.back()} class="p-2 -ml-2 text-gray-400 hover:text-pink-500">
        <ArrowLeft size={24} />
    </button>

    <div class="flex flex-col items-center text-center space-y-6 pt-10">
        <div class="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center shadow-inner">
            <Trash2 size={48} />
        </div>

        <div class="space-y-2">
            <h1 class="text-2xl font-bold text-gray-800">Delete Account</h1>
            <p class="text-gray-500">We're sorry to see you go. Please note that this action is permanent.</p>
        </div>

        <div class="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex gap-4 text-left">
            <AlertTriangle size={24} class="text-amber-500 shrink-0" />
            <p class="text-sm text-amber-800 leading-relaxed">
                All your profile information, matches, and messages will be permanently removed from our servers.
            </p>
        </div>

        <div class="w-full pt-10">
            <Button onclick={handleDelete} disabled={loading} class="w-full bg-red-500 active:bg-red-600 h-14 text-lg">
                {loading ? 'DELETING...' : 'DELETE PERMANENTLY'}
            </Button>
            <button onclick={() => history.back()} class="w-full py-4 text-gray-400 font-bold hover:text-gray-600 uppercase text-sm tracking-widest mt-2">
                I changed my mind
            </button>
        </div>
    </div>
</div>
