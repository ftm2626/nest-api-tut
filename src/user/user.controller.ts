import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";

@Controller("users")
export class UserController {
  @UseGuards(JwtGuard)
  @Get("me")
  getMe(@GetUser() req) {
    return req.user;
  }
}
