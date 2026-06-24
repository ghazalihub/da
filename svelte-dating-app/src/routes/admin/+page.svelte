<script lang="ts">
    import { Users, ShieldCheck, Flag, Lock, ArrowRight, LayoutDashboard } from '@lucide/svelte';

    interface Stat {
        label: string;
        value: number;
        icon: any;
        color: string;
    }

    // Mock data for initial UI
    const stats: Stat[] = [
        { label: 'Active Users', value: 1254, icon: Users, color: 'bg-green-500' },
        { label: 'Verified', value: 842, icon: ShieldCheck, color: 'bg-blue-500' },
        { label: 'Flagged', value: 12, icon: Flag, color: 'bg-amber-500' },
        { label: 'Blocked', value: 5, icon: Lock, color: 'bg-red-500' },
    ];
</script>

<div class="space-y-8">
    <div class="bg-white p-8 rounded-2xl shadow-sm flex flex-col items-center text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-gray-500">
            <LayoutDashboard size={32} />
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Control Panel</h1>
        <p class="text-gray-500">Academic Community Operations Center</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each stats as stat}
            {@const Icon = stat.icon}
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div class="{stat.color} p-3 rounded-xl text-white">
                    <Icon size={24} />
                </div>
                <div>
                    <p class="text-sm text-gray-500 font-medium">{stat.label}</p>
                    <p class="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
            </div>
        {/each}
    </div>

    <div class="bg-white p-8 rounded-2xl shadow-sm">
        <h3 class="text-lg font-bold mb-6">Operations Shortcuts</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            {#each ['Verify Users', 'Moderation', 'Analytics', 'Communities'] as link}
                <button class="p-6 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors flex flex-col items-center gap-3">
                    <span class="font-medium text-gray-700">{link}</span>
                    <ArrowRight size={16} class="text-gray-400" />
                </button>
            {/each}
        </div>
    </div>
</div>
