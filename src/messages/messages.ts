import { Message } from 'src/database/typeorm/entities/message'
import { SendMessageDto } from './dto/SendMessage.dto'

export interface IMessagesService {
    createMessage(sendMessageDto: SendMessageDto): Promise<Message>
    findMessageId(messageId: number): Promise<Message>
}
