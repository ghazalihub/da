import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
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

    static getBlockedUsers(currentUserId: string, callback: (users: any[]) => void) {
        const q = query(
            collection(db, C_BLOCKED_USERS),
            where(BLOCKED_BY_USER_ID, "==", currentUserId),
            orderBy(TIMESTAMP, 'desc')
        );
        return onSnapshot(q, (snapshot) => {
            callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    }

    static async unblockUser(currentUserId: string, blockedUserId: string) {
        const q = query(
            collection(db, C_BLOCKED_USERS),
            where(BLOCKED_BY_USER_ID, "==", currentUserId),
            where(BLOCKED_USER_ID, "==", blockedUserId)
        );
        const snapshot = await getDocs(q);
        for (const d of snapshot.docs) {
            await deleteDoc(d.ref);
        }
    }
}
