<script lang="ts">
    import { Heart, MessageCircle, X } from '@lucide/svelte';
    import Button from '../ui/Button.svelte';

    let {
        matchedUser,
        onClose
    } = $props<{
        matchedUser: any;
        onClose: () => void;
    }>();
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
    <div class="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden relative text-center p-8 space-y-8 animate-in zoom-in-95 duration-300">
        <button onclick={onClose} class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={24} />
        </button>

        <h2 class="text-4xl font-black text-pink-500 italic uppercase">It's a Match!</h2>
        <p class="text-gray-500">You and {matchedUser?.user_fullname} have liked each other.</p>

        <div class="flex items-center justify-center -space-x-4">
            <div class="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100">
                <img src="/logo.png" alt="You" class="w-full h-full object-cover" />
            </div>
            <div class="z-10 bg-pink-500 text-white p-2 rounded-full shadow-lg">
                <Heart size={32} fill="currentColor" />
            </div>
            <div class="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100">
                <img src={matchedUser?.user_photo_link} alt={matchedUser?.user_fullname} class="w-full h-full object-cover" />
            </div>
        </div>

        <div class="space-y-3">
            <Button class="w-full flex items-center justify-center gap-2">
                <MessageCircle size={20} /> SEND A MESSAGE
            </Button>
            <button onclick={onClose} class="w-full py-3 text-gray-400 font-bold hover:text-gray-600">
                KEEP SWIPING
            </button>
        </div>
    </div>
</div>
