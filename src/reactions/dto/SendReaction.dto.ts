import { ReactionType } from 'src/utils/constants'

export class SendReactionDto {
    reactionType: ReactionType
    messageId: number
    memberId: number
}
