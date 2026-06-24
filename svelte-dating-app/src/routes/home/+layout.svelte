<script lang="ts">
    import { page } from '$app/state';
    import { Search, Heart, Landmark, MessageCircle, User as UserIcon, Settings, Bell, Plane } from '@lucide/svelte';
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

<div class="flex flex-col h-screen overflow-hidden bg-white font-sans antialiased text-gray-900">
    <!-- App Bar -->
    <header class="h-16 border-b border-gray-50 flex justify-between items-center bg-white z-10 px-6 shrink-0">
        <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-pink-100">
                <Heart size={18} fill="currentColor" />
            </div>
            <span class="font-black text-lg tracking-tighter text-gray-800 italic uppercase">{APP_NAME.split(' ')[0]}<span class="text-pink-500">{APP_NAME.split(' ')[1] || ''}</span></span>
        </div>
        <div class="flex items-center gap-2">
            <a href="/home/passport" class="p-2 text-gray-400 hover:text-pink-500 transition-colors bg-gray-50 rounded-xl" title="Passport">
                <Plane size={20} />
            </a>
            <a href="/home/notifications" class="p-2 text-gray-400 hover:text-pink-500 transition-colors bg-gray-50 rounded-xl relative">
                <Bell size={20} />
                <div class="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-white"></div>
            </a>
            <a href="/home/settings" class="p-2 text-gray-400 hover:text-pink-500 transition-colors bg-gray-50 rounded-xl">
                <Settings size={20} />
            </a>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50 relative pb-10">
        {@render children()}
    </main>

    <!-- Bottom Navigation -->
    <nav class="flex border-t border-gray-100 bg-white/80 backdrop-blur-xl safe-area-bottom z-10 px-4">
        {#each tabs as tab}
            {@const Icon = tab.icon}
            <a
                href={tab.path}
                class="flex-1 flex flex-col items-center py-3 transition-all duration-300 relative group"
            >
                <div class="relative">
                    <Icon size={24} class={activePath.startsWith(tab.path) ? 'text-pink-500 scale-110' : 'text-gray-400 group-hover:text-gray-600'} />
                    {#if activePath.startsWith(tab.path)}
                        <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full animate-in zoom-in"></div>
                    {/if}
                </div>
                <span class="text-[10px] mt-1 font-bold uppercase tracking-widest {activePath.startsWith(tab.path) ? 'text-pink-500' : 'text-gray-400 group-hover:text-gray-600'}">
                    {tab.name}
                </span>
            </a>
        {/each}
    </nav>
</div>
