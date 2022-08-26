import DiceOfFaith from "./dice-of-faith";
import Visualizer from "./visualizer";

export default class Swiper {
    swipeContainer: HTMLElement;
    timeMeasurementError: number;
    mouseDownCoords: {
        x: number;
        y: number;
    }
    time: number;
    timeDetectInterval: NodeJS.Timeout;

    constructor(
        swipeContainer = window,
        timeMeasurementError = 0.01,
    ) {
        this.swipeContainer = document.querySelector('.game-container');
        this.timeMeasurementError = timeMeasurementError;
        this.mouseDownCoords = {
            x: 0,
            y: 0,
        }
        this.time = 0;
    }

    onMouseDown(event: MouseEvent, gameCoordinator: DiceOfFaith): void {
        this.startMeasuring(event.offsetX, event.offsetY, gameCoordinator);
    }

    onMouseUp(event: MouseEvent, visualizer: Visualizer, gameCoordinator: DiceOfFaith): void {
        this.endMeasuring(event.offsetX, event.offsetY, visualizer, gameCoordinator);
    }

    onTouchStart(event: TouchEvent, gameCoordinator: DiceOfFaith): void {
        this.startMeasuring(event.touches.item(0).clientX, event.touches.item(0).clientY, gameCoordinator);
    }

    onTouchEnd(event: TouchEvent, visualizer: Visualizer, gameCoordinator: DiceOfFaith): void {
        this.endMeasuring(event.changedTouches.item(0).clientX, event.changedTouches.item(0).clientY, visualizer, gameCoordinator);
    }

    endMeasuring(x: number, y: number, visualizer: Visualizer, gameCoordinator: DiceOfFaith): void {
        if (!gameCoordinator.isTried) {
            clearInterval(this.timeDetectInterval);
            if (Math.abs(this.mouseDownCoords.x - x) > Math.abs(this.mouseDownCoords.y - y)) {
                visualizer.velocity.y = 0;
                visualizer.velocity.x = Math.floor((this.mouseDownCoords.x - x) / this.time);
            } else {
                visualizer.velocity.x = 0;
                visualizer.velocity.y = Math.floor((this.mouseDownCoords.y - y) / this.time);
            }
            gameCoordinator.isTried = true;
            this.clearDate();
        }
    }

    startMeasuring(x: number, y: number, gameCoordinator: DiceOfFaith): void {
        if (!gameCoordinator.isTried) {
            this.mouseDownCoords.x = x;
            this.mouseDownCoords.y = y;
            this.timeDetectInterval = setInterval(() => {
                this.timeChange();
            }, this.timeMeasurementError * 1000);
        }
    }

    clearDate(): void {
        this.mouseDownCoords.x = 0
        this.mouseDownCoords.y = 0
        this.time = 0;
    }

    timeChange(): void {
        this.time += this.timeMeasurementError;
    }
}
