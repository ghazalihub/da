<script lang="ts">
    import { userStore, updateUserData } from '$lib/stores/user';
    import { LogOut, Shield, Bell, MapPin, Trash2, ChevronRight, ArrowLeft } from '@lucide/svelte';
    import { auth } from '$lib/firebase';
    import { goto } from '$app/navigation';

    let user = $derived($userStore);
    let minAge = $state(18);
    let maxAge = $state(100);
    let distance = $state(50);

    $effect(() => {
        if (user?.userSettings) {
            minAge = user.userSettings.user_min_age || 18;
            maxAge = user.userSettings.user_max_age || 100;
            distance = user.userSettings.user_max_distance || 50;
        }
    });

    async function handleLogout() {
        await auth.signOut();
        goto('/auth/signin');
    }

    async function updateSettings() {
        if (!user) return;
        await updateUserData(user.userId, {
            user_settings: {
                ...user.userSettings,
                user_min_age: minAge,
                user_max_age: maxAge,
                user_max_distance: distance
            }
        });
    }
</script>

<div class="p-6 pb-24 space-y-8 max-w-2xl mx-auto bg-gray-50 min-h-full">
    <div class="flex items-center gap-4">
        <button onclick={() => history.back()} class="p-2 -ml-2 text-gray-400 hover:text-pink-500">
            <ArrowLeft size={24} />
        </button>
        <h1 class="text-2xl font-bold">Settings</h1>
    </div>

    <section class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div class="p-6 border-b border-gray-50">
            <h3 class="font-bold flex items-center gap-2"><MapPin class="text-pink-500" /> Discovery Settings</h3>
        </div>
        <div class="p-6 space-y-6">
            <div>
                <div class="flex justify-between mb-4">
                    <label for="distance" class="text-sm font-bold text-gray-400 uppercase tracking-widest">Maximum Distance</label>
                    <span class="text-pink-600 font-black">{distance} km</span>
                </div>
                <input id="distance" type="range" bind:value={distance} onchange={updateSettings} min="1" max="200" class="w-full accent-pink-500 cursor-pointer" />
            </div>

            <div class="pt-4">
                <div class="flex justify-between mb-4">
                    <label for="ageRange" class="text-sm font-bold text-gray-400 uppercase tracking-widest">Age Range</label>
                    <span class="text-pink-600 font-black">{minAge} - {maxAge}</span>
                </div>
                <div class="flex gap-4" id="ageRange">
                    <input type="number" bind:value={minAge} onchange={updateSettings} min="18" max="100" class="w-1/2 border rounded-xl p-3 bg-gray-50 font-bold focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
                    <input type="number" bind:value={maxAge} onchange={updateSettings} min="18" max="100" class="w-1/2 border rounded-xl p-3 bg-gray-50 font-bold focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
                </div>
            </div>
        </div>
    </section>

    <section class="bg-white rounded-2xl shadow-sm divide-y border border-gray-100 overflow-hidden">
        <button class="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
            <div class="flex items-center gap-4">
                <div class="p-2 bg-blue-50 text-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Shield size={20} />
                </div>
                <span class="font-bold text-gray-700">Privacy Policy</span>
            </div>
            <ChevronRight size={20} class="text-gray-300" />
        </button>
        <button class="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
            <div class="flex items-center gap-4">
                <div class="p-2 bg-pink-50 text-pink-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Bell size={20} />
                </div>
                <span class="font-bold text-gray-700">Notifications</span>
            </div>
            <ChevronRight size={20} class="text-gray-300" />
        </button>
    </section>

    <div class="space-y-4 pt-6">
        <button onclick={handleLogout} class="w-full bg-white text-red-500 font-black p-5 rounded-2xl shadow-sm flex items-center justify-center gap-3 hover:bg-red-50 transition-all border border-red-100 active:scale-95">
            <LogOut size={20} /> LOGOUT
        </button>
        <a href="/home/delete-account" class="w-full text-gray-400 text-xs font-bold py-2 flex items-center justify-center gap-2 hover:text-red-400 transition-colors uppercase tracking-widest">
            <Trash2 size={16} /> Delete Account
        </a>
    </div>
</div>
