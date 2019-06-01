import * as firebase from 'firebase';
import {FirebaseUtilityService} from './FirebaseUtilityService';
import {ResultEs} from "../domain/resultEs.model";
import {Injectable, OnInit} from "@angular/core";

@Injectable()
export class SearchRequestService implements OnInit {

  private REQUEST: string = 'requests';
  private RESULTS: string = 'results';
  private NO_RESULTS: string = 'no_results';
  private REQUEST_PATH: string = '/' + this.REQUEST + '/';

  ngOnInit() {
  }

  constructor(private firebaseUtilityService: FirebaseUtilityService) {
  }

  /**
   * La méthode de recherche complète.
   *
   * @param keyword
   * @param priceHigh
   * @param priceLow
   * @param categories
   * @param hasPhotos
   * @param from
   * @param size
   * @param order
   * @return Promise<ResultEs> La promesse retourne un résultat de rechercher Elastic Search.
   */
  launchSearch(keyword?: string, priceHigh?: number, priceLow?: number, categories?: string[], hasPhotos?: boolean, from?: number, size?: number, order?: string): Promise<ResultEs> {
    let self = this;
    return this.saveRequest(keyword, priceHigh, priceLow, categories, hasPhotos, from, size, order)
      .catch(reason => console.error(reason))
      .then(function (requestUid: string) {
        return self.listenRequestResult(requestUid)
      });
  }

  /**
   * On va se positionner sur la request ID et écouter pour savoir s'il y a des résultats.
   * @param requestKey
   */
  listenRequestResult(requestKey: string): Promise<ResultEs> {
    return new Promise<ResultEs>((resolve, reject) => {
      firebase.database().ref(this.REQUEST_PATH + requestKey).on('value', request => {
        if (request.hasChild(this.NO_RESULTS) || request.hasChild(this.RESULTS)) {
          if (request.hasChild(this.RESULTS)) {
            resolve(request.child(this.RESULTS).val());
          } else if (request.hasChild(this.NO_RESULTS)) {
            reject(new Error('Aucun résultat'));
          }
          // On supprime la request ID de Firebase
          firebase.database().ref(this.REQUEST_PATH + requestKey).remove().catch(reason => console.error(reason));
        }
      });
    })
  }

  /**
   * 1 - Lire le timestamp du serveur
   * 2 - Créer une nouvelle entrée dans le noeud /requests
   * 3 - Retourne la request ID dans une promise
   * @param keyword
   * @param priceHigh
   * @param priceLow
   * @param categories
   * @param hasPhotos
   * @param from
   * @param size
   * @param order
   */
  saveRequest(keyword?: string, priceHigh?: number, priceLow?: number, categories?: string[], hasPhotos?: boolean, from?: number, size?: number, order?: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.firebaseUtilityService.getServerTimestamp()
        .catch(reason => reject(new Error(reason)))
        .then(timestamp => {

          // Création d'une nouvelle clé pour le noeud /requests
          const newRequestKey = firebase.database().ref(this.REQUEST).push().key;

          let requestToStringify = {
            "from": (from) ? from : 0,
            "size": (size) ? size : 10,
            "sort": [
              {
                "datePublication": {
                  "order": (order) ? order : "desc"
                }
              }
            ],
            "query": {
              "bool": {
                "must": []
              }
            }
          };

          // Création de l'objet qu'on va enregistrer dans Firebase
          let elasticsearchRequest = {
            "version": 2,
            "timestamp": timestamp,
            "request": null
          };

          if (keyword != null) {
            requestToStringify.query.bool.must.push({
              "multi_match": {
                "query": keyword,
                "fields": ["titre", "description"]
              }
            });
          }

          if (priceHigh != null && priceLow != null) {
            requestToStringify.query.bool.must.push({
              "range": {
                "prix": {
                  "gte": priceLow,
                  "lte": priceHigh
                }
              }
            });
          }

          if (hasPhotos != null) {
            requestToStringify.query.bool.must.push({
              "exists": {
                "field": "photos"
              }
            });
          }

          if (categories != null && categories.length > 0) {
            let categorieArray = {
              "bool": {
                "should": []
              }
            };

            // TODO ne fonctionne pas pour le moment. Il faudrait inscrire categorie.libelle mais on ne peut pas mettre de . dans une requête.
            // for (let categorie of categories) {
            //   categorieArray.bool.should.push({
            //     "match": {
            //       "libelle": categorie
            //     }
            //   })
            // }

            requestToStringify.query.bool.must.push(categorieArray);
          }

          // On transforme la requête JSON en un string
          elasticsearchRequest.request = JSON.stringify(requestToStringify);

          // Tentative de sauvegarde dans Firebase
          firebase.database().ref(this.REQUEST_PATH + newRequestKey).set(elasticsearchRequest, function (error) {
            if (error) {
              console.log(error);
              this.errors.push(error.message);
              reject(error);
            } else {
              resolve(newRequestKey);
            }
          });
        });
    });
  };
}
