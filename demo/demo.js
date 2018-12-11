const PC= require('../src/params-checker');

let inputParams = {
    title: 'Params Checker',
    version: 1,
    inProduction: false,
    is_support: 'num',
    something: 'не должно быть во входящих'

}

let checker = PC.obj(true, false, {      // Объект, обязателелен, не может быть NULL
    title: PC.str(true, true, 1, 64),  // Строка, обязательна, может быть NULL, от 1 до 64 символов
    version: PC.num(false, false, 1),   // Число, не обязательно, не менее 1-го
    inProduction: PC.bool(true, false),  // Булевый параметр, обязателен, не может быть NULL
    is_support: PC.enum(false, false, ['str','num','arr','obj','bool','enum'])  // Одно из возможных значений, не обязательно, не может быть NULL
})

var checkedParams;

try {
    checkedParams = checker.check(inputParams);
} catch (e) {
    console.log("Ошибка: " + e.message);
    return;
}

console.log("Выходной результат\n", checkedParams);