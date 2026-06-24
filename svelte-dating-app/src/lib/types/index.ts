export interface GeoPoint {
    latitude: number;
    longitude: number;
}

export interface UserSettings {
    user_min_age: number;
    user_max_age: number;
    user_max_distance: number;
    user_show_me?: string;
}

export interface User {
    userId: string;
    userProfilePhoto: string;
    userFullname: string;
    userGender: string;
    userBirthDay: number;
    userBirthMonth: number;
    userBirthYear: number;
    userSchool: string;
    userJobTitle: string;
    userBio: string;
    userPhoneNumber: string;
    userEmail: string;
    userCountry: string;
    userLocality: string;
    userGeoPoint: GeoPoint;
    userStatus: string;
    userIsVerified: boolean;
    userLevel: string;
    userRegDate: Date;
    userLastLogin: Date;
    userDeviceToken: string;
    userTotalLikes: number;
    userTotalVisits: number;
    userTotalDisliked: number;
    // Academic Identity
    userInstitution: string;
    userUniversity: string;
    userCollege: string;
    userDegree: string;
    userCourse: string;
    userStudyYear: string;
    userGraduationYear: string;
    userAcademicStatus: string;
    // Professional Identity
    userOccupation: string;
    userSpecialization: string;
    userDepartment: string;
    userIndustry: string;
    // Future Goals
    userFutureGoals: string[];
    // Research Interests
    userResearchInterests: string[];
    // Languages
    userNativeLanguage: string;
    userSpokenLanguages: string[];
    // Lifestyle
    userWorkSchedule: string;
    userShiftType: string;
    userExercise: string;
    userSmoking: string;
    userDrinking: string;
    userSleepSchedule: string;
    // Relationship Intent
    userRelationshipIntent: string;
    // Verification
    userVerificationStatus: string;
    userVerificationType: string;
    userVerificationIdNumber: string;
    userVerificationDocumentUrl: string;
    userVerificationRankingBoost: number;
    // Trust & Safety
    userSuspensionEndDate?: Date;
    userIsSuspended: boolean;
    userIsBanned: boolean;
    userProfileQualityScore: number;
    userBanReason: string;

    userGallery?: Record<string, string>;
    userSettings?: UserSettings;
}

export interface AppInfo {
    androidAppCurrentVersion: number;
    iosAppCurrentVersion: number;
    androidPackageName: string;
    iosAppId: string;
    appEmail: string;
    privacyPolicyUrl: string;
    termsOfServicesUrl: string;
    subscriptionIds: string[];
    freeAccountMaxDistance: number;
    vipAccountMaxDistance: number;
    agoraAppID: string;
}
