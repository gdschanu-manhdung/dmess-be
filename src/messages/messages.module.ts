import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConversationsModule } from "src/conversations/conversations.module"
import { Message } from "src/database/typeorm/entities/message"
import { MembersModule } from "src/members/members.module"
import { Services } from "src/utils/constants"
import { MessagesController } from "./messages.controller"
import { MessagesService } from "./messages.service"

@Module({
    imports: [
        MembersModule,
        ConversationsModule,
        TypeOrmModule.forFeature([Message]),
    ],
    controllers: [MessagesController],
    providers: [
        {
            provide: Services.MESSAGES,
            useClass: MessagesService,
        },
    ],
    exports: [
        {
            provide: Services.MESSAGES,
            useClass: MessagesService,
        },
    ],
})
export class MessagesModule {}
