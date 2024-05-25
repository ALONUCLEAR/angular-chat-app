import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WsCheckerComponent } from './components/ws-checker/ws-checker.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatBubbleComponent } from './components/chat/chat-bubble/chat-bubble.component';

@NgModule({
  declarations: [
    AppComponent,
    WsCheckerComponent,
    ChatComponent,
    ChatBubbleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}