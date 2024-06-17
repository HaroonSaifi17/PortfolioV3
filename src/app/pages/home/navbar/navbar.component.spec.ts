import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isCollapsed', () => {
    const ulElement: HTMLUListElement =
      fixture.nativeElement.querySelector('ul');
    component.navClick(ulElement);
    expect(component.isCollapsed()).toBe(true);
    component.navClick(ulElement);
    expect(component.isCollapsed()).toBe(false);
  });

  it('should navigate to fragment', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    component.navigate('#about');
    expect(navigateSpy).toHaveBeenCalledWith('#about');
  });
});
