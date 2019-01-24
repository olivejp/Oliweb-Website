import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../domain/message.model";
import {User} from "../../domain/user.model";
import {UserService} from "../../services/UserService";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  @Input()
  messages: Message;

  @Input()
  buyerUid: string;

  @Input()
  sellerUid: string;

  seller: User;
  buyer: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // Recherche des vendeur et acheteur
    this.userService.getUser(this.sellerUid)
      .then(seller => this.seller = seller)
      .catch(reason => console.error(new Error(reason)));

    this.userService.getUser(this.buyerUid)
      .then(buyer => this.buyer = buyer)
      .catch(reason => console.error(new Error(reason)));
  }
}
