<script lang="ts">
    import { userStore, updateUserData } from '$lib/stores/user';
    import { INDUSTRIES, ACADEMIC_DEGREES, RELATIONSHIP_INTENTS } from '$lib/constants/choices';
    import Button from '$lib/components/ui/Button.svelte';
    import { Save, ArrowLeft } from '@lucide/svelte';

    let user = $derived($userStore);

    let school = $state('');
    let jobTitle = $state('');
    let bio = $state('');
    let industry = $state('');
    let degree = $state('');
    let intent = $state('');

    $effect(() => {
        if (user) {
            school = user.userSchool || '';
            jobTitle = user.userJobTitle || '';
            bio = user.userBio || '';
            industry = user.userIndustry || '';
            degree = user.userDegree || '';
            intent = user.userRelationshipIntent || '';
        }
    });

    async function handleSave() {
        if (!user) return;
        await updateUserData(user.userId, {
            user_school: school,
            user_job_title: jobTitle,
            user_bio: bio,
            user_industry: industry,
            user_degree: degree,
            user_relationship_intent: intent
        });
        alert('Profile updated!');
    }
</script>

<div class="p-6 pb-24 space-y-6 max-w-2xl mx-auto bg-white min-h-full">
    <div class="flex items-center gap-4">
        <button onclick={() => history.back()} class="p-2 -ml-2 text-gray-400 hover:text-pink-500">
            <ArrowLeft size={24} />
        </button>
        <h1 class="text-2xl font-bold">Edit Profile</h1>
    </div>

    <div class="space-y-4">
        <div>
            <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">About Me</label>
            <textarea
                id="bio"
                bind:value={bio}
                rows="4"
                class="w-full border rounded-2xl p-3 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                placeholder="Tell others about yourself..."
            ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="school" class="block text-sm font-medium text-gray-700 mb-1">School</label>
                <input id="school" type="text" bind:value={school} class="w-full border rounded-xl p-3" />
            </div>
            <div>
                <label for="jobTitle" class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input id="jobTitle" type="text" bind:value={jobTitle} class="w-full border rounded-xl p-3" />
            </div>
        </div>

        <div>
            <label for="industry" class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select id="industry" bind:value={industry} class="w-full border rounded-xl p-3 bg-white">
                {#each INDUSTRIES as item}
                    <option value={item}>{item}</option>
                {/each}
            </select>
        </div>

        <div>
            <label for="degree" class="block text-sm font-medium text-gray-700 mb-1">Degree</label>
            <select id="degree" bind:value={degree} class="w-full border rounded-xl p-3 bg-white">
                {#each ACADEMIC_DEGREES as item}
                    <option value={item}>{item}</option>
                {/each}
            </select>
        </div>

        <div>
            <label for="intent" class="block text-sm font-medium text-gray-700 mb-1">Looking For</label>
            <select id="intent" bind:value={intent} class="w-full border rounded-xl p-3 bg-white">
                {#each RELATIONSHIP_INTENTS as item}
                    <option value={item}>{item}</option>
                {/each}
            </select>
        </div>
    </div>

    <div class="fixed bottom-24 left-6 right-6 flex justify-center lg:static lg:mt-10 lg:bottom-0">
        <Button onclick={handleSave} class="w-full max-w-sm flex items-center justify-center gap-2">
            <Save size={20} />
            SAVE CHANGES
        </Button>
    </div>
</div>
