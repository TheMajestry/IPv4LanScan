import * as net from 'net';
import { performance } from 'perf_hooks';

const readlineSync = require('readline-sync');

const IPGw: string = readlineSync.question('Enter the InternetProtocol Default Gateway : ');
const IPGw1: string[] = IPGw.split('.');
const Dot: string = '.';
const IPGw2: string = IPGw1[0] + Dot + IPGw1[1] + Dot + IPGw1[2] + Dot;
const Start: number = parseInt(readlineSync.question('Enter The Start Point : '));
const End: number = parseInt(readlineSync.question('Enter The Last Point : '));

const Scanner = (addr: string): Promise<number> => {
  return new Promise((resolve) => {
    const computer = new net.Socket();
    computer.setTimeout(1000);

    computer.connect(135, addr, () => {
      computer.destroy();
      resolve(1);
    });

    computer.on('error', () => {
      computer.destroy();
      resolve(0);
    });
  });
};

const Start1 = async (): Promise<void> => {
  for (let ip = Start; ip <= End; ip++) {
    const addr = IPGw2 + ip.toString();
    const result = await Scanner(addr);
    if (result === 1) {
      console.log(`Internet Protocol Address: ${addr} Online`);
    } else {
      console.log(`Internet Protocol Address: ${addr} Offline`);
    }
  }
};

const Time1 = performance.now();
Start1().then(() => {
  const Time2 = performance.now();
  const Total = Time2 - Time1;
  console.log(`Scan done in : ${Total} <3 `);
});
