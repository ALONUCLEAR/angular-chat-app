import { Component, OnInit } from '@angular/core';
import { webSocketService } from 'src/app/services/web-socket.service';
import { v4 as uuidV4 } from 'uuid';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
})
export class ChatComponent implements OnInit {
  username = '';
  msg = '';
  userId: string = '';
  constructor(public readonly wsService: webSocketService) {}

  ngOnInit(): void {
    // only using sessionStorage instead of localstorage cause I want to be able to just open multiple tabs and become multiple user
    this.userId = sessionStorage.getItem('userId') ?? uuidV4();
    this.username = sessionStorage.getItem('username') ?? '';
    sessionStorage.setItem('userId', this.userId);
    this.initializeSocketConnection();
  }

  ngOnDestroy(): void {
    this.disconnectSocket();
  }

  send(): void {
    if (this.username.length < 1) {
      alert('Please enter a username to send the message');
      return;
    } else if (this.username.includes(';')) {
      alert("Invalid username: Character ';' is not allowed!");
      return;
    }

    if (this.msg.length < 1) {
      alert('Message too short!');
      return;
    } else if (this.msg.includes(';')) {
      alert("Invalid message: Character ';' is not allowed!");
      return;
    }

    this.wsService.sendMessage(`${this.userId};${this.username};${this.msg}`);
    this.msg = "";
    sessionStorage.setItem('username', this.username);
  }

  private initializeSocketConnection(): void {
    this.wsService.openConnection();
  }

  private disconnectSocket(): void {
    this.wsService.closeConnection();
  }
}