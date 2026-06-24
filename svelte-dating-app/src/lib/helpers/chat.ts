import type { User } from '../types';

export class ChatQualityHelper {
    static getConversationStarters(otherUser: User): string[] {
        const starters: string[] = [];

        if (otherUser.userDegree) {
            starters.push(`What inspired you to pursue a ${otherUser.userDegree}?`);
        }

        if (otherUser.userOccupation) {
            starters.push(`How's your experience been working as a ${otherUser.userOccupation}?`);
        }

        if (otherUser.userResearchInterests?.length > 0) {
            starters.push(`I saw you're interested in ${otherUser.userResearchInterests[0]}. What's the most exciting development in that field recently?`);
        }

        if (otherUser.userFutureGoals?.length > 0) {
            starters.push(`Your goal of ${otherUser.userFutureGoals[0]} is impressive. How are you planning to achieve it?`);
        }

        if (starters.length === 0) {
            starters.push("Hello! I'd love to learn more about your academic journey.");
            starters.push("Hi! What's the most interesting thing you're working on right now?");
        }

        return starters;
    }

    static getIceBreakers(): string[] {
        return [
            "If you could have a conversation with any famous scholar, who would it be?",
            "What's one piece of advice you'd give to someone just starting in your field?",
            "Early bird or night owl for study/work sessions?",
            "What's your go-to productivity hack?",
            "If you weren't in your current profession/degree, what would you be doing?"
        ];
    }
}
