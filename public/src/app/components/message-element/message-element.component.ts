import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../domain/message.model";

@Component({
  selector: 'app-message-element',
  templateUrl: './message-element.component.html',
  styleUrls: ['./message-element.component.scss']
})
export class MessageElementComponent implements OnInit {

  @Input()
  message: Message;

  dateMessage: Date;

  constructor() { }

  ngOnInit() {
    this.dateMessage = new Date(this.message.timestamp);
  }

}
