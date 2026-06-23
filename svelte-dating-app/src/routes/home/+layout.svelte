<script lang="ts">
    import { page } from '$app/state';
    import { Search, Heart, Landmark, MessageCircle, User as UserIcon, Bell } from '@lucide/svelte';
    import { APP_NAME } from '$lib/constants';

    interface Tab {
        name: string;
        path: string;
        icon: any;
    }

    const tabs: Tab[] = [
        { name: 'Discover', path: '/home/discover', icon: Search },
        { name: 'Matches', path: '/home/matches', icon: Heart },
        { name: 'Community', path: '/home/communities', icon: Landmark },
        { name: 'Chats', path: '/home/conversations', icon: MessageCircle },
        { name: 'Profile', path: '/home/profile', icon: UserIcon },
    ];

    let activePath = $derived(page.url.pathname);
    let { children } = $props();
</script>

<div class="flex flex-col h-screen overflow-hidden bg-white">
    <!-- App Bar -->
    <header class="p-4 border-b flex justify-between items-center bg-white">
        <div class="flex items-center gap-2">
            <img src="/logo.png" alt="logo" class="w-8 h-8" />
            <span class="font-bold text-lg">{APP_NAME}</span>
        </div>
        <a href="/home/notifications" class="p-2 text-gray-500 hover:text-pink-500 relative">
            <Bell size={24} />
            <!-- Notification badge logic here -->
        </a>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50">
        {@render children()}
    </main>

    <!-- Bottom Navigation -->
    <nav class="flex border-t bg-white safe-area-bottom">
        {#each tabs as tab}
            {@const Icon = tab.icon}
            <a
                href={tab.path}
                class="flex-1 flex flex-col items-center py-2 transition-colors {activePath.startsWith(tab.path) ? 'text-pink-500' : 'text-gray-400'}"
            >
                <Icon size={24} />
                <span class="text-xs mt-1">{tab.name}</span>
            </a>
        {/each}
    </nav>
</div>
