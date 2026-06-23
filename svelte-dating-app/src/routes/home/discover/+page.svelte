<script lang="ts">
    import { onMount } from 'svelte';
    import { UsersApi } from '$lib/services/users';
    import { userStore } from '$lib/stores/user';
    import { Heart, X } from '@lucide/svelte';

    let users = $state<any[]>([]);
    let loading = $state(true);
    let currentIndex = $state(0);

    onMount(async () => {
        if ($userStore) {
            users = await UsersApi.getUsers($userStore, []);
            loading = false;
        }
    });

    function handleLike() {
        // Logic for liking
        next();
    }

    function handleDislike() {
        // Logic for disliking
        next();
    }

    function next() {
        currentIndex++;
    }
</script>

<div class="h-full bg-gray-50 flex flex-col items-center justify-center p-4">
    {#if loading}
        <div class="animate-pulse flex flex-col items-center">
            <div class="w-64 h-96 bg-gray-200 rounded-3xl mb-4"></div>
            <div class="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
    {:else if currentIndex < users.length}
        {@const currentUser = users[currentIndex]}
        <div class="relative w-full max-w-sm h-[70vh] rounded-3xl overflow-hidden shadow-xl bg-white group">
            <img
                src={currentUser.user_photo_link}
                alt={currentUser.user_fullname}
                class="w-full h-full object-cover"
            />

            <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h2 class="text-2xl font-bold">{currentUser.user_fullname}, {currentUser.age || ''}</h2>
                <p class="text-sm opacity-90">{currentUser.user_job_title} at {currentUser.user_school}</p>
            </div>
        </div>

        <div class="flex gap-6 mt-8">
            <button
                onclick={handleDislike}
                class="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-red-500 hover:scale-110 transition-transform"
            >
                <X size={32} />
            </button>
            <button
                onclick={handleLike}
                class="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-green-500 hover:scale-110 transition-transform"
            >
                <Heart size={32} fill="currentColor" />
            </button>
        </div>
    {:else}
        <div class="text-center">
            <h3 class="text-xl font-medium text-gray-900">No more people around you</h3>
            <p class="text-gray-500">Try changing your search filters</p>
        </div>
    {/if}
</div>
