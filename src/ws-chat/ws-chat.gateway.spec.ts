import { Test } from '@nestjs/testing';
import { WsChatGateWay } from './ws-chat.gateway';
import { INestApplication } from '@nestjs/common';
import { Socket, io } from 'socket.io-client';

async function createNestApp(...gateways: any): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile();
  return testingModule.createNestApplication();
}

describe('ChatGateway', () => {
  let gateway: WsChatGateWay;
  let app: INestApplication;
  let ioClient: Socket;

  beforeEach(async () => {
    app = await createNestApp(WsChatGateWay);
    gateway = app.get<WsChatGateWay>(WsChatGateWay);
    ioClient = io('ws://localhost:3031', {
      autoConnect: true,
      transports: ['websocket', 'polling'],
    });

    app.listen(3010);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should emit "pong" on "ping"', async () => {
    ioClient.connect();
    ioClient.emit('ping', 'Hello world!');
    await new Promise<void>((resolve) => {
      ioClient.on('connect', () => {
        console.log('connected');
      });
      ioClient.on('pong', (data) => {
        expect(data).toBe('Hello world!');
        console.log(`recv: ${data}`);
        resolve();
      });
    });
    ioClient.disconnect();
  });

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
