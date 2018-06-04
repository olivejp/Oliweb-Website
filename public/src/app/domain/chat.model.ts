export class Chat {
  constructor(public uid?: string,
              public uidBuyer?: string,
              public uidSeller?: string,
              public uidAnnonce?: string,
              public lastMessage?: string,
              public titreAnnonce?: string,
              public creationTimestamp?: number,
              public updateTimestamp?: number,
              public members?: Map<string, boolean>) {
  }
}
