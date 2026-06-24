<script lang="ts">
    import { userStore } from '$lib/stores/user';
    import { Settings, Edit2, Camera, ShieldCheck, MapPin, Briefcase, GraduationCap, Heart, Eye, XCircle, Grid3X3 } from '@lucide/svelte';
    import { goto } from '$app/navigation';
    import UserGallery from '$lib/components/ui/UserGallery.svelte';

    let user = $derived($userStore);
    let view = $state('info'); // 'info' or 'gallery'
</script>

<div class="bg-white min-h-full pb-32">
    {#if user}
        <div class="relative h-64 bg-gray-100 shrink-0">
            <img src={user.userProfilePhoto} alt={user.userFullname} class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
            <button class="absolute bottom-4 right-4 p-3 bg-pink-500 rounded-full text-white shadow-xl active:scale-95 transition-transform z-10 border-2 border-white">
                <Camera size={24} />
            </button>
        </div>

        <div class="px-6 -mt-10 relative z-10">
            <div class="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h1 class="text-2xl font-bold flex items-center gap-2 text-gray-800">
                            {user.userFullname}
                            {#if user.userIsVerified}
                                <ShieldCheck size={24} class="text-blue-500" />
                            {/if}
                        </h1>
                        <p class="text-gray-500 flex items-center gap-1 mt-1 font-medium">
                            <MapPin size={16} class="text-pink-500" /> {user.userLocality}, {user.userCountry}
                        </p>
                    </div>
                    <button onclick={() => goto('/home/profile/edit')} class="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-pink-500 transition-colors">
                        <Edit2 size={20} />
                    </button>
                </div>

                <div class="grid grid-cols-3 gap-2 border-t border-gray-50 pt-6">
                    <button onclick={() => goto('/home/profile/likes')} class="text-center group">
                        <p class="font-black text-xl text-gray-900 group-hover:text-pink-600 transition-colors">{user.userTotalLikes}</p>
                        <div class="flex items-center justify-center gap-1 text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">
                            <Heart size={10} /> Likes
                        </div>
                    </button>
                    <button onclick={() => goto('/home/profile/visits')} class="text-center border-x border-gray-50 group">
                        <p class="font-black text-xl text-gray-900 group-hover:text-pink-600 transition-colors">{user.userTotalVisits}</p>
                        <div class="flex items-center justify-center gap-1 text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">
                            <Eye size={10} /> Visits
                        </div>
                    </button>
                    <button onclick={() => goto('/home/profile/disliked')} class="text-center group">
                        <p class="font-black text-xl text-gray-900 group-hover:text-pink-600 transition-colors">{user.userTotalDisliked}</p>
                        <div class="flex items-center justify-center gap-1 text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">
                            <XCircle size={10} /> Disliked
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <div class="px-6 mt-8">
            <div class="flex p-1 bg-gray-100 rounded-2xl mb-8">
                <button
                    onclick={() => view = 'info'}
                    class="flex-1 py-3 rounded-xl font-bold text-sm transition-all {view === 'info' ? 'bg-white text-pink-500 shadow-sm' : 'text-gray-400'}"
                >
                    INFO
                </button>
                <button
                    onclick={() => view = 'gallery'}
                    class="flex-1 py-3 rounded-xl font-bold text-sm transition-all {view === 'gallery' ? 'bg-white text-pink-500 shadow-sm' : 'text-gray-400'}"
                >
                    GALLERY
                </button>
            </div>

            {#if view === 'info'}
                <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h3 class="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">About Me</h3>
                        <p class="text-gray-600 leading-relaxed bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm italic">
                            "{user.userBio || 'No bio provided'}"
                        </p>
                    </section>

                    <section class="space-y-4">
                        <h3 class="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">Identity</h3>
                        <div class="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group hover:border-pink-200 transition-colors">
                            <div class="p-3 bg-pink-50 text-pink-500 rounded-xl group-hover:scale-110 transition-transform">
                                <Briefcase size={20} />
                            </div>
                            <div>
                                <p class="text-[10px] text-gray-400 font-black uppercase tracking-widest">Occupation</p>
                                <p class="font-bold text-gray-700">{user.userJobTitle || 'Not specified'}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group hover:border-pink-200 transition-colors">
                            <div class="p-3 bg-pink-50 text-pink-500 rounded-xl group-hover:scale-110 transition-transform">
                                <GraduationCap size={20} />
                            </div>
                            <div>
                                <p class="text-[10px] text-gray-400 font-black uppercase tracking-widest">Education</p>
                                <p class="font-bold text-gray-700">{user.userSchool || 'Not specified'}</p>
                            </div>
                        </div>
                    </section>
                </div>
            {:else}
                <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 class="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 ml-1 flex items-center gap-2">
                        <Grid3X3 size={16} /> My Gallery
                    </h3>
                    <UserGallery
                        images={Object.values(user.userGallery || {})}
                        onUpload={() => {}}
                        onDelete={() => {}}
                    />
                </div>
            {/if}
        </div>
    {/if}
</div>
