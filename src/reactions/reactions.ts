import { Reaction } from 'src/database/typeorm/entities/reaction'
import { SendReactionDto } from './dto/sendReaction.dto'

export interface IReactionsService {
    sendReaction(sendReactionDto: SendReactionDto): Promise<Reaction>
}
