import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway(3031, {
  cors: {
    origin: '*',
  },
  path: '',
  transports: ['websocket'],
})
export class WsChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(WsChatGateWay.name);

  private wsClients: Array<any> = [];

  afterInit(): void {
    this.logger.log('Initialized');
  }

  async handleConnection(client: any, ...args: any[]) {
    try {
      this.wsClients.push(client);

      for (const item of args) {
        console.log(item?.url);
      }

      const findValue = this.wsClients.findIndex((item) => item === client);

      this.logger.log(`Client: ${findValue} connected`);
      this.logger.debug(
        `Number of connected clients: ${this.wsClients.length}`,
      );

      this.logger.log(`Connect: ${JSON.stringify(client)}`);
    } catch (e) {
      this.logger.error(`Exception: ${e}`);
    }
  }

  async handleDisconnect(client: any) {
    try {
      // this.logger.log(`Cliend id:${client} disconnected`);

      // for (let i = 0; i < this.wsClients.length; i++) {
      //   if (this.wsClients[i] === client) {
      //     this.wsClients.splice(i, 1);
      //     break;
      //   }
      // }

      const findValue = this.wsClients.findIndex((item) => item === client);
      if (findValue > -1) {
        this.wsClients.splice(findValue, 1);
      }

      this.logger.log(`Client: ${findValue} disconnected`);
      this.logger.debug(
        `Number of connected clients: ${this.wsClients.length}`,
      );
    } catch (e) {
      this.logger.error(`Exception: ${e}`);
    }
  }

  @SubscribeMessage('ping')
  async handlePingPong(client: any, message: any) {
    // this.logger.log(`Message received from client id: ${client.id}`);
    // this.logger.debug(`Payload: ${data}`);

    client.send(message);
    // client.send(JSON.stringify({ result: 'succ', ...data }));
    // return {
    //   event: 'pong',
    //   data,
    // };
  }

  /* 메시지에 event라는 항목이 필수로 존재해야 합니다. 
  { 
    "event": "정의한키",
    "data": "데이터"
    }
  */
  @SubscribeMessage('ws-chat') //1. 정의한 키값이 존재한 메시지가 도착하면,
  async handleMessageEvent(client, message: any): Promise<void> {
    try {
      this.logger.log(`Recv: ${JSON.stringify(client)}`);

      const findValue = this.wsClients.findIndex((item) => item === client);
      this.logger.log(`Message received from client: ${findValue}`);

      for (const item of this.wsClients) {
        //2. 배열에서 클라이언트 객체를 가져와 정의한 행동을 합니다.
        //item.send(JSON.stringify({ result: 'succ', ...message }));
        item.send(message);
      }
    } catch (e) {
      this.logger.error(`Exception: ${e}`);
    }
  }
}
