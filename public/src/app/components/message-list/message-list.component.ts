import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../domain/message.model";
import {User} from "../../domain/user.model";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  @Input()
  messages: Message;

  @Input()
  buyer: User;

  @Input()
  seller: User;

  constructor() { }

  ngOnInit() {
  }
}
