import { Reaction } from 'src/database/typeorm/entities/reaction'
import { RemoveReactionDto } from './dto/RemoveReaction.dto'
import { SendReactionDto } from './dto/sendReaction.dto'

export interface IReactionsService {
    sendReaction(sendReactionDto: SendReactionDto): Promise<Reaction>
    removeReaction(removeReactionDto: RemoveReactionDto): Promise<void>
}
