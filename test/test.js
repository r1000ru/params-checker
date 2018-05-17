const validator = require('../src/params-validator');

let strValidator = validator.str(true, false, 0, 64)
try {
    console.log(strValidator.check('sdfgdfgsdfgd'));
} catch(e) {
    console.log(e.message);
}

let numValidator = validator.num(true, true, 0, 100);
try {
    console.log(numValidator.check(34));
} catch(e) {
    console.log(e.message);
}

let boolValidator = validator.bool(true, false);
try {
    console.log(boolValidator.check(true));
} catch(e) {
    console.log(e.message);
}

let arrValidator = validator.arr(true, true, 1, 4, validator.num(true, true, 1, 15));

try {
    console.log(arrValidator.check([12, 14, null]));
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
    }));
} catch(e) {
    console.log(e.message);
}

let enumValidator = validator.enum(true, true, ['red', 'blue', 'white']);

try {
    console.log(enumValidator.check('brown'));
} catch(e) {
    console.log(e.message);
}