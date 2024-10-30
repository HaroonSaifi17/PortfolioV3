import { Directive, ElementRef, HostListener, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[mouseGlow]',
  standalone: true
})
export class MouseGlowDirective implements OnInit {
  @Input() glowSize = 600;
  @Input() glowColor = 'rgba(29, 78, 216, 0.15)';
  @Input() glowFade = 80; // Fade percentage

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.updateGradient(-100, -100);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.updateGradient(x, y);
  }

   private updateGradient(x: number, y: number) {
    const backgroundImage = `radial-gradient(${this.glowSize}px at ${x}px ${y}px, ${this.glowColor}, transparent ${this.glowFade}%)`;
    this.renderer.setStyle(this.el.nativeElement, 'background', backgroundImage);
  }
}
