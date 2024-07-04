import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { WINDOW } from '../../../utils/window.provider';

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

  constructor(@Inject(WINDOW) private window: Window) {}

  ngAfterViewInit(): void {
    this.init();
    this.animate();
  }

  private init(): void {
    let width = Math.min(this.window.innerWidth / 2, 700);
    if (this.window.innerWidth < 640) {
      width = this.window.innerWidth;
    }
    const height = (width / 3) * 2;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(this.window.devicePixelRatio);
    this.renderer.setSize(width, height, true);
    this.canvas.nativeElement.style.touchAction = 'none';
    this.scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.3,
    });
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
    this.window.addEventListener('resize', this.onWindowResize.bind(this));
    this.window.addEventListener('scroll', this.onScroll.bind(this));
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    this.scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x61edeb, 5);
    directionalLight1.position.set(0, 2, 2);
    this.scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xa83258, 5);
    directionalLight2.position.set(1, -2, 2);
    this.scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffa500, 5);
    directionalLight3.position.set(-2, 1, 3);
    this.scene.add(directionalLight3);

    const directionalLight4 = new THREE.DirectionalLight(0x00ff00, 5);
    directionalLight4.position.set(2, -1, -3);
    this.scene.add(directionalLight4);

    const directionalLight5 = new THREE.DirectionalLight(0x0000ff, 5);
    directionalLight5.position.set(-1, 2, -2);
    this.scene.add(directionalLight5);

    const directionalLight6 = new THREE.DirectionalLight(0xffff00, 5);
    directionalLight6.position.set(2, 0, 2);
    this.scene.add(directionalLight6);

    const directionalLight7 = new THREE.DirectionalLight(0xff00ff, 5);
    directionalLight7.position.set(0, -2, 2);
    this.scene.add(directionalLight7);

    const directionalLight8 = new THREE.DirectionalLight(0x00ffff, 5);
    directionalLight8.position.set(-2, -2, 2);
    this.scene.add(directionalLight8);

    const pointLight1 = new THREE.PointLight(0xffffff, 5, 50);
    pointLight1.position.set(0, 0, 5);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ffff, 5, 50);
    pointLight2.position.set(0, 5, 0);
    this.scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x0000ff, 5, 50);
    pointLight3.position.set(5, 0, 0);
    this.scene.add(pointLight3);

    const pointLight4 = new THREE.PointLight(0xff00ff, 5, 50);
    pointLight4.position.set(-5, 0, 0);
    this.scene.add(pointLight4);

    const pointLight5 = new THREE.PointLight(0xffffff, 5, 50);
    pointLight5.position.set(0, -5, 0);
    this.scene.add(pointLight5);
  }

  private onWindowResize(): void {
    let width = Math.min(this.window.innerWidth / 2, 700);
    if (this.window.innerWidth < 640) {
      width = this.window.innerWidth;
    }
    const height = (width / 3) * 2;
    this.camera.aspect = 3 / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, true);
  }
  onScroll() {
    this.cube1.rotation.y += this.window.scrollY / 10000;
    this.cube1.rotation.x += this.window.scrollY / 10000;
    this.cube2.rotation.y -= this.window.scrollY / 10000;
    this.cube2.rotation.x -= this.window.scrollY / 10000;
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
