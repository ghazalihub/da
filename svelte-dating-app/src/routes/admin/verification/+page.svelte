<script lang="ts">
    import { ShieldCheck, UserCheck, UserX, ExternalLink } from '@lucide/svelte';
    import { onMount } from 'svelte';
    import { VerificationApi } from '$lib/services/verification';

    let pendingUsers = $state<any[]>([]);

    onMount(() => {
        return VerificationApi.getPendingVerifications((users) => {
            pendingUsers = users;
        });
    });

    async function handleApprove(userId: string) {
        if (confirm('Approve this user?')) {
            await VerificationApi.approveVerification(userId);
        }
    }

    async function handleReject(userId: string) {
        if (confirm('Reject this user?')) {
            await VerificationApi.rejectVerification(userId);
        }
    }
</script>

<div class="space-y-6">
    <h1 class="text-2xl font-bold flex items-center gap-2">
        <ShieldCheck class="text-blue-500" /> Verification Queue
    </h1>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <table class="w-full text-left">
            <thead class="bg-gray-50 border-b border-gray-100">
                <tr>
                    <th class="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">User</th>
                    <th class="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Type</th>
                    <th class="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">ID Number</th>
                    <th class="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Document</th>
                    <th class="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                {#each pendingUsers as user}
                    <tr class="hover:bg-gray-50/50 transition-colors">
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <img src={user.user_photo_link} alt="" class="w-10 h-10 rounded-full object-cover shadow-sm" />
                                <div>
                                    <p class="font-bold text-gray-800">{user.user_fullname}</p>
                                    <p class="text-xs text-gray-400">{user.user_email}</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase">{user.user_verification_type}</span>
                        </td>
                        <td class="px-6 py-4 text-sm font-mono text-gray-600">{user.user_verification_id_number}</td>
                        <td class="px-6 py-4">
                            <a href={user.user_verification_document_url} target="_blank" class="text-pink-500 hover:text-pink-600 flex items-center gap-1 text-sm font-bold">
                                VIEW <ExternalLink size={14} />
                            </a>
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex justify-end gap-2">
                                <button onclick={() => handleReject(user.id)} class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                                    <UserX size={20} />
                                </button>
                                <button onclick={() => handleApprove(user.id)} class="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                                    <UserCheck size={20} />
                                </button>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>

        {#if pendingUsers.length === 0}
            <div class="text-center py-20 text-gray-400 italic">
                No pending verifications
            </div>
        {/if}
    </div>
</div>
