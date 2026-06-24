import { writable } from 'svelte/store';
import type { User, AppInfo } from '../types';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';
import { C_USERS, USER_DEVICE_TOKEN } from '../constants';

export const userStore = writable<User | null>(null);
export const appInfoStore = writable<AppInfo | null>(null);
export const userIsVip = writable<boolean>(false);
export const isLoading = writable<boolean>(false);

export function initAuth() {
    onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            onSnapshot(doc(db, C_USERS, firebaseUser.uid), (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    const user: User = {
                        ...data,
                        userRegDate: data.user_reg_date?.toDate(),
                        userLastLogin: data.user_last_login?.toDate(),
                        userSuspensionEndDate: data.user_suspension_end_date?.toDate(),
                    } as User;
                    userStore.set(user);
                    // Check VIP status logic here if needed
                }
            });
        } else {
            userStore.set(null);
        }
    });
}

export async function updateUserData(userId: string, data: Partial<any>) {
    const userRef = doc(db, C_USERS, userId);
    await updateDoc(userRef, data);
}

export function calculateUserAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
