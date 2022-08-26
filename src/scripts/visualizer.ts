import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import DiceOfFaith from './dice-of-faith';

type Velocity = {
    x: number;
    y: number;
}

export default class Visualizer {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    light: THREE.AmbientLight;
    timeMeasurementError: number;
    frameInterval: NodeJS.Timer;
    velocity: Velocity;
    gameCoordinator: DiceOfFaith;

    constructor(timeMeasurementError: number, cameraPosition:THREE.Vector3, gameCoordinator: DiceOfFaith) {
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
        this.velocity = {
            x: 0,
            y: 0,
        };
    }

    initialize() {
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
        }
        window.addEventListener("resize", onWindowResize);

        this.frameInterval = setInterval(() => {
            this.renderFrame(this);
        }, this.timeMeasurementError * 1000 );
    }

    appendObjectToScene(object: THREE.Mesh) {
        this.scene.add(object);
        this.camera.lookAt(object.position);
    }

    renderFrame(context: Visualizer) {
        this.rotateCube();
        context.renderer.render(context.scene, context.camera);
    }

    rotateCube(): void {
        this.scene.children[1].rotation.y += this.adaptiveVelocity.x;
        this.scene.children[1].rotation.x += this.adaptiveVelocity.y;
        this.changeVelocity();
    }

    changeVelocity() {
        if (this.velocity.y) {
            if (this.velocity.y > 200) {
                this.velocity.y -= 5;
            } else if (this.velocity.y < -200) {
                this.velocity.y += 5;
            } else if ( Math.abs(this.scene.children[1].rotation.x/Math.PI * 180) % 90 < 5) {
                this.velocity.y = 0;
                this.gameCoordinator.showResetButton();
            }
        }

        if (this.velocity.x) {
            if (this.velocity.x > 200) {
                this.velocity.x -= 5;
            } else if (this.velocity.x < -200) {
                this.velocity.x += 5;
            } else if ( Math.abs(this.scene.children[1].rotation.y/Math.PI * 180) % 90 < 5) {
                this.velocity.x = 0;
                this.gameCoordinator.showResetButton();
            }
        }
    }

    resetAll() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.scene.children[1].rotation.y = 0;
        this.scene.children[1].rotation.x = 0;
    }

    set cameraPosition(pos: number) {
        this.camera.position.set(0, 0, pos);
    }

    get adaptiveVelocity(): Velocity {
        return {
            x: this.velocity.x / window.innerWidth * this.timeMeasurementError * -1,
            y: this.velocity.y / window.innerHeight * this.timeMeasurementError * -1,
        }
    }

}




