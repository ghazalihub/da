<script lang="ts">
    import { MapPin } from '@lucide/svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import { goto } from '$app/navigation';

    let loading = $state(false);

    async function handleGetLocation() {
        loading = true;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    // Logic to update user location in Firebase
                    console.log(position);
                    loading = false;
                    goto('/home/discover');
                },
                (error) => {
                    console.error(error);
                    loading = false;
                    alert('Could not get location. Please enable it in settings.');
                }
            );
        } else {
            alert('Geolocation not supported');
            loading = false;
        }
    }
</script>

<div class="h-screen flex flex-col items-center justify-center p-6 text-center space-y-8 bg-white">
    <div class="w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 shadow-inner">
        <MapPin size={64} fill="currentColor" class="opacity-20" />
        <MapPin size={64} class="absolute" />
    </div>

    <div class="space-y-4 max-w-xs">
        <h1 class="text-2xl font-bold text-gray-800">Your Current Location</h1>
        <p class="text-lg text-gray-500 font-light leading-relaxed">
            The app needs your permission to access your device's current location to show people around you.
        </p>
    </div>

    <Button onclick={handleGetLocation} disabled={loading} class="w-full max-w-xs h-14 text-lg">
        {loading ? 'PROCESSING...' : 'ALLOW LOCATION'}
    </Button>

    <button onclick={() => goto('/home/discover')} class="text-gray-400 font-bold hover:text-pink-500 transition-colors uppercase tracking-wider text-sm">
        Skip for now
    </button>
</div>
