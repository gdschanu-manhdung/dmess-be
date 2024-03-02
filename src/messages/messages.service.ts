import { IMessagesService } from "./messages"
import { Inject } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { IMembersService } from "src/members/members"
import { Repository } from "typeorm"
import { Message } from "src/database/typeorm/entities/message"
import { MessagesDetails } from "src/utils/types"
import { SendMessageDto } from "./dto/SendMessage.dto"
import { Services } from "src/utils/constants"
import { ConversationsService } from "src/conversations/conversations.service"
import { MembersService } from "src/members/members.service"

export class MessagesService implements IMessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @Inject(Services.CONVERSATIONS)
        private readonly conversationsService: ConversationsService,
        @Inject(Services.MEMBERS)
        private readonly membersService: MembersService,
    ) {}
    async createMessage(sendMessageDto: SendMessageDto) {
        const member = await this.membersService.findMemberById(
            sendMessageDto.memberId,
        )
        const conversation =
            await this.conversationsService.findConversationById({
                conversationId: sendMessageDto.conversationId,
            })

        const messagesDetails = {
            member,
            conversation,
            reactions: [],
            time: sendMessageDto.time,
            content: sendMessageDto.content,
        } as MessagesDetails

        try {
            const message = this.messageRepository.create(messagesDetails)
            return await this.messageRepository.save(message)
        } catch (error) {
            console.error(error)
        }
    }
}
