<script lang="ts">
    import { Info, Mail, Globe, Shield } from '@lucide/svelte';
    import { APP_NAME } from '$lib/constants';
</script>

<div class="p-6 pb-24 max-w-2xl mx-auto space-y-8 min-h-full bg-white">
    <div class="flex flex-col items-center text-center space-y-4">
        <img src="/logo.png" alt="Logo" class="w-24 h-24" />
        <h1 class="text-3xl font-black text-gray-800">{APP_NAME}</h1>
        <p class="text-gray-400 font-medium">Version 1.0.0</p>
    </div>

    <div class="space-y-6">
        <section class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 class="font-bold flex items-center gap-2 mb-3"><Info size={20} class="text-pink-500" /> About Us</h3>
            <p class="text-gray-600 leading-relaxed">
                Our platform is designed to connect academic professionals and students in a meaningful way.
                Whether you're looking for research collaborators or a life partner with similar intellectual interests,
                we're here to help you find that perfect match.
            </p>
        </section>

        <div class="divide-y border rounded-2xl overflow-hidden shadow-sm bg-white">
            <div class="p-4 flex items-center gap-4 text-gray-700">
                <Mail size={20} class="text-pink-500" />
                <span>support@example.com</span>
            </div>
            <div class="p-4 flex items-center gap-4 text-gray-700">
                <Globe size={20} class="text-pink-500" />
                <span>www.example.com</span>
            </div>
            <div class="p-4 flex items-center gap-4 text-gray-700">
                <Shield size={20} class="text-pink-500" />
                <span>Terms & Conditions</span>
            </div>
        </div>
    </div>
</div>
