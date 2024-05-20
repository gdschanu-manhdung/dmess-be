import { Reaction } from 'src/database/typeorm/entities/Reaction'
import { RemoveReactionDto } from './dto/RemoveReaction.dto'
import { SendReactionDto } from './dto/SendReaction.dto'

export interface IReactionsService {
    sendReaction(sendReactionDto: SendReactionDto): Promise<Reaction>
    removeReaction(removeReactionDto: RemoveReactionDto): Promise<void>
}
