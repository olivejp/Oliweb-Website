export class PagedResults<T> {
  results: T[];
  totalRecords: number;

  constructor(objets:T[], total: number){
    this.results = objets;
    this.totalRecords = total;
  }
}
