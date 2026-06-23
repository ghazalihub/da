<script lang="ts">
    import { auth } from '$lib/firebase';
    import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
    import { Phone, ArrowRight } from '@lucide/svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let phoneNumber = $state('');
    let phoneCode = $state('+1');
    let recaptchaVerifier: RecaptchaVerifier;
    let loading = $state(false);

    onMount(() => {
        recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible'
        });
    });

    async function handleSignIn() {
        if (!phoneNumber) return;
        loading = true;
        try {
            const fullNumber = phoneCode + phoneNumber;
            const confirmationResult = await signInWithPhoneNumber(auth, fullNumber, recaptchaVerifier);
            // Store confirmationResult in a session/state to use in verify page
            (window as any).confirmationResult = confirmationResult;
            goto('/auth/verify');
        } catch (error) {
            console.error(error);
            alert('Failed to send SMS');
        } finally {
            loading = false;
        }
    }
</script>

<div class="p-6 max-w-md mx-auto flex flex-col items-center">
    <div class="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center mb-6">
        <Phone size={48} color="white" />
    </div>

    <h1 class="text-2xl font-bold mb-2">Phone Number</h1>
    <p class="text-center text-gray-500 mb-8">
        Sign in with your phone number and we will send you a verification code.
    </p>

    <div class="w-full space-y-4">
        <div class="flex gap-2">
            <select bind:value={phoneCode} class="border p-3 rounded-xl bg-white">
                <option value="+1">+1 (US)</option>
                <!-- Add more codes as needed -->
            </select>
            <input
                type="tel"
                bind:value={phoneNumber}
                placeholder="Enter your number"
                class="flex-1 border p-3 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            />
        </div>

        <button
            onclick={handleSignIn}
            disabled={loading}
            class="w-full bg-pink-500 text-white p-4 rounded-full font-bold flex items-center justify-center gap-2 disabled:opacity-50"
        >
            {loading ? 'PROCESSING...' : 'CONTINUE'}
            <ArrowRight size={20} />
        </button>
    </div>

    <div id="recaptcha-container"></div>
</div>
