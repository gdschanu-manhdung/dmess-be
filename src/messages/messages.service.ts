import { IMessagesService } from './messages'
import { Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IMembersService } from 'src/members/members'
import { Repository } from 'typeorm'
import { Message } from 'src/database/typeorm/entities/message'
import { MessageDetails } from 'src/utils/types'
import { SendMessageDto } from './dto/SendMessage.dto'
import { Services } from 'src/utils/constants'
import { ConversationsService } from 'src/conversations/conversations.service'
import { MembersService } from 'src/members/members.service'

export class MessagesService implements IMessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @Inject(Services.CONVERSATIONS)
        private readonly conversationsService: ConversationsService,
        @Inject(Services.MEMBERS)
        private readonly membersService: MembersService,
    ) {}
    async sendMessage(sendMessageDto: SendMessageDto) {
        const member = await this.membersService.findMemberById(
            sendMessageDto.memberId,
        )
        const conversation =
            await this.conversationsService.findConversationById({
                conversationId: sendMessageDto.conversationId,
            })

        const messageDetails = {
            member,
            conversation,
            reactions: [],
            time: sendMessageDto.time,
            content: sendMessageDto.content,
        } as MessageDetails

        try {
            const message = this.messageRepository.create(messageDetails)
            return await this.messageRepository.save(message)
        } catch (error) {
            console.error(error)
        }
    }

    async findMessageId(messageId: number) {
        try {
            const message = this.messageRepository.findOne({
                where: { id: messageId },
            })

            return message
        } catch (error) {
            console.error(error)
        }
    }

    async unsendMessage(messageId: number) {
        try {
            const message = (await this.messageRepository.findOne({
                where: {
                    id: messageId,
                },
            })) as MessageDetails

            message.content = ''

            return await this.messageRepository.save(message)
        } catch (error) {
            console.error(error)
        }
    }
}
