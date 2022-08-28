import { FontLoader, TextGeometry, Vector3 } from 'three';
import THREE = require('three');
import { textPositionAndRotation } from './types';

export default class CubeWithTexts {
    private _cubeSize: number;
    private cubeColor: number;
    private textColor: number;
    private cubeSidesText: string[];
    private cube: THREE.Mesh;

    constructor(
        size = 1,
        cubeColor = 0xFFFFFFFF,
        textColor: number,
        texts = ['', '', '', '', '', ''],
    ) {
        this._cubeSize = size;
        this.cubeColor = cubeColor;
        this.textColor = textColor;
        this.cubeSidesText = texts;
    }

    public initialize(): void {
        this.cube = this.createCube();
        this.createTextsMeshsAndAppendToCube(this.cubeSidesText);
    }

    private createCube(): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(this.cubeSize, this.cubeSize, this.cubeSize);
        const material = new THREE.MeshBasicMaterial({
            color: this.cubeColor
        });
        const cube = new THREE.Mesh(geometry, material);
        return cube;
    }

    private createTextsMeshsAndAppendToCube(texts: string[]): THREE.Mesh[] {
        const textsMeshs: THREE.Mesh[] = [];
        const loader = new FontLoader();
        loader.load('./fonts/Gilroy_Medium_Regular.json', font => {
            texts.forEach((text, index) => {
                const geometry = new TextGeometry(
                    text,
                    {
                        font,
                        size: this.cubeSize * 0.1,
                        height: 0.1,
                        curveSegments: 12,
                        bevelEnabled: false,
                        bevelThickness: 0.1,
                        bevelSize: 0.1,
                        bevelSegments: 0.1,
                    }
                );
                const material = new THREE.MeshBasicMaterial({ color: this.textColor });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.geometry.center();
                this.cube = this.appendTextToCube(this.cube, mesh, index);
            });
        });
        return textsMeshs;
    }

    private getTextPosition(index: number): textPositionAndRotation {
        switch (index) {
            case 0: {
                return {
                    position: new THREE.Vector3(0, 0, -this.cubeSize / 2 - 0.02),
                    rotation: new THREE.Vector3(0, Math.PI, 0),
                };
            }
            case 1: {
                return {
                    position: new THREE.Vector3(0, 0, this.cubeSize / 2 + 0.02),
                    rotation: new THREE.Vector3(0, 0, 0),
                };
            }
            case 2: {
                return {
                    position: new THREE.Vector3(-this.cubeSize / 2 - 0.02, 0, 0),
                    rotation: new THREE.Vector3(0, 3 * Math.PI / 2, 0),
                };
            }
            case 3: {
                return {
                    position: new THREE.Vector3(this.cubeSize / 2 + 0.02, 0, 0),
                    rotation: new THREE.Vector3(0, Math.PI / 2, 0),
                };
            }
            case 4: {
                return {
                    position: new THREE.Vector3(0, this.cubeSize / 2 + 0.02, 0),
                    rotation: new THREE.Vector3(-Math.PI / 2, 0, 0),
                };
            }
            case 5: {
                return {
                    position: new THREE.Vector3(0, -this.cubeSize / 2 - 0.02, 0),
                    rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
                };
            }
        }
        return {
            position: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Vector3(0, 0, 0),
        };
    }

    private appendTextToCube(cube: THREE.Mesh, text: THREE.Mesh, index: number): THREE.Mesh {
        cube.position.set(0, 0, 0);
        const positionAndRotation: textPositionAndRotation = this.getTextPosition(index);
        text.position.copy(text.position.add(positionAndRotation.position));
        text.rotation.setFromVector3(positionAndRotation.rotation);
        cube.add(text);
        return cube;
    }

    get generatedCube(): THREE.Mesh {
        if (!this.cube) {
            this.initialize();
        }

        return this.cube;
    }

    get cubeSize() {
        return this._cubeSize;
    }
}
