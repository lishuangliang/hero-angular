import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Hero} from '../Hero';
import {HeroService} from '../hero.service';
import {heroes} from '../mock-hero';

@Component({
  selector: 'app-update-hero',
  templateUrl: './update-hero.component.html',
  styleUrls: ['./update-hero.component.css']
})
export class UpdateHeroComponent implements OnInit {
  currId: number;
  currHero: Hero;
  heroes: Hero[];
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private heroServer: HeroService
  ) { }

  ngOnInit() {
    this.getHero();
  }
  getHero(): void {
     this.heroServer.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        this.currId = +this.route.snapshot.paramMap.get('id');
        if (this.currId > 0) {
          this.currHero = this.heroes.find(hero => hero.id === this.currId);
        }
      });
  }
  addHero(): void {
    this.heroServer.updateHero(this.currHero)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }

}
