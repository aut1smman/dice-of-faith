import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import DiceOfFaith from './dice-of-faith';
import SpeedController from './speed-controller';
import { Velocity } from './types';
import {Logger} from "codelyzer/util/logger";

export default class Visualizer {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private light: THREE.AmbientLight;
    private timeMeasurementError: number;
    private frameInterval: NodeJS.Timer;
    private velocityPower: Velocity;
    private gameCoordinator: DiceOfFaith;
    public speedController: SpeedController;

    constructor(
        timeMeasurementError: number,
        cameraPosition: THREE.Vector3,
        gameCoordinator: DiceOfFaith,
        maxSpeed: number,
    ) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.camera.position.copy(cameraPosition);
        this.timeMeasurementError = timeMeasurementError;
        this.gameCoordinator = gameCoordinator;

        this.speedController = new SpeedController(maxSpeed, gameCoordinator);
        this.velocityPower = {
            x: 0,
            y: 0,
        };
    }

    public initialize(): void {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.light = new THREE.AmbientLight(0x404040);
        this.scene.add(this.light);

        const onWindowResize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            if (this.camera.aspect < 1) {
                this.scene.scale.set(this.camera.aspect, this.camera.aspect, this.camera.aspect);
            }
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', onWindowResize);

        this.frameInterval = setInterval(() => {
            this.renderFrame(this);
        }, this.timeMeasurementError * 1000 );
    }

    public appendObjectToScene(object: THREE.Mesh): void {
        this.scene.add(object);
        this.camera.lookAt(object.position);
    }

    private renderFrame(context: Visualizer): void {
        this.rotateCube();
        context.renderer.render(context.scene, context.camera);
    }

    private rotateCube(): void {
        this.scene.children[1].rotation.y += this.adaptiveVelocity.x;
        this.scene.children[1].rotation.x += this.adaptiveVelocity.y;
        this.speedController.changeSpeed(this.isBlockedChangingSpeed(), this.isEnd());
    }

    private isBlockedChangingSpeed(): boolean {
        if (
            Math.abs(this.speedController.speed.x) <= this.speedController.maxSpeed * 0.1 &&
            Math.abs(this.speedController.speed.x)
        ) {
            return true;
        }

        if (
            Math.abs(this.speedController.speed.y) <= this.speedController.maxSpeed * 0.1 &&
            Math.abs(this.speedController.speed.y)
        ) {
            return true;
        }

        return false;
    }

    private isEnd(): boolean {
        if (
            (Math.abs(this.scene.children[1].rotation.y / Math.PI * 180) % 90 <= 5) &&
            Math.abs(this.speedController.speed.x)
        ) {
            return true;
        }

        if (
            (Math.abs(this.scene.children[1].rotation.x / Math.PI * 180) % 90 <= 5) &&
            Math.abs(this.speedController.speed.y)
        ) {
            return true;
        }

        return false;
    }

    public resetAll(): void {
        this.speedController.speedPower = {
            x: 0,
            y: 0,
        }

        this.scene.children[1].rotation.y = 0;
        this.scene.children[1].rotation.x = 0;
    }

    set cameraPosition(pos: number) {
        this.camera.position.set(0, 0, pos);
    }

    get adaptiveVelocity(): Velocity {
        const velocity = this.speedController.speed;
        return {
            x: velocity.x / window.innerWidth  * -0.05,
            y: velocity.y / window.innerHeight * -0.05,
        };
    }

}




