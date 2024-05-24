import { Injectable } from '@angular/core';

export interface WsService {
  recievedMessages: string[];
  statusString: string;
  openConnection(): void;
  sendMessage(message: string): void;
  closeConnection(): void;
}

@Injectable({
  providedIn: 'root',
})
export class webSocketService implements WsService {
  private readonly PORT: number = 1234;
  private webSocket: WebSocket;
  public recievedMessages: string[] = [];
  public statusString = this.getStatus(-1);

  constructor() {
    // give it a default url that doesn't work so that it doesn't create two ws connections
    this.webSocket = new WebSocket(`wss://localhost:${this.PORT}`);
  }

  private getStatus(stateNum: number): string {
    switch (stateNum) {
      case 0:
        return 'CONNECTING';
      case 1:
        return 'OPEN';
      case 2:
        return 'CLOSING';
      case 3:
        return 'CLOSED';
      default:
        return 'INVALID-STATUS';
    }
  }

  openConnection(): void {
    this.webSocket = new WebSocket(`wss://localhost:${this.PORT}/ws`);

    this.webSocket.onopen = (e) => {
      console.log('WebSocket has opened!');
      console.log(e);
      this.statusString = this.getStatus(this.webSocket.readyState);
    };

    this.webSocket.onmessage = (e) => {
      console.log(e);
      this.recievedMessages.push(e.data);
      this.statusString = this.getStatus(this.webSocket.readyState);
    };

    this.webSocket.onclose = (e) => {
      console.log('WebSocket closing!');
      console.log(e);
      this.statusString = this.getStatus(this.webSocket.readyState);
    };
  }

  sendMessage(message: string): void {
    this.webSocket.send(message);
  }

  closeConnection(): void {
    this.webSocket.close();
  }
}