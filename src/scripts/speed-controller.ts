import DiceOfFaith from "./dice-of-faith";
import { Velocity } from "./types";


export default class SpeedController {
    private velocityPower: Velocity;
    private _maxSpeed: number;
    private minSpeed: number;
    private _speed: Velocity;
    private gameCoordinator: DiceOfFaith;

    constructor(maxSpeed: number, gameCoordinator: DiceOfFaith) {
       this.velocityPower = {
           x: 0,
           y: 0,
       };
       this._maxSpeed = maxSpeed;
       this._speed = {
           x: 0,
           y: 0,
       };
       this.gameCoordinator = gameCoordinator;
    }

    public setStartSpeed() {
        this._speed = {
            x: this.maxSpeed * this.velocityPower.x,
            y: this.maxSpeed * this.velocityPower.y,
        }
    }

    public changeSpeed(isBlockedChanging: boolean, isEnd: boolean): void {
        if (!isBlockedChanging){
            this._speed.x = this._speed.x - this._speed.x * 0.005;
            this._speed.y = this._speed.y - this._speed.y * 0.005;
        }
        if (isEnd && isBlockedChanging) {
            this._speed.x = 0;
            this._speed.y = 0;
            this.gameCoordinator.showResetButton();
        }
    }

    get speed(): Velocity {
        return this._speed;
    }

    get maxSpeed(): number {
        return this._maxSpeed;
    }

    set speedPower(velPower: Velocity) {
        this.velocityPower = velPower;
    }
}
