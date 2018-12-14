import { Component, OnInit } from '@angular/core';
import {Hero} from '../Hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private heroservice: HeroService) { }
  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroservice.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  deleteHero(hero: Hero): void {
    this.heroes.forEach((item, index) => {
      if (hero === item) {
        this.heroes.splice(index, 1);
      }
    });
  }

}
