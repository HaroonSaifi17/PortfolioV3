import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

 fancyTitle1 =[
  'C', 'r', 'e', 'a', 't', 'e', '',
  'i', 't', 'e', 'r', 'a', 't', 'e', '',
  'i', 'm', 'p', 'r', 'o', 'v', 'e', '',
  'r', 'e', 'p', 'e', 'a', 't', ' '
]
  fancyTitle2 =[
  'G', 'o', 'o', 'd', '',
  'd', 'e', 's', 'i', 'g', 'n', '',
  'i', 's', '',
  'g', 'o', 'o', 'd', '',
  'b', 'u', 's', 'i', 'n', 'e', 's', 's', '.',
  'S', 'i', 'm', 'p', 'l', 'i', 'c', 'i', 't', 'y', '',
  'i', 's', '', 'k', 'e', 'y', '.'
];


  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;

  constructor() {}

  ngAfterViewInit(): void {
    this.init();
    this.animate();
  }

  private init(): void {
    const width = Math.min(window.innerWidth / 2, 700);
    const height = (width / 3) * 2;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      antialias: true,
    });
    this.renderer.setSize(width, height, true);
    this.canvas.nativeElement.style.touchAction = 'none';
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xfafafc);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x000080 });
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);

    this.camera = new THREE.PerspectiveCamera(75, 3 / 2, 0.1, 1000);
    this.camera.position.z = 5;
    window.addEventListener('resize', this.onWindowResize.bind(this));
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(0, 1, 1);
    this.scene.add(directionalLight);
  }

  private onWindowResize(): void {
    const width = Math.min(window.innerWidth / 2, 700);
    const height = (width / 3) * 2;
    this.camera.aspect = 3 / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, true);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.cube.rotation.y += 0.001;
    this.cube.rotation.x += 0.002;
    this.renderer.render(this.scene, this.camera);
  }
}
