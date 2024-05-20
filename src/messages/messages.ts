import { Message } from 'src/database/typeorm/entities/Message'
import { SendMessageDto } from './dto/SendMessage.dto'

export interface IMessagesService {
    sendMessage(sendMessageDto: SendMessageDto): Promise<Message>
    findMessageId(messageId: number): Promise<Message>
    unsendMessage(messageId: number): Promise<Message>
}
