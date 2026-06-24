import type { User } from '../types';

export interface CompatibilityResult {
    score: number;
    explanations: string[];
}

export class CompatibilityHelper {
    static calculate(currentUser: User, otherUser: User): CompatibilityResult {
        let totalScore = 0;
        const explanations: string[] = [];

        // 1. Education Similarity (20 points)
        if (currentUser.userDegree === otherUser.userDegree && currentUser.userDegree !== "") {
            totalScore += 20;
            explanations.push(`You both are pursuing or hold a ${currentUser.userDegree} degree.`);
        } else if (currentUser.userUniversity === otherUser.userUniversity && currentUser.userUniversity !== "") {
            totalScore += 15;
            explanations.push(`You both attended ${currentUser.userUniversity}.`);
        }

        // 2. Career & Industry (20 points)
        if (currentUser.userIndustry === otherUser.userIndustry && currentUser.userIndustry !== "") {
            totalScore += 20;
            explanations.push(`You both work in the ${currentUser.userIndustry} industry.`);
        }

        // 3. Relationship Intent (20 points)
        if (currentUser.userRelationshipIntent === otherUser.userRelationshipIntent && currentUser.userRelationshipIntent !== "") {
            totalScore += 20;
            explanations.push(`You both are looking for a ${currentUser.userRelationshipIntent.toLowerCase()}.`);
        }

        // 4. Future Goals Overlap (15 points)
        const commonGoals = currentUser.userFutureGoals
            .filter(goal => otherUser.userFutureGoals.includes(goal));
        if (commonGoals.length > 0) {
            totalScore += 15;
            explanations.push(`You both share future goals in ${commonGoals.join(', ')}.`);
        }

        // 5. Research Interests Overlap (15 points)
        const commonInterests = currentUser.userResearchInterests
            .filter(interest => otherUser.userResearchInterests.includes(interest));
        if (commonInterests.length > 0) {
            totalScore += 15;
            explanations.push(`You both are interested in ${commonInterests.join(', ')}.`);
        }

        // 6. Lifestyle (10 points)
        if (currentUser.userSmoking === otherUser.userSmoking && currentUser.userSmoking !== "") {
            totalScore += 5;
        }
        if (currentUser.userDrinking === otherUser.userDrinking && currentUser.userDrinking !== "") {
            totalScore += 5;
        }
        if (currentUser.userSmoking === otherUser.userSmoking && currentUser.userDrinking === otherUser.userDrinking && currentUser.userSmoking !== "") {
            explanations.push("You have similar lifestyle habits.");
        }

        // Baseline score to ensure a minimum for verified profiles
        if (totalScore < 30) totalScore = 30 + (totalScore % 20);
        if (totalScore > 100) totalScore = 100;

        return { score: totalScore, explanations };
    }
}
