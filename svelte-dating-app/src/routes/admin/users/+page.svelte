<script lang="ts">
    // Implementation of user list table with filtering and actions
    let users = $state<any[]>([]);
    let search = $state('');
</script>

<div class="bg-white rounded-2xl shadow-sm overflow-hidden">
    <div class="p-6 border-b flex justify-between items-center">
        <input
            type="text"
            placeholder="Search users..."
            bind:value={search}
            class="border rounded-lg px-4 py-2 w-64 focus:ring-2 focus:ring-pink-500 outline-none"
        />
    </div>

    <table class="w-full text-left">
        <thead class="bg-gray-50 border-b">
            <tr>
                <th class="px-6 py-4 font-semibold text-gray-700">User</th>
                <th class="px-6 py-4 font-semibold text-gray-700">Status</th>
                <th class="px-6 py-4 font-semibold text-gray-700">Joined</th>
                <th class="px-6 py-4 font-semibold text-gray-700">Actions</th>
            </tr>
        </thead>
        <tbody class="divide-y">
            <!-- User rows would go here -->
             <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div>
                            <p class="font-medium">John Doe</p>
                            <p class="text-sm text-gray-500">john@example.com</p>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold uppercase">Active</span>
                </td>
                <td class="px-6 py-4 text-gray-500">Oct 24, 2023</td>
                <td class="px-6 py-4">
                    <button class="text-pink-600 hover:underline">View Profile</button>
                </td>
             </tr>
        </tbody>
    </table>
</div>
