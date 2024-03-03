import { Conversation } from 'src/database/typeorm/entities/Conversation'
import { FindConversationQuery } from 'src/utils/types'
import { CreateConversationDto } from './dto/CreateConversation.dto'
import { CreatePrivateConversationDto } from './dto/CreatePrivateConversation.dto'

export interface IConversationsService {
    createGroupConversation(
        createConversationDto: CreateConversationDto,
    ): Promise<Conversation>
    findConversationById(
        findConversationQuery: FindConversationQuery,
    ): Promise<Conversation>
    createPrivateConversation(
        createPrivateConversationDto: CreatePrivateConversationDto,
    ): Promise<Conversation>
}
