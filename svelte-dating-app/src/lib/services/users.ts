import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { C_USERS, USER_STATUS, USER_LEVEL, USER_VERIFICATION_STATUS } from '../constants';
import type { User, DiscoveryMode } from '../types';
import { CompatibilityHelper } from '../helpers/compatibility';

export class UsersApi {
    static async getUsers(currentUser: User, dislikedUserIds: string[], discoveryMode: DiscoveryMode = "general" as DiscoveryMode) {
        // This is a simplified version. Real geo-queries in Firestore Web are more complex (geofire-common)
        const q = query(
            collection(db, C_USERS),
            where(USER_STATUS, "==", "active"),
            where(USER_LEVEL, "==", "user"),
            where(USER_VERIFICATION_STATUS, "==", "verified")
        );

        const snapshot = await getDocs(q);
        let users = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() } as any))
            .filter(user => user.userId !== currentUser.userId && !dislikedUserIds.includes(user.userId));

        // Sorting logic similar to Dart version
        users.sort((a, b) => {
            const boostA = a.user_verification_ranking_boost || 0;
            const boostB = b.user_verification_ranking_boost || 0;
            if (boostA !== boostB) return boostB - boostA;

            const scoreA = CompatibilityHelper.calculate(currentUser, a as User).score;
            const scoreB = CompatibilityHelper.calculate(currentUser, b as User).score;
            if (scoreA !== scoreB) return scoreB - scoreA;

            const qualityA = a.user_profile_quality_score || 0;
            const qualityB = b.user_profile_quality_score || 0;
            if (qualityA !== qualityB) return qualityB - qualityA;

            return b.user_reg_date?.toMillis() - a.user_reg_date?.toMillis();
        });

        // Discovery mode filtering logic...
        return users;
    }
}
