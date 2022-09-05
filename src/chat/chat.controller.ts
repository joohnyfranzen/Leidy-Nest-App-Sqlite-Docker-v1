import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ChatService } from './chat.service';
import { ChatDto } from './dto';

@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createMessage(
        @Body() dto: ChatDto,
        @GetUser('id') userId: number
    ) {
        return this.chatService.createMessage(userId, dto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    showMessages(
        @GetUser() userId,
        @Query() query
        ) {
        
        return this.chatService.showMessages(userId.id, query);
    }
}
