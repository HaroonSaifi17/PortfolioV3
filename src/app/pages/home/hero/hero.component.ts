import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  fancyTitle = ['C' , 'O' ,'F', 'F', 'E', 'E', '' , 'C', 'O', 'D', 'E', 'R' , '' , 'H', 'E', 'K', 'E' , 'R']

}
