import { Injectable, Inject } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Services } from "src/utils/constants"
import { AuthService } from "../auth.service"
import { Strategy as localStrategy } from "passport-local"
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { JwtPayload } from "src/utils/types"

@Injectable()
export class LocalStrategy extends PassportStrategy(localStrategy) {
    constructor(
        @Inject(Services.AUTH) private readonly authService: AuthService,
    ) {
        super({
            usernameField: "email",
        })
    }

    async validate(email: string, password: string) {
        return this.authService.validateUser({ email, password })
    }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(jwtStrategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET"),
        })
    }

    async validate(payload: JwtPayload) {
        return { id: payload.sub, email: payload.email }
    }
}

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
    jwtStrategy,
    "jwt-refresh",
) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET"),
        })
    }

    async validate(payload: JwtPayload) {
        console.log("Extract token: ", ExtractJwt.fromBodyField("refresh"))
        return { id: payload.sub, email: payload.email }
    }
}
