import { Conversation } from "src/database/typeorm/entities/Conversation"
import { ConversationDetails, FindConversationQuery } from "src/utils/types"
import { CreateConversationDto } from "./dto/CreateConversation.dto"

export interface IConversationsService {
    createGroupConversation(
        createConversationDto: CreateConversationDto,
    ): Promise<Conversation>
    findConversationById(
        findConversationQuery: FindConversationQuery,
    ): Promise<Conversation>
}
