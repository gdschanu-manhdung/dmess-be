export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export enum ConversationType {
    GROUP = 'GROUP',
    PRIVATE = 'PRIVATE',
    OTHER = 'OTHER',
}

export enum ReactionType {
    LOVE = 'LOVE',
    LAUGH = 'LAUGH',
    SAD = 'SAD',
    CARE = 'CARE',
    ANGRY = 'ANGRY',
    SURPRISE = 'SURPRISE',
    LIKE = 'LIKE',
    OTHER = 'OTHER',
}

export enum FriendsStatus {
    NONE = 'NONE',
    SENT = 'SENT',
    FRIENDS = 'FRIENDS',
    OTHER = 'OTHER',
}

export enum Services {
    USERS = 'USERS_SERVICE',
    AUTH = 'AUTH_SERVICE',
    CONVERSATIONS = 'CONVERSATIONS_SERVICE',
    MEMBERS = 'MEMBERS_SERVICE',
    FRIENDS = 'FRIENDS_SERVICE',
    MESSAGES = 'MESSAGES_SERVICE',
    REACTIONS = 'REACTIONS_SERVICE',
}

export enum Routes {
    AUTH = 'auth',
    USERS = 'users',
    CONVERSATIONS = 'conversations',
    MEMBERS = 'members',
    FRIENDS = 'friends',
    MESSAGES = 'messages',
    REACTIONS = 'reactions',
}
