<script lang="ts">
    import { Heart, X, Info } from '@lucide/svelte';

    let { user, onLike, onDislike, onInfo } = $props<{
        user: any;
        onLike: () => void;
        onDislike: () => void;
        onInfo: () => void;
    }>();
</script>

<div class="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl bg-white group">
    <img
        src={user.user_photo_link}
        alt={user.user_fullname}
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

    <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div class="flex items-end justify-between">
            <div>
                <h2 class="text-2xl font-bold">{user.user_fullname}, {user.age || ''}</h2>
                <p class="text-sm opacity-90 flex items-center gap-1">
                    <span class="w-2 h-2 bg-green-500 rounded-full"></span> {user.user_job_title}
                </p>
            </div>
            <button onclick={onInfo} class="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
                <Info size={20} />
            </button>
        </div>

        <div class="flex gap-4 mt-6">
            <button
                onclick={onDislike}
                class="flex-1 bg-white/20 backdrop-blur-md py-3 rounded-2xl flex items-center justify-center hover:bg-red-500 transition-all group/btn"
            >
                <X size={24} class="group-hover/btn:scale-110 transition-transform" />
            </button>
            <button
                onclick={onLike}
                class="flex-1 bg-pink-500 py-3 rounded-2xl flex items-center justify-center hover:bg-pink-600 shadow-lg shadow-pink-500/30 transition-all group/btn"
            >
                <Heart size={24} fill="currentColor" class="group-hover/btn:scale-110 transition-transform" />
            </button>
        </div>
    </div>
</div>
