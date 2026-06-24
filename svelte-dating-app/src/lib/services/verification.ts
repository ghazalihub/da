import { db } from '../firebase';
import { doc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { C_USERS, USER_VERIFICATION_STATUS, USER_VERIFICATION_TYPE, USER_VERIFICATION_ID_NUMBER, USER_VERIFICATION_DOCUMENT_URL, USER_VERIFICATION_RANKING_BOOST, USER_IS_VERIFIED } from '../constants';

export class VerificationApi {
    static async submitVerification(userId: string, data: {
        type: string,
        idNumber: string,
        documentUrl: string
    }) {
        const userRef = doc(db, C_USERS, userId);
        await updateDoc(userRef, {
            [USER_VERIFICATION_STATUS]: 'pending',
            [USER_VERIFICATION_TYPE]: data.type,
            [USER_VERIFICATION_ID_NUMBER]: data.idNumber,
            [USER_VERIFICATION_DOCUMENT_URL]: data.documentUrl,
        });
    }

    static getPendingVerifications(callback: (users: any[]) => void) {
        const q = query(
            collection(db, C_USERS),
            where(USER_VERIFICATION_STATUS, '==', 'pending')
        );
        return onSnapshot(q, (snapshot) => {
            callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    }

    static async approveVerification(userId: string, rankingBoost = 10) {
        const userRef = doc(db, C_USERS, userId);
        await updateDoc(userRef, {
            [USER_VERIFICATION_STATUS]: 'verified',
            [USER_VERIFICATION_RANKING_BOOST]: rankingBoost,
            [USER_IS_VERIFIED]: true,
        });
    }

    static async rejectVerification(userId: string) {
        const userRef = doc(db, C_USERS, userId);
        await updateDoc(userRef, {
            [USER_VERIFICATION_STATUS]: 'rejected',
            [USER_IS_VERIFIED]: false,
        });
    }
}
