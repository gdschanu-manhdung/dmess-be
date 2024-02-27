import { Controller, Inject, Post, Body, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/auth/utils/guard.auth"
import { Routes, Services } from "src/utils/constants"
import { AddMemberDto } from "./dto/AddMember.dto"
import { CreateMembersDto } from "./dto/CreateMembers.dto"
import { MembersService } from "./members.service"

@Controller(Routes.MEMBERS)
export class MembersController {
    constructor(
        @Inject(Services.MEMBERS) private membersService: MembersService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post("createMembers")
    async createMembers(@Body() createMembersDto: CreateMembersDto) {
        this.membersService.createMembers(createMembersDto)
    }

    @UseGuards(JwtAuthGuard)
    @Post("addMember")
    async addMember(@Body() addMemberDto: AddMemberDto) {
        this.membersService.addMember(addMemberDto)
    }
}
