import { Component, Input } from '@angular/core';
import { Message } from 'src/app/types/message';

@Component({
  selector: 'chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.less']
})
export class ChatBubbleComponent {
  @Input() currentUserId?: string;
  @Input() message?: Message;
  @Input() userColor = 'green';
  @Input() otherColor = 'gray';
}