import {Annonce} from "./annonce.model";

export class AnnonceEs {
  constructor(public sort?: number[],
              public _id?: string,
              public _index?: string,
              public _source?: Annonce,
              public _type?: string) {
  }
}

export class ResultEs {
  constructor(public hits?: AnnonceEs[],
              public total?: number) {
  }
}
