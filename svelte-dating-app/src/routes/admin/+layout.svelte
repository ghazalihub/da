<script lang="ts">
    import { Users, ShieldCheck, Flag, Lock, LayoutDashboard, Settings, LogOut, CheckCircle, Bell } from '@lucide/svelte';
    import { page } from '$app/state';

    interface MenuItem {
        name: string;
        path: string;
        icon: any;
    }

    const menuItems: MenuItem[] = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Verification', path: '/admin/verification', icon: CheckCircle },
        { name: 'Communities', path: '/admin/communities', icon: LayoutDashboard },
        { name: 'Moderation', path: '/admin/moderation', icon: ShieldCheck },
        { name: 'App Settings', path: '/admin/settings', icon: Settings },
    ];

    let activePath = $derived(page.url.pathname);
    let { children } = $props();
</script>

<div class="flex h-screen bg-gray-100 font-sans antialiased text-gray-900">
    <!-- Sidebar -->
    <aside class="w-72 bg-white border-r hidden lg:flex flex-col shadow-sm">
        <div class="p-8 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-200">
                    <Settings size={24} />
                </div>
                <h1 class="text-xl font-black tracking-tight text-gray-800 italic uppercase">Admin<span class="text-pink-500">Panel</span></h1>
            </div>
        </div>

        <nav class="flex-1 p-6 space-y-1 overflow-y-auto">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 ml-3">Navigation</p>
            {#each menuItems as item}
                {@const Icon = item.icon}
                <a
                    href={item.path}
                    class="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group {activePath === item.path ? 'bg-pink-500 text-white shadow-lg shadow-pink-100 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}"
                >
                    <Icon size={20} class={activePath === item.path ? '' : 'group-hover:scale-110 transition-transform'} />
                    <span class="text-sm">{item.name}</span>
                    {#if activePath === item.path}
                         <div class="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                    {/if}
                </a>
            {/each}
        </nav>

        <div class="p-6 border-t border-gray-50">
            <button class="flex items-center gap-3 text-gray-500 w-full p-3 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-medium">
                <LogOut size={20} />
                <span class="text-sm">Logout Session</span>
            </button>
        </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
        <header class="h-20 bg-white border-b border-gray-50 flex items-center justify-between px-10 shrink-0 z-10">
            <div class="flex flex-col">
                <h2 class="text-xl font-bold text-gray-800">
                    {menuItems.find(i => i.path === activePath)?.name || 'Dashboard'}
                </h2>
                <p class="text-xs text-gray-400 font-medium">Overview and system management</p>
            </div>

            <div class="flex items-center gap-6">
                <button class="p-2.5 text-gray-400 hover:text-pink-500 bg-gray-50 rounded-xl transition-colors relative">
                    <Bell size={20} />
                    <div class="absolute top-2.5 right-2.5 w-2 h-2 bg-pink-500 rounded-full border-2 border-white"></div>
                </button>
                <div class="h-10 w-px bg-gray-100"></div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <p class="text-sm font-bold text-gray-800">Admin User</p>
                        <p class="text-[10px] font-bold text-pink-500 uppercase tracking-wider">Super Admin</p>
                    </div>
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-400 shadow-md"></div>
                </div>
            </div>
        </header>

        <main class="flex-1 overflow-y-auto p-10 bg-[#F9FAFB]">
            <div class="max-w-7xl mx-auto">
                {@render children()}
            </div>
        </main>
    </div>
</div>
