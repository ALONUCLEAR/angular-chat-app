import { Component, OnDestroy, OnInit } from '@angular/core';
import { webSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'ws-checker',
  templateUrl: './ws-checker.component.html',
  styleUrls: ['./ws-checker.component.less'],
})
export class WsCheckerComponent implements OnInit, OnDestroy {
  msg = '';

  constructor(public readonly webSocketService: webSocketService) {}

  ngOnInit(): void {
    this.initializeSocketConnection();
  }

  ngOnDestroy(): void {
    this.disconnectSocket();
  }
  send(): void {
    this.webSocketService.sendMessage(this.msg);
    this.msg = '';
  }

  reconnect(): void {
    this.disconnectSocket();
    this.initializeSocketConnection();
  }

  private initializeSocketConnection(): void {
    this.webSocketService.openConnection();
  }

  private disconnectSocket(): void {
    this.webSocketService.closeConnection();
  }
}