import { Injectable } from '@angular/core';
import { Message } from '../types/message';

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
  private readonly route = "s://localhost:1234";
  private webSocket: WebSocket;
  public recievedMessages: string[] = [];
  public statusString = this.getStatus(-1);
  public lastMessagesArray: Message[] = [];

  constructor() {
    // give it a default url that doesn't work so that it doesn't create two ws connections
    this.webSocket = new WebSocket(this.getWsRoute());
  }

  private getWsRoute(extension = ''): string {
    return 'ws' + this.route + extension;
  }

  private getHttpRoute(extentsion = ''): string {
    return 'http' + this.route + extentsion;
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
    this.webSocket = new WebSocket(this.getWsRoute('/ws'));

    this.webSocket.onopen = async (e) => {
      console.log('WebSocket has opened!');
      console.log(e);
      this.statusString = this.getStatus(this.webSocket.readyState);
      await this.getExistingMessages();
    };

    this.webSocket.onmessage = (e) => {
      console.log(e);
      const message: string = e.data;
      this.recievedMessages.push(message);
      this.statusString = this.getStatus(this.webSocket.readyState);

      if (message.startsWith('[')) {
        // if it doesn't start as an array, than it's just an echoed message
        this.lastMessagesArray = JSON.parse(message);
      }
    };

    this.webSocket.onclose = (e) => {
      console.log('WebSocket closing!');
      console.log(e);
      this.statusString = this.getStatus(this.webSocket.readyState);
      this.lastMessagesArray = [];
    };
  }

  private async getExistingMessages(): Promise<void> {
    const res = await fetch(this.getHttpRoute(`/messages`));

    try {
      const messages: Message[] = await res.json();
      this.lastMessagesArray = messages;
    } catch (e) {
      console.error('Something went wrong when getting existing messages - ', e);
    }
  }

  sendMessage(message: string): void {
    this.webSocket.send(message);
  }

  closeConnection(): void {
    this.webSocket.close();
  }
}