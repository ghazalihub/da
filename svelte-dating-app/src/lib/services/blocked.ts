import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { C_BLOCKED_USERS, BLOCKED_USER_ID, BLOCKED_BY_USER_ID, TIMESTAMP } from '../constants';

export class BlockedUsersApi {
    static async blockUser(currentUserId: string, blockedUserId: string, restrictedOnly = false) {
        const q = query(
            collection(db, C_BLOCKED_USERS),
            where(BLOCKED_BY_USER_ID, "==", currentUserId),
            where(BLOCKED_USER_ID, "==", blockedUserId)
        );

        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            await addDoc(collection(db, C_BLOCKED_USERS), {
                [BLOCKED_USER_ID]: blockedUserId,
                [BLOCKED_BY_USER_ID]: currentUserId,
                'restrictedOnly': restrictedOnly,
                [TIMESTAMP]: serverTimestamp()
            });
            return true;
        }
        return false;
    }

    static async isBlocked(currentUserId: string, otherUserId: string) {
        const q = query(
            collection(db, C_BLOCKED_USERS),
            where(BLOCKED_BY_USER_ID, "==", currentUserId),
            where(BLOCKED_USER_ID, "==", otherUserId)
        );
        const snapshot = await getDocs(q);
        return !snapshot.empty;
    }
}
