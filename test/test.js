const validator = require('../src/params-validator');

let strValidator = validator.str(true, false, 0, 64)
try {
    console.log(strValidator.check('sdfgdfgsdfgd', 'title'));
} catch(e) {
    console.log(e.message);
}

let numValidator = validator.num(true, true, 0, 100);
try {
    console.log(numValidator.check(34, 'age'));
} catch(e) {
    console.log(e.message);
}

let boolValidator = validator.bool(true, false);
try {
    console.log(boolValidator.check(true, 'age'));
} catch(e) {
    console.log(e.message);
}

let arrValidator = validator.arr(true, true, 1, 4, validator.num(true, true, 1, 15));

try {
    console.log(arrValidator.check([12, 14, null], 'arr'));
} catch(e) {
    console.log(e.message);
}

let objValidator = validator.obj(true, true, {
    title: strValidator,
    age: numValidator,
    description: validator.str(false, false, 0, 1024)
});


try {
    console.log(objValidator.check({
        title: 'Roman',
        age: 34,
        description: ''
    }, 'params'));
} catch(e) {
    console.log(e.message);
}

/*

let inputParams = {
    title: 'ParamsValidator',
    version: 1,
    inProduction: false
}



var checkedParams;

try {
    checkedParams = validator.check(inputParams);
} catch (e) {
    console.log('Error: ' + e.message);
    return;
}

console.log(checkedParams);
*/