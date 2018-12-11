# Params Validator

Библиотека для проверки параметров

### Использование

```javascript
const PC = require('params-checker');

let inputParams = {
    title: 'Params Checker',
    version: 1,
    inProduction: false,
    is_support: 'num'
}

let checker = PC.obj(true, false {      // Объект, обязателелен, не может быть NULL
    title: PC.str(true, true, 1, 64),  // Строка, обязательна, может быть NULL, от 1 до 64 символов
    version: PC.num(false, false, 1),   // Число, не обязательно, не менее 1-го
    inProduction: PC.bool(true, false),  // Булевый параметр, обязателен, не может быть NULL
    is_support: PC.enum(false, false, ['str','num','arr','obj','bool','enum'])  // Одно из возможных значений, не обязательно, не может быть NULL
})

var checkedParams;

try {
    checkedParams = checker.check(inputParams);
} catch (e) {
    console.log('Error: ' + e.message);
    return;
}

console.log(checkedParams);

```