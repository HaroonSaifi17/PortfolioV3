import { Directive, ElementRef, HostListener, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[mouseGlow]',
  standalone: true
})
export class MouseGlowDirective implements OnInit {
  @Input() glowSize = 600;
  @Input() glowColor ='var(--glow)';
  @Input() glowFade = 80;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.updateGradient(0, 0);
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
