import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('jwt-refresh') {}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
