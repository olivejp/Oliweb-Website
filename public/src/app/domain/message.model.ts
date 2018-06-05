export class Message {
  constructor(public uidMessage?: string,
              public uidChat?: string,
              public uidAuthor?: string,
              public timestamp?: number,
              public read?: boolean,
              public message?: string) {
  }
}
