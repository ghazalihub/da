<script lang="ts">
    let {
        onclick,
        disabled = false,
        children,
        class: className = ""
    } = $props<{
        onclick?: () => void;
        disabled?: boolean;
        children?: any;
        class?: string;
    }>();
</script>

<button
    {onclick}
    {disabled}
    class="bg-pink-500 text-white font-bold py-3 px-6 rounded-full shadow-lg active:bg-pink-600 disabled:opacity-50 transition-all {className}"
>
    {@render children?.()}
</button>
