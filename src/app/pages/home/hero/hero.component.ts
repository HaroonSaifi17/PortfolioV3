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
  private cube1!: THREE.Mesh;
  private cube2!: THREE.Mesh;

  constructor() {}

  ngAfterViewInit(): void {
    this.init();
    this.animate();
  }

  private init(): void {
    let width =  Math.min(window.innerWidth / 2, 700);
    if(window.innerWidth < 640) {
      width = window.innerWidth;
    }
    const height = (width / 3) * 2;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(width, height, true);
    this.canvas.nativeElement.style.touchAction = 'none';
    this.scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({ color: 0x333333 ,roughness:0.2 } );
    this.cube1 = new THREE.Mesh(geometry, material);
    this.cube2 = new THREE.Mesh(geometry, material);
    this.cube1.position.x = -2;
    this.cube1.position.y = -0.5;
    this.cube2.position.x = 2;
    this.cube2.position.y = 0.5;

    this.scene.add(this.cube1);
    this.scene.add(this.cube2);

    this.camera = new THREE.PerspectiveCamera(75, 3 / 2, 0.1, 1000);
    this.camera.position.z = 5;
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this));
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    this.scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x61edeb, 5);
    directionalLight1.position.set(0, 2, 2);
    this.scene.add(directionalLight1);
    const directionalLight2 = new THREE.DirectionalLight(0xa83258, 5);
    directionalLight2.position.set(1,-2 , 2);
    this.scene.add(directionalLight2);
  }

  private onWindowResize(): void {
    let width =  Math.min(window.innerWidth / 2, 700);
    if(window.innerWidth < 640) {
      width = window.innerWidth;
    }
    const height = (width / 3) * 2;
    this.camera.aspect = 3 / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, true);
  }
  onScroll() {
    this.cube1.rotation.y += window.scrollY/10000 ;
    this.cube1.rotation.x += window.scrollY/10000;
    this.cube2.rotation.y -= window.scrollY/10000;
    this.cube2.rotation.x -= window.scrollY/10000;
  }


  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.cube1.rotation.y += 0.0006;
    this.cube1.rotation.x += 0.0007;
    this.cube2.rotation.y -= 0.0006;
    this.cube2.rotation.x -= 0.0007;
    this.renderer.render(this.scene, this.camera);
  }
}
