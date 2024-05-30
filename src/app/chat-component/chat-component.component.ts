import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponentComponent implements OnInit {
  messages: string[] = [];
  pusher: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('Initializing Pusher...');
    this.websocket();
    // this.pusher = new Pusher('68d409d444f4762c6bbd', {
    //   cluster: 'eu',
    //   // encrypted: true
    // });

    // console.log('Subscribing to channel...');
    // const channel = this.pusher.subscribe('my-channel');
    // channel.bind('NuevoMensaje', (data: any) => {
    //   console.log('Received message:', data.message);
    //   this.messages.push(data.message);
    // });
  }

  websocket(): void {
    const echo = new Echo({
      broadcaster: 'pusher',
      cluster: 'eu',
      key: '68d409d444f4762c6bbd',
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      enabledTransports: ['ws', 'wss']

    });
    echo.channel('my-channel')
      .listen('NuevoMensaje', (resp: any) => {
        console.log('Mensaje recibido:', resp);
        // this.messages.push(resp.message);
      });
  }

  sendMessage(): void {
    console.log('Sending message...');
    this.http.post('http://127.0.0.1:8000/api/v1/send-message', {message: "Hola desde Angular 2"} , {headers:{'Content-Type': 'application/json'}} )
      .subscribe(
        (response: any) => {
          console.log('Message sent successfully:', response);
          this.messages.push(response.message)
          // Maneja la respuesta del servidor aquí
        },
        (error: any) => {
          console.error('Error sending message:', error);
          // Maneja el error aquí
        }
      );

  }
  handleServerResponse(): void {
    console.log('Handling server response...');
    // Realiza alguna acción con la respuesta del servidor
  }
}
