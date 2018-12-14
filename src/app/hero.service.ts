import { Injectable } from '@angular/core';
import {Hero} from './Hero';
import {heroes} from './mock-hero';
import {Observable, of} from 'rxjs';

import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroUrl = 'api/heroes';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  getHeroes(): Observable<Hero[]> {
    this.log('new message push into stack at ' + this.formatTime());
    return this.http.get<Hero[]>(this.heroUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroUrl, hero, httpOptions)
      .pipe(
        tap( (hero: Hero) => this.log(`added hero id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroUrl}/${id}`;
    return this.http.delete<Hero>(url, httpOptions)
      .pipe(
        tap( _ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }
  searchHeroes(term: string): Observable<Hero[]>{
    if (!term.trim()) return of([]);
    return this.http.get<Hero[]>(`${this.heroUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching ${term}`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }
  private handleError<T>(operation = 'operation', result?:T ) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  formatTime(): string {
    let d: Date = new Date();
    let h: string = ('' + d.getHours()).padStart(2, '0');
    let m: string = ('' + d.getMinutes()).padStart(2, '0');
    let s: string = ('' + d.getSeconds()).padStart(2, '0');
    return h + ':' + m + ':' + s;
  }


}
