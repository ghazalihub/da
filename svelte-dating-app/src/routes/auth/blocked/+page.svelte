<script lang="ts">
    import { Lock, LogOut } from '@lucide/svelte';
    import { auth } from '$lib/firebase';
    import { goto } from '$app/navigation';
    import { appInfoStore } from '$lib/stores/user';

    let isSuspended = $state(false);
    let reason = $state('Community Guidelines Violation');
    let appEmail = $derived($appInfoStore?.appEmail || 'support@example.com');

    async function handleLogout() {
        await auth.signOut();
        goto('/auth/signin');
    }
</script>

<div class="h-screen flex flex-col items-center justify-center p-6 text-center space-y-6">
    <div class="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-xl">
        <Lock size={48} />
    </div>

    <div class="space-y-2">
        <h1 class="text-2xl font-bold italic uppercase text-gray-800">Oops!</h1>
        <h2 class="text-xl font-semibold">{isSuspended ? 'Account Suspended' : 'Your account was blocked'}</h2>
    </div>

    {#if reason}
        <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 max-w-xs">
            <p class="text-sm text-gray-500 font-medium uppercase mb-1">Reason</p>
            <p class="text-gray-700">{reason}</p>
        </div>
    {/if}

    <div class="space-y-1">
        <p class="text-gray-500">Please contact support to activate it:</p>
        <p class="text-pink-600 font-bold text-lg">{appEmail}</p>
    </div>

    <button onclick={handleLogout} class="flex items-center gap-2 text-gray-400 font-bold hover:text-pink-500 transition-colors pt-10">
        <LogOut size={20} /> SIGN OUT
    </button>
</div>
