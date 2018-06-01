import {Categorie} from "./categorie.model";

export class UtilisateurEmbeded {
  constructor(public email?: string,
              public profile?: string,
              public telephone?: string,
              public uuid?: string) {
  }
}

export class Annonce {
  constructor(public uuid?: string,
              public titre?: string,
              public description?: string,
              public datePublication?: number,
              public contactTel?: boolean,
              public contactMsg?: boolean,
              public contactEmail?: boolean,
              public photos?: string[],
              public categorie?: Categorie,
              public utilisateur?: UtilisateurEmbeded) {
  }
}
