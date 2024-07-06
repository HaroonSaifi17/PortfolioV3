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
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  fancyTitle1 = [
    'C', 'r', 'e', 'a', 't', 'e', '',
    'i', 't', 'e', 'r', 'a', 't', 'e', '',
    'i', 'm', 'p', 'r', 'o', 'v', 'e', '',
    'r', 'e', 'p', 'e', 'a', 't', ' '
  ];
  fancyTitle2 = [
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
  private coin!: THREE.Group;
  private cube2!: THREE.Mesh;
  private cube3!: THREE.Mesh;
  private previousScrollY: number = 0;

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
      canvas: this.canvas!.nativeElement,
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
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.x = 0;
    this.cube.position.y = 0;
    this.cube.position.z = 0;
    this.cube.rotation.x = -0.1;
    this.cube.rotation.y = -0.1;

    this.scene.add(this.cube);

    this.cube2 = this.cube.clone();
    this.cube2.position.set(1.5, 1, 0);
    this.cube2.scale.set(0.5, 0.5, 0.5);
    this.scene.add(this.cube2);

    this.cube3 = this.cube.clone();
    this.cube3.position.set(-1.5, -1, 0);
    this.cube3.scale.set(0.5, 0.5, 0.5);
    this.scene.add(this.cube3);

    this.camera = new THREE.PerspectiveCamera(60, 3 / 2, 0.1, 5);
    this.camera.position.z = 3;
    this.window.addEventListener('resize', this.onWindowResize.bind(this));
    this.window.addEventListener('scroll', this.onScroll.bind(this));
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    this.scene.add(ambientLight);

    const lights: { color: number; position: [number, number, number] }[] = [
      { color: 0x61edeb, position: [0, 2, 2] },
      { color: 0xa83258, position: [1, -2, 2] },
      { color: 0xffa500, position: [-2, 1, 3] },
      { color: 0x00ff00, position: [2, -1, -3] },
      { color: 0x0000ff, position: [-1, 2, -2] },
      { color: 0xffff00, position: [2, 0, 2] },
      { color: 0xff00ff, position: [0, -2, 2] },
      { color: 0x00ffff, position: [-2, -2, 2] },
    ];

    lights.forEach((light) => {
      const directionalLight = new THREE.DirectionalLight(light.color, 4);
      directionalLight.position.set(...light.position);
      this.scene.add(directionalLight);
    });

    const points: { color: number; position: [number, number, number] }[] = [
      { color: 0xffffff, position: [0, 0, 5] },
      { color: 0x00ffff, position: [0, 5, 0] },
      { color: 0x0000ff, position: [5, 0, 0] },
      { color: 0xff00ff, position: [-5, 0, 0] },
      { color: 0xffffff, position: [0, -5, 0] },
    ];

    points.forEach((point) => {
      const pointLight = new THREE.PointLight(point.color, 4, 50);
      pointLight.position.set(...point.position);
      this.scene.add(pointLight);
    });

    this.coin = new THREE.Group();
    const textureLoader = new THREE.TextureLoader();
    const coinTexture = textureLoader.load('assets/profile.webp', () => {
      coinTexture.colorSpace = THREE.SRGBColorSpace;
    });

    const coinGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);

    const coinMaterialFront = new THREE.MeshBasicMaterial({
      map: coinTexture,
    });
    const coinMaterialBack = new THREE.MeshBasicMaterial({
      map: coinTexture,
    });

    const front = new THREE.Mesh(coinGeometry, coinMaterialFront);
    const back = new THREE.Mesh(coinGeometry, coinMaterialBack);
    back.rotation.y = Math.PI;
    this.coin.add(front);
    this.coin.add(back);

    this.coin.position.set(0, 0, 0.75);
    this.coin.rotation.x = Math.PI / 2;
    this.coin.rotation.y = -Math.PI / 2;
    const coin2 = this.coin.clone();
    coin2.position.set(0, 0, -0.75);

    this.cube.add(this.coin);
    this.cube.add(coin2);
    this.coin = this.coin;
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
    const scrollY = this.window.scrollY;
    const deltaScroll = scrollY - this.previousScrollY;
    const rotationSpeed = 0.005;
    const rotationAmount = deltaScroll * rotationSpeed;

    this.coin.rotation.y += rotationAmount;

    this.previousScrollY = scrollY;
    this.cube.rotation.y += rotationAmount;
    this.cube.rotation.x += rotationAmount;
    this.cube2.rotation.y += rotationAmount;
    this.cube2.rotation.x += rotationAmount;
    this.cube3.rotation.y += rotationAmount;
    this.cube3.rotation.x += rotationAmount;
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}
