import { Conversation } from "src/database/typeorm/entities/Conversation"
import { CreateConversationDto } from "./dto/CreateConversation.dto"

export interface IConversationsService {
    createGroupConversation(
        createConversationDto: CreateConversationDto,
    ): Promise<Conversation>
}
