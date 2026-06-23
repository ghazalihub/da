<script lang="ts">
    import { userStore } from '$lib/stores/user';
    import { Settings, Edit2, Camera, ShieldCheck, MapPin, Briefcase, GraduationCap } from '@lucide/svelte';
    import { goto } from '$app/navigation';

    let user = $derived($userStore);
</script>

<div class="bg-white min-h-full pb-10">
    {#if user}
        <div class="relative h-64 bg-gray-100">
            <img src={user.userProfilePhoto} alt={user.userFullname} class="w-full h-full object-cover" />
            <button class="absolute bottom-4 right-4 p-3 bg-pink-500 rounded-full text-white shadow-lg">
                <Camera size={24} />
            </button>
        </div>

        <div class="px-6 -mt-10 relative">
            <div class="bg-white rounded-3xl p-6 shadow-xl">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h1 class="text-2xl font-bold flex items-center gap-2">
                            {user.userFullname}
                            {#if user.userIsVerified}
                                <ShieldCheck size={24} class="text-blue-500" />
                            {/if}
                        </h1>
                        <p class="text-gray-500 flex items-center gap-1">
                            <MapPin size={16} /> {user.userLocality}, {user.userCountry}
                        </p>
                    </div>
                    <button onclick={() => goto('/home/profile/edit')} class="p-2 bg-gray-100 rounded-full text-gray-600">
                        <Edit2 size={20} />
                    </button>
                </div>

                <div class="grid grid-cols-3 gap-4 border-t pt-4">
                    <div class="text-center">
                        <p class="font-bold text-lg">{user.userTotalLikes}</p>
                        <p class="text-xs text-gray-500 uppercase">Likes</p>
                    </div>
                    <div class="text-center border-x">
                        <p class="font-bold text-lg">{user.userTotalVisits}</p>
                        <p class="text-xs text-gray-500 uppercase">Visits</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold text-lg">{user.userProfileQualityScore}%</p>
                        <p class="text-xs text-gray-500 uppercase">Quality</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-6 mt-6 space-y-6">
            <section>
                <h3 class="text-lg font-bold mb-2">About Me</h3>
                <p class="text-gray-600 leading-relaxed">{user.userBio || 'No bio provided'}</p>
            </section>

            <section class="space-y-3">
                <div class="flex items-center gap-3 text-gray-700">
                    <Briefcase size={20} class="text-pink-500" />
                    <span>{user.userJobTitle || 'Job Title'}</span>
                </div>
                <div class="flex items-center gap-3 text-gray-700">
                    <GraduationCap size={20} class="text-pink-500" />
                    <span>{user.userSchool || 'School'}</span>
                </div>
            </section>
        </div>
    {/if}
</div>
