import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('user')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() dto: AuthDto) {
        return this.authService.register(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto);
    }
}