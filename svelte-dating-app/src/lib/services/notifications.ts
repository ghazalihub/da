import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, limit, deleteDoc, doc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import {
    C_NOTIFICATIONS, N_SENDER_ID, N_SENDER_FULLNAME, N_SENDER_PHOTO_LINK,
    N_RECEIVER_ID, N_TYPE, N_MESSAGE, N_READ, TIMESTAMP, APP_NAME, C_LIKES, LIKED_USER_ID, LIKED_BY_USER_ID, USER_TOTAL_LIKES, C_USERS
} from '../constants';
import type { User } from '../types';

export class NotificationsApi {
    static async saveNotification(sender: User, receiverId: string, type: string, message: string) {
        await addDoc(collection(db, C_NOTIFICATIONS), {
            [N_SENDER_ID]: sender.userId,
            [N_SENDER_FULLNAME]: sender.userFullname,
            [N_SENDER_PHOTO_LINK]: sender.userProfilePhoto,
            [N_RECEIVER_ID]: receiverId,
            [N_TYPE]: type,
            [N_MESSAGE]: message,
            [N_READ]: false,
            [TIMESTAMP]: serverTimestamp()
        });
    }

    static async sendPushNotification(data: {
        title: string;
        body: string;
        type: string;
        senderId: string;
        deviceToken: string;
    }) {
        const functions = getFunctions();
        const sendPush = httpsCallable(functions, 'sendPushNotification');
        try {
            await sendPush(data);
        } catch (e) {
            console.error('sendPushNotification error', e);
        }
    }
}

export class LikesApi {
    static async likeUser(currentUser: User, likedUser: User, nMessage: string) {
        if (currentUser.userVerificationStatus !== 'verified') {
            return { success: false, error: 'not_verified' };
        }

        const q = query(
            collection(db, C_LIKES),
            where(LIKED_BY_USER_ID, "==", currentUser.userId),
            where(LIKED_USER_ID, "==", likedUser.userId)
        );

        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            await addDoc(collection(db, C_LIKES), {
                [LIKED_USER_ID]: likedUser.userId,
                [LIKED_BY_USER_ID]: currentUser.userId,
                [TIMESTAMP]: serverTimestamp()
            });

            const userRef = doc(db, C_USERS, likedUser.userId);
            await updateDoc(userRef, {
                [USER_TOTAL_LIKES]: increment(1)
            });

            await NotificationsApi.saveNotification(currentUser, likedUser.userId, 'like', nMessage);

            if (likedUser.userDeviceToken) {
                await NotificationsApi.sendPushNotification({
                    title: APP_NAME,
                    body: nMessage,
                    type: 'like',
                    senderId: currentUser.userId,
                    deviceToken: likedUser.userDeviceToken
                });
            }
            return { success: true };
        }
        return { success: false, error: 'already_liked' };
    }
}
