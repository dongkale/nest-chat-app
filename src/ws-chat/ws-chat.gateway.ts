import { Logger } from '@nestjs/common';
import {
  MessageBody,
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayInit,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'ws';

// import { Client } from '@nestjs/platform-ws';

import { WsChatService } from './ws-chat.service';

@WebSocketGateway(3031, {
  cors: {
    origin: '*',
  },
  path: '',
  transports: ['websocket'],
})
export class WsChatGateWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WsChatGateWay.name);

  private clients: Socket[] = [];

  // private wsClients: Array<any> = [];
  @WebSocketServer()
  private server: Server;

  constructor(private wsSocketService: WsChatService) {}

  afterInit(server: Server) {
    this.clients = [];
    this.server = server;
    this.logger.log('websocket server start');

    // server.on('ws-chat', (ws) => {
    //   this.logger.log(`Server: Connect ${JSON.stringify(ws, null, 2)}}`);
    // });

    this.logger.log(`Server: ${JSON.stringify(this.server, null, 2)}`);

    // this.server.on('ws-chat', (data: any) => {
    //   try {
    //     data = JSON.parse(data);
    //   } catch (e) {
    //     this.server.send(
    //       JSON.stringify({
    //         id: -1,
    //         jsonrpc: '2.0',
    //         error: {
    //           code: -1,
    //           message: e.message,
    //         },
    //       }),
    //     );
    //     return;
    //   }

    //   this.server.send(
    //     JSON.stringify({
    //       id: data.id,
    //       jsonrpc: '2.0',
    //       result: data,
    //     }),
    //   );
    // });

    // server.on('connection', (ws) => {
    //   ws.on('ws-chat', (data: any) => {
    //     try {
    //       data = JSON.parse(data);
    //     } catch (e) {
    //       ws.send(
    //         JSON.stringify({
    //           id: -1,
    //           jsonrpc: '2.0',
    //           error: {
    //             code: -1,
    //             message: e.message,
    //           },
    //         }),
    //       );
    //       return;
    //     }

    //     ws.send(
    //       JSON.stringify({
    //         id: data.id,
    //         jsonrpc: '2.0',
    //         result: data,
    //       }),
    //     );
    //   });
    // });
  }

  handleConnection(client: Socket) {
    client.id = `id-${Date.now()}`;

    if (this.notHasClientId(this.clients, client.id)) {
      this.clients.push(client);
    }

    // client.on('ws-chat', (ws) => {
    //   this.logger.log(`ws-chat: ${JSON.stringify(ws, null, 2)}}`);
    // });

    this.logger.log(`Server: ${JSON.stringify(this.server, null, 2)}`);
  }

  handleDisconnect(client: Socket) {
    this.clients = this.removeById(this.clients, client.id);

    this.logger.log(`Server: ${JSON.stringify(this.server, null, 2)}`);
  }

  private removeById(fromClients: Socket[], id: string) {
    const result = fromClients.findIndex((client) => {
      return client.id === id;
    });
    if (result >= 0) {
      fromClients.splice(result, 1);
    }
    return fromClients;
  }

  private notHasClientId(fromClients: Socket[], id: string): boolean {
    const result = fromClients.findIndex((client) => {
      return client.id === id;
    });
    if (result >= 0) {
      return false;
    }
    return true;
  }

  @SubscribeMessage('ws-chat')
  async handleMessageEvent(client: any, message: any): Promise<void> {
    try {
      for (const item of this.clients) {
        //item.send(JSON.stringify({ result: 'succ', ...message }));
        item.send(message);
        this.logger.log(`Client[${item.id}]: [${message}]`);
      }
    } catch (e) {
      this.logger.error(`Exception: ${e}`);
    }
  }

  @SubscribeMessage('ping')
  handlePingEvent(client: any, message: any): Promise<void> {
    return client.send(message);
  }

  // ---

  // afterInit(): void {
  //   this.logger.log('Initialized');
  // }

  // async handleConnection(client: any, ...args: any[]) {
  //   try {
  //     for (const item of args) {
  //       this.logger.log(item?.url);
  //     }

  //     const clientIndex = this.wsSocketService.addClient(client);

  //     this.logger.log(
  //       `Client[${clientIndex}] Connected, Count: (${this.wsSocketService.getCount()})`,
  //     );

  //     this.logger.log(`Connect: ${client._socket.remoteAddress}`);

  //     // this.logger.log(`Connect: ${JSON.stringify(client, null, 2)}`);
  //   } catch (e) {
  //     this.logger.error(`Exception: ${e}`);
  //   }
  // }

  // async handleDisconnect(client: any) {
  //   try {
  //     const clientIndex = this.wsSocketService.deleteClient(client);

  //     this.logger.log(
  //       `Client[${clientIndex}] Disconnected, Count: (${this.wsSocketService.getCount()})`,
  //     );
  //   } catch (e) {
  //     this.logger.error(`Exception: ${e}`);
  //   }
  // }

  // @SubscribeMessage('ws-chat') //1. 정의한 키값이 존재한 메시지가 도착하면,
  // async handleMessageEvent(client: any, message: any): Promise<void> {
  //   try {
  //     // this.logger.log(`Recv: ${JSON.stringify(client, null, 2)}`);

  //     const clientIndex = this.wsSocketService.getIndex(client);

  //     this.logger.log(`Client[${clientIndex}] Reved, message: ${message}`);

  //     // const sendCount = this.wsSocketService.broadcast(
  //     //   client,
  //     //   message,
  //     //   false,
  //     // );
  //     const sendCount = this.wsSocketService.funcBroadcast(
  //       message,
  //       (_i, c, m) => {
  //         // if (c === client) {
  //         //   return true;
  //         // }

  //         c.send(m);

  //         return true;
  //       },
  //     );

  //     this.logger.log(`Client Broadcast, Count: ${sendCount}`);
  //   } catch (e) {
  //     this.logger.error(`Exception: ${e}`);
  //   }
  // }

  // ---

  // async handleConnection(client: any, ...args: any[]) {
  //   try {
  //     this.wsClients.push(client);

  //     for (const item of args) {
  //       console.log(item?.url);
  //     }

  //     const findValue = this.wsClients.findIndex((item) => item === client);

  //     this.logger.log(`Client: ${findValue} connected`);
  //     this.logger.debug(
  //       `Number of connected clients: ${this.wsClients.length}`,
  //     );

  //     this.logger.log(`Connect: ${JSON.stringify(client, null, 2)}`);
  //   } catch (e) {
  //     this.logger.error(`Exception: ${e}`);
  //   }
  // }

  // async handleDisconnect(client: any) {
  //   try {
  //     const findValue = this.wsClients.findIndex((item) => item === client);
  //     if (findValue > -1) {
  //       this.wsClients.splice(findValue, 1);
  //     }

  //     this.logger.log(`Client: ${findValue} disconnected`);
  //     this.logger.debug(
  //       `Number of connected clients: ${this.wsClients.length}`,
  //     );
  //   } catch (e) {
  //     this.logger.error(`Exception: ${e}`);
  //   }
  // }

  // // -- 메시지에 event라는 항목이 필수로 존재해야 합니다.
  // // {
  // //    "event": "정의한키",
  // //    "data": "데이터"
  // // }

  // @SubscribeMessage('ws-chat') //1. 정의한 키값이 존재한 메시지가 도착하면,
  // async handleMessageEvent(client: any, message: any): Promise<void> {
  //   try {
  //     this.logger.log(`Recv: ${JSON.stringify(client, null, 2)}`);

  //     const findValue = this.wsClients.findIndex((item) => item === client);
  //     this.logger.log(`Message received from client: ${findValue}`);

  //     for (const item of this.wsClients) {
  //       //item.send(JSON.stringify({ result: 'succ', ...message }));
  //       item.send(message);
  //     }
  //   } catch (e) {
  //     this.logger.error(`Exception: ${e}`);
  //   }
  // }

  // @SubscribeMessage('ping')
  // async handlePingPong(client: any, message: any): Promise<void> {
  //   client.send(message);
  //   // return {
  //   //   event: 'pong',
  //   //   data,
  //   // };
  // }
}
