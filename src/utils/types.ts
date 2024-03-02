import { Conversation } from "src/database/typeorm/entities/conversation"
import { Member } from "src/database/typeorm/entities/member"
import { Reaction } from "src/database/typeorm/entities/reaction"
import { ConversationType, FriendsStatus, Gender } from "./constants"

export type ValidateUserDetails = {
    id?: number
    email: string
    password: string
}

export type UserDetails = {
    id?: number
    name?: string
    email?: string
    password?: string
    avatarLink?: string
    phone?: string
    dob?: string
    gender?: Gender
}

export type FindUserQueryByEmail = {
    email?: string
}

export type FindUserQuery = {
    email?: string
    name?: string
    phone?: string
}

export type JwtPayload = {
    email: string
    sub: number
}

export type ConversationDetails = {
    id?: number
    name?: string
    type?: ConversationType
    hostId?: number
    memberIds?: number[]
    theme?: string
}

export type FindConversationQuery = {
    conversationId?: number
}

export type MembersForConversation = {
    memberIds: number[]
    conversationId: number
}

export type MemberToConversation = {
    memberId: number
    conversationId: number
}

export type FriendsDetails = {
    id?: number
    fromUserId?: number
    toUserId?: number
    status?: FriendsStatus
}

export type FriendsRequestQuery = {
    fromUserId?: number
    toUserId?: number
    status?: FriendsStatus
}

export type MessagesDetails = {
    id?: number
    member?: Member
    content?: string
    time?: string
    conversation?: Conversation
    reactions?: Reaction[]
}
