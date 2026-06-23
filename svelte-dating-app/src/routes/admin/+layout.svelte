<script lang="ts">
    import { Users, ShieldCheck, Flag, Lock, LayoutDashboard, Settings, LogOut } from '@lucide/svelte';
    import { page } from '$app/state';

    interface MenuItem {
        name: string;
        path: string;
        icon: any;
    }

    const menuItems: MenuItem[] = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Moderation', path: '/admin/moderation', icon: ShieldCheck },
        { name: 'App Settings', path: '/admin/settings', icon: Settings },
    ];

    let activePath = $derived(page.url.pathname);
    let { children } = $props();
</script>

<div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r hidden md:flex flex-col">
        <div class="p-6 border-b">
            <h1 class="text-xl font-bold text-pink-500">Admin Panel</h1>
        </div>
        <nav class="flex-1 p-4 space-y-2">
            {#each menuItems as item}
                {@const Icon = item.icon}
                <a
                    href={item.path}
                    class="flex items-center gap-3 p-3 rounded-lg transition-colors {activePath === item.path ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:bg-gray-50'}"
                >
                    <Icon size={20} />
                    <span class="font-medium">{item.name}</span>
                </a>
            {/each}
        </nav>
        <div class="p-4 border-t">
            <button class="flex items-center gap-3 text-gray-600 w-full p-3 hover:bg-red-50 hover:text-red-600 rounded-lg">
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
        <header class="h-16 bg-white border-b flex items-center px-8">
            <h2 class="text-lg font-semibold text-gray-800">
                {menuItems.find(i => i.path === activePath)?.name || 'Dashboard'}
            </h2>
        </header>
        <main class="flex-1 overflow-y-auto p-8">
            {@render children()}
        </main>
    </div>
</div>
