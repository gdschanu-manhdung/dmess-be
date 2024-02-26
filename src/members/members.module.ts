import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConversationsModule } from "src/conversations/conversations.module"
import { Member } from "src/database/typeorm/entities/member"
import { UsersModule } from "src/users/users.module"
import { Services } from "src/utils/constants"
import { MembersController } from "./members.controller"
import { MembersService } from "./members.service"

@Module({
    imports: [
        ConversationsModule,
        UsersModule,
        TypeOrmModule.forFeature([Member]),
    ],
    controllers: [MembersController],
    providers: [
        {
            provide: Services.MEMBERS,
            useClass: MembersService,
        },
    ],
    exports: [
        {
            provide: Services.MEMBERS,
            useClass: MembersService,
        },
    ],
})
export class MembersModule {}
