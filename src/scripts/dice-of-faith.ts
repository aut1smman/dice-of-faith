import CubeWithTexts from './cube-with-texts';
import Swiper from './swiper';
import Visualizer from './visualizer';

export default class DiceOfFaith {
    swiper: Swiper;
    visualizer: Visualizer;
    cubeWithTexts: CubeWithTexts;
    isTried: boolean;

    constructor(
        timeMeasurementError: number,
        cameraPosition: THREE.Vector3,
        size: number,
        cubeColor: number,
        textColor: number,
        texts: string[],
        maxSpeed: number,
    ) {
        this.swiper = new Swiper();
        this.visualizer = new Visualizer(timeMeasurementError, cameraPosition, this, maxSpeed);
        this.cubeWithTexts = new CubeWithTexts(size, cubeColor, textColor, texts);
        this.isTried = false;
    }

    initialize(): void {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.swiper.swipeContainer.addEventListener('touchstart', (ev) => {
                this.swiper.onTouchStart(ev, this);
            });

            this.swiper.swipeContainer.addEventListener('touchend', (ev) => {
                this.swiper.onTouchEnd(ev, this.visualizer, this);
            });
        } else {
            this.swiper.swipeContainer.addEventListener('mousedown', (ev) => {
                this.swiper.onMouseDown(ev, this);
            });

            this.swiper.swipeContainer.addEventListener('mouseup', (ev) => {
                this.swiper.onMouseUp(ev, this.visualizer, this);
            });
        }

        this.visualizer.initialize();
        this.cubeWithTexts.initialize();
        this.visualizer.appendObjectToScene(this.cubeWithTexts.generatedCube);
        this.visualizer.cameraPosition = this.cubeWithTexts.cubeSize * 2;
    }

    public showResetButton(): void {
        const button = document.querySelector('.finish-button');
        button.classList.remove('hidden');
        button.addEventListener('click', () => {
            this.visualizer.resetAll();
            this.isTried = false;
            button.classList.add('hidden');
        });
    }
}
