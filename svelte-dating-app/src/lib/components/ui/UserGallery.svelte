<script lang="ts">
    import { Camera, Trash2, Plus } from '@lucide/svelte';

    let { images = [], onUpload, onDelete } = $props<{
        images: string[];
        onUpload: () => void;
        onDelete: (index: number) => void;
    }>();

    const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8];
</script>

<div class="grid grid-cols-3 gap-3">
    {#each slots as i}
        <div class="aspect-square rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden relative group">
            {#if images[i]}
                <img src={images[i]} alt="" class="w-full h-full object-cover" />
                <button
                    onclick={() => onDelete(i)}
                    class="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Trash2 size={14} />
                </button>
            {:else}
                <button
                    onclick={onUpload}
                    class="absolute inset-0 flex flex-col items-center justify-center text-gray-300 hover:text-pink-400 hover:bg-pink-50/30 transition-colors"
                >
                    <Plus size={24} />
                    <span class="text-[10px] font-bold mt-1">ADD</span>
                </button>
            {/if}
        </div>
    {/each}
</div>
