<script lang="ts">
    import { ShieldAlert, CheckCircle, XCircle } from '@lucide/svelte';

    let reports = $state([
        { id: '1', reported_user: 'Jane Doe', reason: 'Harassment', status: 'pending', timestamp: '2 hours ago' },
        { id: '2', reported_user: 'John Smith', reason: 'Fake Profile', status: 'reviewed', timestamp: '5 hours ago' },
    ]);
</script>

<div class="space-y-6">
    <h1 class="text-2xl font-bold">Moderation Center</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-amber-500">
            <p class="text-sm text-gray-500 font-medium uppercase">Pending Reports</p>
            <p class="text-3xl font-bold mt-1">12</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
            <p class="text-sm text-gray-500 font-medium uppercase">Flagged Users</p>
            <p class="text-3xl font-bold mt-1">45</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
            <p class="text-sm text-gray-500 font-medium uppercase">Resolved Today</p>
            <p class="text-3xl font-bold mt-1">8</p>
        </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div class="p-6 border-b">
            <h3 class="font-bold">Recent Reports</h3>
        </div>
        <div class="divide-y">
            {#each reports as report}
                <div class="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div class="flex items-center gap-4">
                        <div class="p-2 bg-amber-100 text-amber-600 rounded-full">
                            <ShieldAlert size={20} />
                        </div>
                        <div>
                            <p class="font-semibold text-gray-900">{report.reported_user}</p>
                            <p class="text-sm text-gray-500">{report.reason} • {report.timestamp}</p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Resolve">
                            <CheckCircle size={20} />
                        </button>
                        <button class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Ban User">
                            <XCircle size={20} />
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
