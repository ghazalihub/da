import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy, limit, deleteDoc, doc, onSnapshot, updateDoc, increment, addDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { C_CONVERSATIONS, LAST_MESSAGE, MESSAGE_READ, MESSAGE_TYPE, TIMESTAMP, USER_FULLNAME, USER_PROFILE_PHOTO, C_MATCHES, C_VISITS, VISITED_USER_ID, VISITED_BY_USER_ID, USER_TOTAL_VISITS, C_DISLIKES, DISLIKED_USER_ID, DISLIKED_BY_USER_ID, USER_TOTAL_DISLIKED, C_COMMUNITIES } from '../constants';

export class ConversationsApi {
    static getConversations(userId: string, callback: (conversations: any[]) => void) {
        const q = query(
            collection(db, C_CONVERSATIONS, userId, 'active'),
            orderBy(TIMESTAMP, 'desc')
        );
        return onSnapshot(q, (snapshot) => {
            callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    }

    static async saveConversation(data: {
        userId: string,
        recipientId: string,
        text: string,
        type: string,
        recipientName: string,
        recipientPhoto: string,
        isRead: boolean
    }) {
        const ref = doc(db, C_CONVERSATIONS, data.userId, 'active', data.recipientId);
        await setDoc(ref, {
            [USER_FULLNAME]: data.recipientName,
            [USER_PROFILE_PHOTO]: data.recipientPhoto,
            [LAST_MESSAGE]: data.text,
            [MESSAGE_TYPE]: data.type,
            [MESSAGE_READ]: data.isRead,
            [TIMESTAMP]: serverTimestamp()
        });
    }
}

export class MatchesApi {
    static async getMatches(userId: string, callback: (matches: any[]) => void) {
        const q = query(
            collection(db, C_MATCHES),
            where('match_ids', 'array-contains', userId),
            orderBy(TIMESTAMP, 'desc')
        );
        return onSnapshot(q, (snapshot) => {
            callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    }
}

export class VisitsApi {
    static async visitUser(currentUserId: string, visitedUserId: string) {
        await addDoc(collection(db, C_VISITS), {
            [VISITED_USER_ID]: visitedUserId,
            [VISITED_BY_USER_ID]: currentUserId,
            [TIMESTAMP]: serverTimestamp()
        });
        await updateDoc(doc(db, 'Users', visitedUserId), {
            [USER_TOTAL_VISITS]: increment(1)
        });
    }
}

export class DislikesApi {
    static async dislikeUser(currentUserId: string, dislikedUserId: string) {
        await addDoc(collection(db, C_DISLIKES), {
            [DISLIKED_USER_ID]: dislikedUserId,
            [DISLIKED_BY_USER_ID]: currentUserId,
            [TIMESTAMP]: serverTimestamp()
        });
        await updateDoc(doc(db, 'Users', dislikedUserId), {
            [USER_TOTAL_DISLIKED]: increment(1)
        });
    }
}

export class CommunityApi {
    static getCommunities(callback: (communities: any[]) => void) {
        const q = query(collection(db, C_COMMUNITIES), orderBy(TIMESTAMP, 'desc'));
        return onSnapshot(q, (snapshot) => {
            callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    }
}
