import { Test } from '@nestjs/testing';
import { WsChatGateWay } from './ws-chat.gateway';
import { INestApplication } from '@nestjs/common';
// import { Socket, io } from 'ws';
// import { WsChatService } from './ws-chat.service';
import { WsAdapter } from '@nestjs/platform-ws'; //여기!!
import { WsChatModule } from './ws-chat.module';
import * as WebSocket from 'ws';

async function createNestApp(...gateways: any): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    // providers: [gateways],
    imports: [WsChatModule],
  }).compile();

  const app = testingModule.createNestApplication();
  app.useWebSocketAdapter(new WsAdapter(app) as any);

  return app;
}

describe('WsChatGateway (WsAdapter)', () => {
  let gateway: WsChatGateWay;
  let app: INestApplication;
  let ws;
  // let ioClient: Socket;

  beforeEach(async () => {
    app = await createNestApp(WsChatGateWay);
    gateway = app.get<WsChatGateWay>(WsChatGateWay);

    // ws = new WebSocket('ws://localhost:3031');

    // await new Promise(resolve => ws.on('open', resolve));

    app.listen(3011);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it(`should handle message (2nd port)`, async () => {
    ws = new WebSocket('ws://localhost:3031');

    await new Promise((resolve) => ws.on('open', resolve));

    ws.send(
      JSON.stringify({
        event: 'ws-chat',
        data: {
          test: 'test',
        },
      }),
    );
  });

  // it('should emit "pong" on "ping"', async () => {
  //   ioClient.connect();
  //   ioClient.emit('ping', 'Hello world!');
  //   await new Promise<void>((resolve) => {
  //     ioClient.on('connect', () => {
  //       console.log('connected');
  //     });
  //     ioClient.on('pong', (data) => {
  //       expect(data).toBe('Hello world!');
  //       console.log(`recv: ${data}`);
  //       resolve();
  //     });
  //   });
  //   ioClient.disconnect();
  // });

  //   it('should emit "chat message"', async () => {
  //     ioClient.connect();
  //     ioClient.emit('chat', 'hi message...');
  //     await new Promise<void>((resolve) => {
  //       ioClient.on('connect', () => {
  //         console.log('connected');
  //       });

  //       ioClient.on('chat', (data) => {
  //         expect(data).toBe('hi message...');
  //         console.log(`recv: ${data}`);
  //         resolve();
  //       });
  //     });
  //     ioClient.disconnect();
  //   });
});
