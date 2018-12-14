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
    this.heroes = this.heroes.filter( h => h !== hero);
    this.heroservice.deleteHero(hero).subscribe();
  }
  addHero(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroservice.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
}
