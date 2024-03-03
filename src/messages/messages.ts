import { Message } from 'src/database/typeorm/entities/message'
import { MessageDetails } from 'src/utils/types'
import { SendMessageDto } from './dto/SendMessage.dto'

export interface IMessagesService {
    sendMessage(sendMessageDto: SendMessageDto): Promise<Message>
    findMessageId(messageId: number): Promise<Message>
    unsendMessage(messageId: number): Promise<Message>
}
