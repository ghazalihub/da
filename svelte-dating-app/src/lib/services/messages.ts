import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { C_MESSAGES, USER_ID, MESSAGE_TYPE, MESSAGE_TEXT, MESSAGE_IMG_LINK, TIMESTAMP } from '../constants';

export class MessagesApi {
    static getMessages(currentUserId: string, withUserId: string, callback: (messages: any[]) => void) {
        const q = query(
            collection(db, C_MESSAGES, currentUserId, withUserId),
            orderBy(TIMESTAMP, 'asc')
        );

        return onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(messages);
        });
    }

    static async saveMessage(data: {
        type: string,
        senderId: string,
        receiverId: string,
        fromUserId: string,
        textMsg: string,
        imgLink: string,
    }) {
        const messageData = {
            [USER_ID]: data.fromUserId,
            [MESSAGE_TYPE]: data.type,
            [MESSAGE_TEXT]: data.textMsg,
            [MESSAGE_IMG_LINK]: data.imgLink,
            [TIMESTAMP]: serverTimestamp()
        };

        // Save for sender
        await addDoc(collection(db, C_MESSAGES, data.senderId, data.receiverId), messageData);

        // Save for receiver (ideally handled by cloud functions but original code does it client side)
        await addDoc(collection(db, C_MESSAGES, data.receiverId, data.senderId), messageData);
    }
}
