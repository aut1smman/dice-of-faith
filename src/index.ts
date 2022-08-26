import THREE = require('three');
import DiceOfFaith from './scripts/dice-of-faith';

const diceOfFaith = new DiceOfFaith(0.01, new THREE.Vector3(0, 0, 10),
    5, 0xFA4D5F, 0xffaf85,
    ['Да', 'Нет', 'Возможно', 'Точно\nНет', 'Забудь', 'Даа!!!']);

diceOfFaith.initialize();

