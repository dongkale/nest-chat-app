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
})
export class WebsocketHandler
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private wsClients: Array<any> = [];

  afterInit(): void {
    console.log('준비완료');
  }

  //OnGatewayConnection를 오버라이딩
  //1. 사용자가 처음으로 접속하면
  async handleConnection(client: any, ...args: any[]) {
    this.wsClients.push(client); //2. 배열에 사용자를 담아줍니다.
    for (const item of args) {
      console.log(item?.url); //여기에 query가 있습니다.
    }
  }

  //OnGatewayDisconnect를 오버라이딩
  //1. 사용자가 종료하면
  async handleDisconnect(client: any) {
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        //2. 배열을 뒤져서 해당 데이터를 제거 합니다.
        this.wsClients.splice(i, 1);
        break;
      }
    }
  }

  /* 메시지에 event라는 항목이 필수로 존재해야 합니다. 
  { 
    "event": "정의한키",
    "data": "데이터"
    }
  */
  @SubscribeMessage('정의한키') //1. 정의한 키값이 존재한 메시지가 도착하면,
  handleEvent(client, message: any): void {
    for (let c of this.wsClients) {
      //2. 배열에서 클라이언트 객체를 가져와 정의한 행동을 합니다.
      c.send(JSON.stringify({ result: 'succ', ...message }));
    }
  }
}
