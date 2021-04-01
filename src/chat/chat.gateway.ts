import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

// @WebSocketGateway({ namespace: 'chat' })
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  logger = new Logger('ChatGateway');
  onlineUsers = new Set();
  user: any;

  @WebSocketServer()
  wss: Server;

  constructor(private jwtService: JwtService) {}

  handleConnection(socket: Socket, ...args: any[]) {
    this.logger.log(socket.handshake.query);
    const user = this.getUser(socket);
    if (!user) {
      socket.disconnect();
      this.logger.error('authentication failed ' + socket.id);
      return;
    }
    this.logger.warn(user);
    this.logger.warn(
      'authentication success! ' + user.username + ' - id:' + user.id,
    );
    // this.onlineUsers.add(user.id);
    // this.dispatchUsersOnline();
  }

  handleDisconnect(socket: Socket) {
    // const user: any = this.getUser(socket);
    // this.onlineUsers.delete(user.id);
    this.logger.warn('user disconnected ');
    // this.logger.warn('user disconnected ' + user.username + ' - id:' + user.id);
    // this.dispatchUsersOnline();
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.logger.log(payload);
    return payload;
  }

  private dispatchUsersOnline() {
    this.logger.log(Array.from(this.onlineUsers));
    this.wss.emit('users/online', Array.from(this.onlineUsers));
  }

  private getUser(socket: Socket): any {
    const token = socket.handshake.query.token as string;
    return this.jwtService.decode(token);
  }
}