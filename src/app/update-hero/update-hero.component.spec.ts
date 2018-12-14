import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHeroComponent } from './update-hero.component';

describe('UpdateHeroComponent', () => {
  let component: UpdateHeroComponent;
  let fixture: ComponentFixture<UpdateHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
