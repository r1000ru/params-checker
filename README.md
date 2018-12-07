# Params Validator

Библиотека для проверки параметров

### Использование

```javascript
const PV = require('params-validator');

let inputParams = {
    title: 'ParamsValidator',
    version: 1,
    inProduction: false,
    is_support: 'num'
}

let checker = PV.obj(true, false {      // Объект, обязателелен, не может быть NULL
    title: PV.str(true, true, 1, 64),  // Строка, обязательна, может быть NULL, от 1 до 64 символов
    version: PV.num(false, false, 1),   // Число, не обязательно, не менее 1-го
    inProduction: PV.bool(true, false),  // Булевый параметр, обязателен, не может быть NULL
    is_support: PV.enum(false, false, ['str','num','arr','obj','bool','enum'])  // Одно из возможных значений, не обязательно, не может быть NULL
})

var checkedParams;

try {
    checkedParams = validator.check(inputParams);
} catch (e) {
    console.log('Error: ' + e.message);
    return;
}

console.log(checkedParams);

```