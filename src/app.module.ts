import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { DatabaseModule } from "./database/database.module"
import { JwtModule } from "@nestjs/jwt"
import { ConversationsModule } from "./conversations/conversations.module"
import { MembersModule } from "./members/members.module"
import { FriendsModule } from "./friends/friends.module"

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
        AuthModule,
        UsersModule,
        ConversationsModule,
        MembersModule,
        FriendsModule,
        DatabaseModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            entities: ["dist/database/typeorm/entities/*.js"],
            synchronize: true,
            ssl: {
                rejectUnauthorized: false,
            },
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: "2d",
            },
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
