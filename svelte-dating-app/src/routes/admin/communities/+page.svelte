<script lang="ts">
    import { Users, Plus, Edit2, Trash2, Search } from '@lucide/svelte';
    import { onMount, onDestroy } from 'svelte';
    import { CommunityApi } from '$lib/services/social';

    let communities = $state<any[]>([]);
    let search = $state('');
    let unsubscribe: () => void;

    onMount(() => {
        unsubscribe = CommunityApi.getCommunities((data) => {
            communities = data;
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

    let filtered = $derived(
        communities.filter(c =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.category.toLowerCase().includes(search.toLowerCase())
        )
    );
</script>

<div class="space-y-6">
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold flex items-center gap-2">
            <Users class="text-pink-500" /> Communities Management
        </h1>
        <button class="bg-pink-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-pink-600 transition-colors shadow-sm">
            <Plus size={20} /> CREATE COMMUNITY
        </button>
    </div>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div class="p-6 border-b border-gray-100 flex items-center gap-4">
            <div class="relative flex-1 max-w-md">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    bind:value={search}
                    placeholder="Search communities..."
                    class="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none bg-gray-50"
                />
            </div>
        </div>

        <table class="w-full text-left">
            <thead class="bg-gray-50/50">
                <tr>
                    <th class="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Community</th>
                    <th class="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Category</th>
                    <th class="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Members</th>
                    <th class="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                {#each filtered as comm}
                    <tr class="hover:bg-gray-50/30 transition-colors">
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-pink-100 text-pink-500 rounded-lg flex items-center justify-center font-bold">
                                    {comm.name[0]}
                                </div>
                                <div>
                                    <p class="font-bold text-gray-800">{comm.name}</p>
                                    <p class="text-xs text-gray-400 line-clamp-1">{comm.description}</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold uppercase tracking-tight">{comm.category}</span>
                        </td>
                        <td class="px-6 py-4 font-medium text-gray-600">{comm.members_count || 0}</td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex justify-end gap-1">
                                <button class="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors">
                                    <Edit2 size={18} />
                                </button>
                                <button class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>

        {#if filtered.length === 0}
            <div class="text-center py-20 text-gray-400">
                No communities found matching your search
            </div>
        {/if}
    </div>
</div>
