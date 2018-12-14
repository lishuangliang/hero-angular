import { Component, OnInit } from '@angular/core';

import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Hero} from '../Hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-search-hero',
  templateUrl: './search-hero.component.html',
  styleUrls: ['./search-hero.component.css']
})
export class SearchHeroComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor() { }

  ngOnInit() {
  }
  search(term: string): void {
    console.log(term);
  }

}
