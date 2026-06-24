export const APP_NAME = "Dating App";
export const APP_PRIMARY_COLOR = "#E91E63"; // Colors.pink
export const APP_ACCENT_COLOR = "#FF4081"; // Colors.pinkAccent

// DATABASE COLLECTIONS
export const NOTIFY_USERS = "NOTIFY_USERS";
export const C_APP_INFO = "AppInfo";
export const C_USERS = "Users";
export const C_FLAGGED_USERS = "FlaggedUsers";
export const C_CONNECTIONS = "Connections";
export const C_MATCHES = "Matches";
export const C_CONVERSATIONS = "Conversations";
export const C_LIKES = "Likes";
export const C_VISITS = "Visits";
export const C_DISLIKES = "Dislikes";
export const C_MESSAGES = "Messages";
export const C_NOTIFICATIONS = "Notifications";
export const C_BLOCKED_USERS = 'BlockedUsers';
export const C_REPORTS = "Reports";
export const C_COMMUNITIES = "Communities";

// DATABASE FIELDS FOR AppInfo
export const ANDROID_APP_CURRENT_VERSION = "android_app_current_version";
export const IOS_APP_CURRENT_VERSION = "ios_app_current_version";
export const ANDROID_PACKAGE_NAME = "android_package_name";
export const IOS_APP_ID = "ios_app_id";
export const APP_EMAIL = "app_email";
export const PRIVACY_POLICY_URL = "privacy_policy_url";
export const TERMS_OF_SERVICE_URL = "terms_of_service_url";
export const FIREBASE_SERVER_KEY = "firebase_server_key";
export const STORE_SUBSCRIPTION_IDS = "store_subscription_ids";
export const FREE_ACCOUNT_MAX_DISTANCE = "free_account_max_distance";
export const VIP_ACCOUNT_MAX_DISTANCE = "vip_account_max_distance";
export const ADMOB_APP_ID = "admob_app_id";
export const ADMOB_INTERSTITIAL_AD_ID = "admob_interstitial_ad_id";

// DATABASE FIELDS FOR USER
export const USER_ID = "user_id";
export const USER_PROFILE_PHOTO = "user_photo_link";
export const USER_FULLNAME = "user_fullname";
export const USER_GENDER = "user_gender";
export const USER_BIRTH_DAY = "user_birth_day";
export const USER_BIRTH_MONTH = "user_birth_month";
export const USER_BIRTH_YEAR = "user_birth_year";
export const USER_SCHOOL = "user_school";
export const USER_JOB_TITLE = "user_job_title";
export const USER_BIO = "user_bio";
export const USER_PHONE_NUMBER = "user_phone_number";
export const USER_EMAIL = "user_email";
export const USER_GALLERY = "user_gallery";
export const USER_COUNTRY = "user_country";
export const USER_LOCALITY = "user_locality";
export const USER_GEO_POINT = "user_geo_point";
export const USER_SETTINGS = "user_settings";
export const USER_STATUS = "user_status";
export const USER_IS_VERIFIED = "user_is_verified";
export const USER_LEVEL = "user_level";
export const USER_REG_DATE = "user_reg_date";
export const USER_LAST_LOGIN = "user_last_login";
export const USER_DEVICE_TOKEN = "user_device_token";
export const USER_TOTAL_LIKES = "user_total_likes";
export const USER_TOTAL_VISITS = "user_total_visits";
export const USER_TOTAL_DISLIKED = "user_total_disliked";

// Academic Identity
export const USER_INSTITUTION = "user_institution";
export const USER_UNIVERSITY = "user_university";
export const USER_COLLEGE = "user_college";
export const USER_DEGREE = "user_degree";
export const USER_COURSE = "user_course";
export const USER_STUDY_YEAR = "user_study_year";
export const USER_GRADUATION_YEAR = "user_graduation_year";
export const USER_ACADEMIC_STATUS = "user_academic_status";

// Professional Identity
export const USER_OCCUPATION = "user_occupation";
export const USER_SPECIALIZATION = "user_specialization";
export const USER_DEPARTMENT = "user_department";
export const USER_INDUSTRY = "user_industry";

// Future Goals
export const USER_FUTURE_GOALS = "user_future_goals";
// Research Interests
export const USER_RESEARCH_INTERESTS = "user_research_interests";
// Languages
export const USER_NATIVE_LANGUAGE = "user_native_language";
export const USER_SPOKEN_LANGUAGES = "user_spoken_languages";
// Lifestyle
export const USER_WORK_SCHEDULE = "user_work_schedule";
export const USER_SHIFT_TYPE = "user_shift_type";
export const USER_EXERCISE = "user_exercise";
export const USER_SMOKING = "user_smoking";
export const USER_DRINKING = "user_drinking";
export const USER_SLEEP_SCHEDULE = "user_sleep_schedule";
// Relationship Intent
export const USER_RELATIONSHIP_INTENT = "user_relationship_intent";

// Verification fields
export const USER_VERIFICATION_STATUS = "user_verification_status";
export const USER_VERIFICATION_TYPE = "user_verification_type";
export const USER_VERIFICATION_ID_NUMBER = "user_verification_id_number";
export const USER_VERIFICATION_DOCUMENT_URL = "user_verification_document_url";
export const USER_VERIFICATION_RANKING_BOOST = "user_verification_ranking_boost";

// Trust & Safety fields
export const USER_SUSPENSION_END_DATE = "user_suspension_end_date";
export const USER_IS_SUSPENDED = "user_is_suspended";
export const USER_IS_BANNED = "user_is_banned";
export const USER_PROFILE_QUALITY_SCORE = "user_profile_quality_score";
export const USER_BAN_REASON = "user_ban_reason";

export enum DiscoveryMode {
    general = "general",
    academic = "academic",
    sameInstitution = "sameInstitution",
    sameProfession = "sameProfession",
    similarGoals = "similarGoals",
    highlyCompatible = "highlyCompatible",
    seriousRelationships = "seriousRelationships"
}

// User Setting map - fields
export const USER_MIN_AGE = "user_min_age";
export const USER_MAX_AGE = "user_max_age";
export const USER_MAX_DISTANCE = "user_max_distance";
export const USER_SHOW_ME = "user_show_me";

// Messages and Conversations
export const MESSAGE_TEXT = "message_text";
export const MESSAGE_TYPE = "message_type";
export const MESSAGE_IMG_LINK = "message_img_link";
export const MESSAGE_READ = "message_read";
export const LAST_MESSAGE = "last_message";

// Notifications
export const N_SENDER_ID = "n_sender_id";
export const N_SENDER_FULLNAME = "n_sender_fullname";
export const N_SENDER_PHOTO_LINK = "n_sender_photo_link";
export const N_RECEIVER_ID = "n_receiver_id";
export const N_TYPE = "n_type";
export const N_MESSAGE = "n_message";
export const N_READ = "n_read";

// Likes, Dislikes, Visits, Blocks
export const LIKED_USER_ID = 'liked_user_id';
export const LIKED_BY_USER_ID = 'liked_by_user_id';
export const LIKE_TYPE = 'like_type';
export const DISLIKED_USER_ID = 'disliked_user_id';
export const DISLIKED_BY_USER_ID = 'disliked_by_user_id';
export const VISITED_USER_ID = 'visited_user_id';
export const VISITED_BY_USER_ID = 'visited_by_user_id';
export const BLOCKED_USER_ID = 'blocked_user_id';
export const BLOCKED_BY_USER_ID = 'blocked_by_user_id';

export const TIMESTAMP = "timestamp";
