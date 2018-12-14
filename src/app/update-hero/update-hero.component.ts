import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Hero} from '../Hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-update-hero',
  templateUrl: './update-hero.component.html',
  styleUrls: ['./update-hero.component.css']
})
export class UpdateHeroComponent implements OnInit {
  currId: number;
  updateHeroName: string;
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
      .subscribe(heroes => this.heroes = heroes);
    this.currId = +this.route.snapshot.paramMap.get('id');
    if (this.currId > 0) {
      this.updateHeroName = this.heroes.find(hero => hero.id === this.currId).name;
    }
  }
  addHero(): void {
    if (this.currId > 0) {
      this.heroes.find(hero => hero.id === this.currId).name = this.updateHeroName;
    } else {
      this.heroes.push({id : Math.max(...this.heroes.map(hero => hero.id)) + 1, name: this.updateHeroName});
    }
    this.updateHeroName = '';
    this.goBack();
  }
  goBack(): void {
    this.location.back();
  }

}
