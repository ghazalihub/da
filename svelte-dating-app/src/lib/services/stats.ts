import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy, onSnapshot, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { C_LIKES, LIKED_USER_ID, LIKED_BY_USER_ID, TIMESTAMP, C_VISITS, VISITED_USER_ID, VISITED_BY_USER_ID, C_DISLIKES, DISLIKED_USER_ID, DISLIKED_BY_USER_ID } from '../constants';

export class ProfileStatsApi {
    static async getLikes(userId: string, callback: (likes: any[]) => void) {
        const q = query(
            collection(db, C_LIKES),
            where(LIKED_USER_ID, "==", userId),
            orderBy(TIMESTAMP, 'desc')
        );
        return onSnapshot(q, (snapshot) => {
            callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    }

    static async getVisits(userId: string, callback: (visits: any[]) => void) {
        const q = query(
            collection(db, C_VISITS),
            where(VISITED_USER_ID, "==", userId),
            orderBy(TIMESTAMP, 'desc')
        );
        return onSnapshot(q, (snapshot) => {
            callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    }

    static async getDislikes(userId: string, callback: (dislikes: any[]) => void) {
        const q = query(
            collection(db, C_DISLIKES),
            where(DISLIKED_BY_USER_ID, "==", userId),
            orderBy(TIMESTAMP, 'desc')
        );
        return onSnapshot(q, (snapshot) => {
            callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    }
}
