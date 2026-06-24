<script lang="ts">
    import { userStore, updateUserData } from '$lib/stores/user';
    import {
        ACADEMIC_DEGREES, STUDY_YEARS, ACADEMIC_STATUSES, INDUSTRIES,
        FUTURE_GOALS, RESEARCH_INTERESTS, LANGUAGES, WORK_SCHEDULES,
        SHIFT_TYPES, EXERCISE_FREQUENCIES, SMOKING_HABITS, DRINKING_HABITS,
        SLEEP_SCHEDULES, RELATIONSHIP_INTENTS
    } from '$lib/constants/choices';
    import Button from '$lib/components/ui/Button.svelte';
    import { Camera, User, Calendar, Info, GraduationCap, Briefcase, Heart, Activity } from '@lucide/svelte';
    import { goto } from '$app/navigation';

    let step = $state(1);
    let loading = $state(false);

    // Form State
    let fullName = $state('');
    let gender = $state('');
    let birthDate = $state('');
    let bio = $state('');

    // Academic
    let institution = $state('');
    let university = $state('');
    let college = $state('');
    let degree = $state('');
    let course = $state('');
    let studyYear = $state('');
    let graduationYear = $state('');
    let academicStatus = $state('');

    // Professional
    let occupation = $state('');
    let specialization = $state('');
    let department = $state('');
    let industry = $state('');

    // Lifestyle & Others
    let intent = $state('');
    let workSchedule = $state('');
    let smoking = $state('');
    let drinking = $state('');
    let nativeLanguage = $state('');
    let selectedGoals = $state<string[]>([]);
    let selectedInterests = $state<string[]>([]);

    async function handleSignUp() {
        loading = true;
        // Logic to create account in Firebase and store user data
        // ...
        setTimeout(() => {
            loading = false;
            goto('/home/discover');
        }, 2000);
    }

    function toggleGoal(goal: string) {
        if (selectedGoals.includes(goal)) {
            selectedGoals = selectedGoals.filter(g => g !== goal);
        } else {
            selectedGoals = [...selectedGoals, goal];
        }
    }
</script>

<div class="min-h-full bg-white p-6 pb-32">
    <div class="max-w-md mx-auto space-y-8">
        <header class="text-center">
            <h1 class="text-2xl font-bold">Create Account</h1>
            <p class="text-gray-500">Step {step} of 4</p>
        </header>

        {#if step === 1}
            <!-- Basic Info -->
            <div class="space-y-6 animate-in slide-in-from-right duration-300">
                <div class="flex flex-col items-center">
                    <div class="w-32 h-32 bg-pink-500 rounded-full flex items-center justify-center text-white relative shadow-lg">
                        <Camera size={48} />
                        <div class="absolute bottom-0 right-0 bg-white text-pink-500 p-2 rounded-full shadow">
                            <Activity size={20} />
                        </div>
                    </div>
                    <p class="mt-2 text-sm text-gray-500">Profile Photo</p>
                </div>

                <div class="space-y-4">
                    <div class="relative">
                        <User class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" bind:value={fullName} placeholder="Full Name" class="w-full border rounded-2xl p-4 pl-12" />
                    </div>
                    <select bind:value={gender} class="w-full border rounded-2xl p-4 bg-white">
                        <option value="" disabled selected>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <div class="relative">
                        <Calendar class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="date" bind:value={birthDate} class="w-full border rounded-2xl p-4 pl-12" />
                    </div>
                    <textarea bind:value={bio} placeholder="Tell us about yourself..." class="w-full border rounded-2xl p-4 h-32 resize-none"></textarea>
                </div>
                <Button onclick={() => step = 2} class="w-full">NEXT: ACADEMIC</Button>
            </div>

        {:else if step === 2}
            <!-- Academic Info -->
            <div class="space-y-4 animate-in slide-in-from-right duration-300">
                <h3 class="font-bold text-lg flex items-center gap-2"><GraduationCap class="text-pink-500" /> Academic Identity</h3>
                <input type="text" bind:value={institution} placeholder="Institution" class="w-full border rounded-xl p-3" />
                <input type="text" bind:value={university} placeholder="University" class="w-full border rounded-xl p-3" />
                <select bind:value={degree} class="w-full border rounded-xl p-3 bg-white">
                    <option value="" disabled selected>Select Degree</option>
                    {#each ACADEMIC_DEGREES as d}<option value={d}>{d}</option>{/each}
                </select>
                <select bind:value={studyYear} class="w-full border rounded-xl p-3 bg-white">
                    <option value="" disabled selected>Study Year</option>
                    {#each STUDY_YEARS as y}<option value={y}>{y}</option>{/each}
                </select>
                <div class="flex gap-4">
                    <Button onclick={() => step = 1} class="w-1/2 bg-gray-200 text-gray-700 active:bg-gray-300">BACK</Button>
                    <Button onclick={() => step = 3} class="w-1/2">NEXT</Button>
                </div>
            </div>

        {:else if step === 3}
            <!-- Professional & Intent -->
            <div class="space-y-4 animate-in slide-in-from-right duration-300">
                <h3 class="font-bold text-lg flex items-center gap-2"><Briefcase class="text-pink-500" /> Professional Identity</h3>
                <input type="text" bind:value={occupation} placeholder="Occupation (e.g. Engineer)" class="w-full border rounded-xl p-3" />
                <select bind:value={industry} class="w-full border rounded-xl p-3 bg-white">
                    <option value="" disabled selected>Industry</option>
                    {#each INDUSTRIES as i}<option value={i}>{i}</option>{/each}
                </select>

                <h3 class="font-bold text-lg flex items-center gap-2 pt-4"><Heart class="text-pink-500" /> Relationship Intent</h3>
                <select bind:value={intent} class="w-full border rounded-xl p-3 bg-white">
                    <option value="" disabled selected>What are you looking for?</option>
                    {#each RELATIONSHIP_INTENTS as r}<option value={r}>{r}</option>{/each}
                </select>

                <div class="flex gap-4">
                    <Button onclick={() => step = 2} class="w-1/2 bg-gray-200 text-gray-700">BACK</Button>
                    <Button onclick={() => step = 4} class="w-1/2">NEXT</Button>
                </div>
            </div>

        {:else if step === 4}
            <!-- Lifestyle & Goals -->
            <div class="space-y-6 animate-in slide-in-from-right duration-300">
                <div class="space-y-4">
                    <h3 class="font-bold">Future Goals</h3>
                    <div class="flex flex-wrap gap-2">
                        {#each FUTURE_GOALS as goal}
                            <button
                                onclick={() => toggleGoal(goal)}
                                class="px-4 py-2 rounded-full border text-sm transition-colors {selectedGoals.includes(goal) ? 'bg-pink-500 text-white border-pink-500' : 'text-gray-600 border-gray-200'}"
                            >
                                {goal}
                            </button>
                        {/each}
                    </div>
                </div>

                <div class="space-y-4 border-t pt-6">
                    <label class="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" class="w-5 h-5 accent-pink-500" />
                        <span class="text-sm text-gray-600">I agree to the Terms of Service and Privacy Policy</span>
                    </label>
                </div>

                <div class="flex gap-4">
                    <Button onclick={() => step = 3} class="w-1/2 bg-gray-200 text-gray-700">BACK</Button>
                    <Button onclick={handleSignUp} disabled={loading} class="w-1/2">
                        {loading ? 'CREATING...' : 'FINISH'}
                    </Button>
                </div>
            </div>
        {/if}
    </div>
</div>
