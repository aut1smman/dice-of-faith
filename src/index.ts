import THREE = require('three');
import DiceOfFaith from './scripts/dice-of-faith';

const diceOfFaith = new DiceOfFaith(0.01, new THREE.Vector3(0, 0, 10),
    5, 0xFA4D5F, 0xffaf85,
    ['Да', 'Нет', 'Возможно', 'Точно\nНет', 'Забудь', 'Даа!!!'],
    1000);

diceOfFaith.initialize();

document.body.addEventListener('touchmove', e => {
    e.preventDefault();
}, { passive: false });
