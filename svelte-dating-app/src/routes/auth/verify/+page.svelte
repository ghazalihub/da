<script lang="ts">
    import { auth } from '$lib/firebase';
    import { Phone, ArrowLeft, RefreshCw } from '@lucide/svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let code = $state(['', '', '', '', '', '']);
    let loading = $state(false);
    let timer = $state(60);

    onMount(() => {
        const interval = setInterval(() => {
            if (timer > 0) timer--;
        }, 1000);
        return () => clearInterval(interval);
    });

    async function handleVerify() {
        const otp = code.join('');
        if (otp.length < 6) return;

        loading = true;
        try {
            // Original code used confirmationResult.confirm(otp)
            const confirmationResult = (window as any).confirmationResult;
            if (confirmationResult) {
                await confirmationResult.confirm(otp);
                goto('/auth/location');
            } else {
                alert('Session expired. Please try again.');
                goto('/auth/signin');
            }
        } catch (error) {
            console.error(error);
            alert('Invalid verification code');
        } finally {
            loading = false;
        }
    }

    function handleInput(e: Event, index: number) {
        const target = e.target as HTMLInputElement;
        const val = target.value;
        if (val && index < 5) {
            const next = target.nextElementSibling as HTMLInputElement;
            next?.focus();
        }
    }

    function handleKeyDown(e: KeyboardEvent, index: number) {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const target = e.target as HTMLInputElement;
            const prev = target.previousElementSibling as HTMLInputElement;
            prev?.focus();
        }
    }
</script>

<div class="p-6 max-w-md mx-auto flex flex-col items-center min-h-full bg-white">
    <button onclick={() => history.back()} class="self-start p-2 -ml-2 text-gray-400 hover:text-pink-500">
        <ArrowLeft size={24} />
    </button>

    <div class="w-24 h-24 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center my-8">
        <Phone size={48} />
    </div>

    <h1 class="text-2xl font-bold mb-2">Verification</h1>
    <p class="text-center text-gray-500 mb-8">
        Enter the 6-digit code we sent to your phone number.
    </p>

    <div class="flex gap-2 mb-8">
        {#each code as digit, i}
            <input
                type="text"
                maxlength="1"
                bind:value={code[i]}
                oninput={(e) => handleInput(e, i)}
                onkeydown={(e) => handleKeyDown(e, i)}
                class="w-12 h-14 border-2 rounded-xl text-center text-2xl font-bold focus:border-pink-500 focus:ring-0 outline-none bg-gray-50"
            />
        {/each}
    </div>

    <Button onclick={handleVerify} disabled={loading || code.join('').length < 6} class="w-full h-14 text-lg">
        {loading ? 'VERIFYING...' : 'VERIFY & CONTINUE'}
    </Button>

    <div class="mt-8 text-center">
        <p class="text-gray-500 mb-2">Didn't receive the code?</p>
        <button disabled={timer > 0} class="text-pink-500 font-bold flex items-center gap-2 mx-auto disabled:opacity-30">
            <RefreshCw size={18} class={loading ? 'animate-spin' : ''} />
            RESEND CODE {timer > 0 ? `(${timer}s)` : ''}
        </button>
    </div>
</div>
