export class CategorieEmbeded {
  constructor(public id: number,
              public libelle: string) {
  }
}

export class UtilisateurEmbeded {
  constructor(public email: number,
              public telephone: string,
              public uuid: string) {
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
              public categorie?: CategorieEmbeded,
              public utilisateur?: UtilisateurEmbeded) {
  }
}
