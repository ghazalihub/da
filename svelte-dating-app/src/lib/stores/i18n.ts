import { writable, derived } from 'svelte/store';

export const locale = writable('en');

// In a real Svelte project, we would fetch these from JSON files
const translations: Record<string, Record<string, string>> = {
    en: {
        'discover': 'Discover',
        'matches': 'Matches',
        'chats': 'Chats',
        'profile': 'Profile',
        'sign_in': 'Sign In',
        'sign_up': 'Sign Up',
        'sign_out': 'Sign Out',
        // ... more translations
    }
};

export const i18n = derived(locale, ($locale) => {
    return (key: string) => translations[$locale]?.[key] || key;
});
