var StringParam = function(required, nullable, min, max) {
    this._required = required;
    this._nullable = nullable;
    this._min = min || 0;
    this._max = max || Infinity;
}

var NumberParam = function(required, nullable, min, max) {
    this._required = required;
    this._nullable = nullable;
    this._min = min;
    this._max = max;
}

var BooleanParam = function(required, nullable) {
    this._required = required;
    this._nullable = nullable;
}

var ArrayParam = function(required, nullable, min, max, content) {
    this._required = required;
    this._nullable = nullable;
    this._min = min || 0;
    this._max = max || Infinity;
    this._content = content;
}

var ObjectParam = function(required, nullable, content) {
    this._required = required;
    this._nullable = nullable;
    this._content = content;
}

StringParam.prototype.check = function(param, key) {
    // Если параметр не передан
    if (param === undefined) {
        if (this._required) {
            throw new Error(key + ' is required');
        }
        return param;
    }

    // Если параметр равен null
    if (param === null) {
        if (!this._nullable) {
            throw new Error(key + ' is not nullable');
        }
        return null;
    }

    if (typeof(param) !== 'string') {
        throw new Error(key + ' must be string');
    }

    if (typeof(param) === 'string' && param.length < this._min) {
        throw new Error(key + ' must have minimum ' + this._min + ' chars');
    }

    if (typeof(param) === 'string' && param.length > this._max) {
        throw new Error(key + ' must have maximum ' + this._max + ' chars');
    }
    
    return param;
}


NumberParam.prototype.check = function(param, key) {
    // Если параметр не передан
    if (param === undefined) {
        if (this._required) {
            throw new Error(key + ' is required');
        }
        return param;
    }

    // Если параметр равен null
    if (param === null) {
        if (!this._nullable) {
            throw new Error(key + ' is not nullable');
        }
        return null;
    }

    // Если параметр не число
    if (typeof(param) !== 'number') {
        throw new Error(key + ' must be number');
    }

    if (this._min !== undefined && param < this._min) {
        throw new Error(key + ' must be equal or greater ' + this._min);
    }

    if (this._max !== undefined && param > this._max) {
        throw new Error(key + ' must be less or equal ' + this._max);
    }

    return param;
}



BooleanParam.prototype.check = function(param, key) {
    // Если параметр не передан
    if (param === undefined) {
        if (this._required) {
            throw new Error(key + ' is required');
        }
        return param;
    }

    // Если параметр равен null
    if (param === null) {
        if (!this._nullable) {
            throw new Error(key + ' is not nullable');
        }
        return null;
    }

    // Если параметр не число
    if (typeof(param) !== 'boolean') {
        throw new Error(key + ' must be boolean');
    }

    return param;
}


ArrayParam.prototype.check = function(param, key) {
    // Если параметр не передан
    if (param === undefined) {
        if (this._required) {
            throw new Error(key + ' is required');
        }
        return param;
    }

    // Если параметр равен null
    if (param === null) {
        if (!this._nullable) {
            throw new Error(key + ' is not nullable');
        }
        return null;
    }

    if (!Array.isArray(param)) {
        throw new Error(key + ' must be array');
    }

    if (param.length < this._min) {
        throw new Error(key + ' must have minimum ' + this._min + ' elements');
    }

    if (param.length > this._max) {
        throw new Error(key + ' must have maximum ' + this._max + ' elements');
    }

    if (this._content) {
        for (let i in param) {
            this._content.check(param[i], key + '[' + i + ']');
        }
    }
    
    return param;
}

ObjectParam.prototype.check = function(param, key) {
    // Если параметр не передан
    if (param === undefined) {
        if (this._required) {
            throw new Error(key + ' is required');
        }
        return param;
    }

    // Если параметр равен null
    if (param === null) {
        if (!this._nullable) {
            throw new Error(key + ' is not nullable');
        }
        return null;
    }

    if (!param || typeof(param) !== 'object' || Array.isArray(param)) {
        throw new Error(key + ' must be object');
    }

    var result = {};

    // Проверяем каждое свойство объекта
    for (let property in this._content) {
        let val =this._content[property].check(param[property], key + '.' + property);
        // Сохраняем только те, что определены
        if (val !== undefined) {
            result[property] = val;
        }
    }
    
    return result;
}

/**
 * Create rule for checking string
 * 
 * @param {boolean} required Parametr must be defined (default TRUE)
 * @param {boolean} nullable Parametr can be NULL (default FALSE) 
 * @param {*} min Minimum charasters in string (default 0)
 * @param {*} max Maximum charasters in string (default Infinity)
 */
module.exports.str = function(required, nullable, min, max) {
    return new StringParam(!!required, !!nullable, min, max);
}

/**
 * Create rule for checking number
 * 
 * @param {boolean} required Parametr must be defined (default TRUE)
 * @param {boolean} nullable Parametr can be NULL (default FALSE)
 * @param {*} min Minimum value (default -Infinity)
 * @param {*} max Maximum value (default Infinity)
 */
module.exports.num = function(required, nullable, min, max) {
    return new NumberParam(!!required, !!nullable, min, max);
}


/**
 * Create rule for checking boolean
 * 
 * @param {boolean} required Parametr must be defined (default TRUE)
 * @param {boolean} nullable Parametr can be NULL (default FALSE)
 */
module.exports.bool = function(required, nullable) {
    return new BooleanParam(!!required, !!nullable);
}

/**
 * Create rule for checking array
 * 
 * @param {boolean} required Parametr must be defined (default TRUE)
 * @param {boolean} nullable Parametr can be NULL (default FALSE)
 * @param {number} min Minimim elements in array (default 0)
 * @param {number} max Maximum elements in array (default Infinity)
 * @param {object} rule Rule for checking every elements (if rule defined)
 */
module.exports.arr = function(required, nullable, min, max, rule) {
    return new ArrayParam(!!required, !!nullable, min, max, rule);
}

/**
 * Create rule for checking object
 * 
 * @param {boolean} required Parametr must be defined (default TRUE)
 * @param {boolean} nullable Parametr can be NULL (default FALSE)
 * @param {object} content Object, then every property some as in data and value - rule object for this key type
 */
module.exports.obj = function(required, nullable, content) {
    return new ObjectParam(required, nullable, content);
}
