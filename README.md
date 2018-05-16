# Params Validator

Библиотека для проверки параметров

### Использование

```javascript
const ParamsValidator = require('params-validator');

let inputParams = {
    title: 'ParamsValidator',
    version: 1,
    inProduction: false
}

let validator = new ParamsValidator({});

var checkedParams;

try {
    checkedParams = validator.check(inputParams);
} catch (e) {
    console.log('Error: ' + e.message);
    return;
}

console.log(checkedParams);

```