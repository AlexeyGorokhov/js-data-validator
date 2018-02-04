# js-data-validator

Data validator and normalizer

## Introduction

__Important Note:__ This is work in progress. Please, don't use it in production yet.

This work is inspired by the awesome [joi](https://github.com/hapijs/joi) object schema validator.

Why another validation module? Error messages! When validating incoming data data in an API endpoint, we would like to inform clients with custom meaningful messages describing what's wrong with there requests. There is no way to do that with joi.

## Example

```js
const Jdv = require('js-data-validator');

const schema = Jdv.object().keys({
  userName: Jdv.string().required('my custom error message about missing "userName"'),
  password: Jdv.string().required('my custom error message about missing "password"')
                        .notEmpty('my custom error message about empty "password"'),
  avatarUrl: Jdv.string().defaultsTo('http://example.com/avatars/default')
});

const incomingData = {
  userName: 'John Smith'
};

const { data, errors } = Jdv.validate(schema, incomingData);

if (errors.length) {
  res.status(400).json({ errorMessages: errors.join(', ')});
  return;
}

// Here start using data
```

## API Reference

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Jdv](#jdv)
  - [validate(schema, data)](#validateschema-data)
  - [object()](#object)
    - [object.keys(obj)](#objectkeysobj)
      - [object.key.required([msg])](#objectkeyrequiredmsg)
      - [object.key.defaultsTo([value])](#objectkeydefaultstovalue)
    - [object.keysCaseInsensitive()](#objectkeyscaseinsensitive)
  - [array({ [schema], [msg] })](#array-schema-msg-)
    - [array.notEmpty([msg])](#arraynotemptymsg)
  - [string()](#string)
    - [string.notEmpty([msg])](#stringnotemptymsg)
    - [string.transform(fn)](#stringtransformfn)
    - [string.validate(fn, [msg])](#stringvalidatefn-msg)
  - [integer([msg])](#integermsg)
    - [integer.max(value, [msg])](#integermaxvalue-msg)
    - [integer.min(value, [msg])](#integerminvalue-msg)
  - [number([msg])](#numbermsg)
    - [number.max(value, [msg])](#numbermaxvalue-msg)
    - [number.min(value, [msg])](#numberminvalue-msg)
  - [boolean()](#boolean)
  - [ISODateString([msg])](#isodatestringmsg)
  - [uuid([msg])](#uuidmsg)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Jdv

#### validate(schema, data)

Validates `data` against `schema` and returns normalized data if the schema prescribes doing it. The method doesn't mutate passed `data`.

* `schema {Object}` - validation schema.

* `data {Any}` - data to be validated and normalized.

Returns `Object` with properties:

* `data {Any}` - normalized data.

* `errors {Array<String>}` - collection of error messages.

#### object()

Generates a schema to validate/normalize an object.

##### object.keys(obj)

Defines validation rules for object properties.

* `obj {Object}` - Object where each key is assigned a validation schema.

###### object.key.required([msg])

Creates validation rule for a key to be present in the object.

* `msg {String}` - Optional error message. Defaults to an empty string.

###### object.key.defaultsTo([value])

Creates normalization rule for a missing property in the `data` object to be set to the specified value.

* `value {Any}` - Optional. Value to be assigned to the missing property. Defaults to `null`.

##### object.keysCaseInsensitive()

Creates validation and normalization rule according to which object's keys are treated case insensitively.

Please note that if the data object has several keys that are case insensitively equal, the normalized data object will receive the value of the latest keys.

Example:

```javascript
const dataToProcess = {
  aa: 'foo',
  aA: 'bar',
  AA: 'baz'
};

const schema = Jdv.object().keys({
  aA: Jdv.string()
}).keysCaseInsensitive();

const { data} = Jdv.validate(schema, dataToProcess);

console.dir(data);
// { aA: 'baz' }
// Note that the normalized key name is as it is described by the schema, and its value is set
// to the value of the last case insensitively equal keys.
```

#### array({ [schema], [msg] })

Generates a schema to validate/normalize an array.

* `opts {Object}` - Optional. Options:

  * `schema {Object}` - Optional. Validation schema to be applied to each element of the array. If no schema passed, the array elements are not validated/normalized.

  * `msg {String}` - Optional. Error message to be included in the returned errors collection in case the passed data is not an array. Defaults to an empty string.

Example:

```javascript
const schema = Jdv.object().keys({
  userNames: Jdv.array({
    schema: Jdv.string().notEmpty('my custom error message'),
    msg: 'my custom error message for the case "userNames" is not an array'
  }).notEmpty('my custom error message for the case "userNames" is an empty array')
});
```

##### array.notEmpty([msg])

Creates validation rule for not allowing the array to be empty.

* `msg {String}` - Optional error message. Defaults to an empty string.

#### string()

Generates a schema to validate/normalize a string.

Any validated value is coerced to a string using `String()` constructor function.

##### string.notEmpty([msg])

Creates validation rule for not allowing the string to be empty.

* `msg {String}` - Optional error message. Defaults to an empty string.

##### string.transform(fn)

Creates transformation rule.

Transformation is applied before `validate` but after `notEmpty`.

* `fn {Function}` - User defined transformation function. The function is passed the string and supposed to return the transformed string. If `fn` is undefined or not a function, no transformation is applied.

Example:

```javascript
const myTransformFn = val => val + 'a';
const schema = Jdv.string().transform(myTransformFn);
```

##### string.validate(fn, [msg])

Creates user defined validation rule.

* `fn {Function}` - User defined validation function. The function is passed the string and supposed to return any value. If the returned value is falsey, validation failes. If `fn` is undefined or not a function, validation always succeeds.

* `msg {String}` - Optional error message. Defaults to an empty string.

Example:

```javascript
const myValidationFn = val => val === 'abc';
const schema = Jdv.string().validate(myValidationFn, 'expected "abc" string');
```

#### integer([msg])

Generates a schema to validate/normalize an integer value.

Any validated value is tried to be parsed into an integer.

* `msg {String}` - Optional error message. Defaults to an empty string.

Example:

```javascript
const schema = Jdv.integer('my custom error message in case the value is not an integer')
                  .max(100, 'my custom error message in case it is greater')
                  .min(0, 'my custom error message in case it is less');
});
```

##### integer.max(value, [msg])

Creates validation rule for a value to be less or equal to the passed maximum value.

* `value {Integer}` - Maximum value to compare with.

* `msg {String}` - Optional error message. Defaults to an empty string.

##### integer.min(value, [msg])

Creates validation rule for a value to be greater or equal to the passed minimum value.

* `value {Integer}` - Minimum value to compare with.

* `msg {String}` - Optional error message. Defaults to an empty string.



#### number([msg])

Generates a schema to validate/normalize a number value.

Any validated value is tried to be parsed into a number.

* `msg {String}` - Optional error message. Defaults to an empty string.

##### number.max(value, [msg])

Creates validation rule for a value to be less or equal to the passed maximum value.

* `value {Number}` - Maximum value to compare with.

* `msg {String}` - Optional error message. Defaults to an empty string.

##### number.min(value, [msg])

Creates validation rule for a value to be greater or equal to the passed minimum value.

* `value {Number}` - Minimum value to compare with.

* `msg {String}` - Optional error message. Defaults to an empty string.



#### boolean()

Generates a schema to validate/normalize a boolean value.

Before being validated, the value is coerced to a boolean using `Boolean()` constructor function.


#### ISODateString([msg])

Generates a schema to validate a string to be a correct UTC date representation in format `YYYY-MM-DDTHH:MM:SS.sssZ`.

* `msg {String}` - Optional error message. Defaults to an empty string.

If validation fails, the method normalizes the value to `null`.

#### uuid([msg])

Generates a schema to validate a string to be a correct UUID.

* `msg {String}` - Optional error message. Defaults to an empty string.

If validation fails, the method normalizes the value to `null`.
