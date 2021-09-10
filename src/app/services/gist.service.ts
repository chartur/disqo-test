import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {endpoints} from "../../environments/environment";
import {Notepad} from "../models/notepad";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GistService {

  private page = 1;

  private perPage = 30;

  private _publicGists: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _loadMoreGists: Subject<any[]> = new Subject<any[]>();

  readonly publicGistsStream$: Observable<any[]> = this._publicGists.asObservable();
  readonly loadMoteGistsStream$: Observable<any[]> = this._loadMoreGists.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.getPublicGists();
  }

  private async getPublicGists() {
    const res = <any[]> await this.http.get(endpoints.getPublicGists).toPromise();
    this._publicGists.next(res);
  }

  public async loadMorePublicGists() {
    const res = <any[]> await this.http.get(`${endpoints.getPublicGists}?page=${this.page + 1}`).toPromise();
    const data = [
      ...this._publicGists.getValue(),
      ...res
    ];
    this.page++;
    this._publicGists.next(data);
    this._loadMoreGists.next(res);
  }
}
