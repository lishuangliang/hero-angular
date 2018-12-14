import { Injectable } from '@angular/core';
import {Hero} from './Hero';
import {heroes} from './mock-hero';
import {Observable, of} from 'rxjs';

import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('new message push into stack at ' + this.formatTime());
    return of(heroes);
  }
  formatTime(): string {
    let d: Date = new Date();
    let h: string = ('' + d.getHours()).padStart(2, '0');
    let m: string = ('' + d.getMinutes()).padStart(2, '0');
    let s: string = ('' + d.getSeconds()).padStart(2, '0');
    return h + ':' + m + ':' + s;
  }


}
