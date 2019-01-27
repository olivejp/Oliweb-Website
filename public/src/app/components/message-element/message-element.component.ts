import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../domain/message.model";
import {User} from "../../domain/user.model";

@Component({
  selector: 'app-message-element',
  templateUrl: './message-element.component.html',
  styleUrls: ['./message-element.component.scss']
})
export class MessageElementComponent implements OnInit {

  @Input()
  buyer: User;

  @Input()
  seller: User;

  @Input()
  message: Message;

  dateMessage: Date;

  constructor() {
  }

  ngOnInit() {
    this.dateMessage = new Date(this.message.timestamp);
  }

  fromBuyer() {
    return this.buyer && this.message.uidAuthor === this.buyer.uid;
  }

  fromSeller() {
    return this.seller && this.message.uidAuthor === this.seller.uid;
  }

  getPhotoUrl(): string {
    if (this.fromSeller()){
      return this.seller.photoUrl;
    }

    if (this.fromBuyer()){
      return this.buyer.photoUrl;
    }
  }

}
