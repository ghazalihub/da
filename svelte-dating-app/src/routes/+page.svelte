<script lang="ts">
    import { goto } from '$app/navigation';
    import { userStore } from '$lib/stores/user';
    import { onMount } from 'svelte';

    onMount(() => {
        // Simple splash logic
        setTimeout(() => {
            if ($userStore) {
                goto('/home');
            } else {
                goto('/auth/signin');
            }
        }, 2000);
    });
</script>

<div class="h-screen flex flex-col items-center justify-center bg-white">
    <img src="/logo.png" alt="Logo" class="w-32 h-32 mb-4" />
    <h1 class="text-3xl font-bold text-pink-500">Dating App</h1>
</div>
