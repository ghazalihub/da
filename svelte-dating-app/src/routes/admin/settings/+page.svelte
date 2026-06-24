<script lang="ts">
    import { Save, Globe, Smartphone, ShieldCheck, Mail } from '@lucide/svelte';

    let appName = $state('Dating App');
    let supportEmail = $state('support@example.com');
    let freeDistance = $state(50);
    let vipDistance = $state(200);
</script>

<div class="max-w-4xl space-y-8">
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">App Settings</h1>
        <button class="bg-pink-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-pink-600 transition-colors shadow-sm">
            <Save size={20} /> SAVE ALL CHANGES
        </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 class="font-bold flex items-center gap-2 text-gray-800"><Globe size={20} class="text-pink-500" /> General Info</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">App Name</label>
                    <input type="text" bind:value={appName} class="w-full border rounded-xl p-3 bg-gray-50" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">Support Email</label>
                    <input type="email" bind:value={supportEmail} class="w-full border rounded-xl p-3 bg-gray-50" />
                </div>
            </div>
        </section>

        <section class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 class="font-bold flex items-center gap-2 text-gray-800"><Smartphone size={20} class="text-pink-500" /> Discovery Radius</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">Free Account Max Distance (km)</label>
                    <input type="number" bind:value={freeDistance} class="w-full border rounded-xl p-3 bg-gray-50" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">VIP Account Max Distance (km)</label>
                    <input type="number" bind:value={vipDistance} class="w-full border rounded-xl p-3 bg-gray-50" />
                </div>
            </div>
        </section>

        <section class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6 md:col-span-2">
            <h3 class="font-bold flex items-center gap-2 text-gray-800"><ShieldCheck size={20} class="text-pink-500" /> Legal URLs</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">Privacy Policy URL</label>
                    <input type="url" placeholder="https://..." class="w-full border rounded-xl p-3 bg-gray-50" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">Terms of Service URL</label>
                    <input type="url" placeholder="https://..." class="w-full border rounded-xl p-3 bg-gray-50" />
                </div>
            </div>
        </section>
    </div>
</div>
