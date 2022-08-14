'use strict';

const Jdv = require('../index');

const schema = Jdv.record({
  schemaForKey: Jdv.uuid('keys must be UUIDs'),
  schemaForValue: Jdv.ISODateString('valus must be ISO date strings'),
  msg: 'expected a record'
}).notEmpty('record must not be empty');

{
  const dataToProcess = {
    '9378f5ca-e4ef-4cb5-8612-a3175f46c641': '2022-08-14T05:16:45.234Z',
    '31064709-5a27-41ae-b879-13d5369fe552': '2022-08-14T05:16:45.234Z'
  };

  const { data, errors } = Jdv.validate(schema, dataToProcess);

  console.dir(errors);
  // []

  console.dir(data);
  /*
  {
    '9378f5ca-e4ef-4cb5-8612-a3175f46c641': '2022-08-14T05:16:45.234Z',
    '31064709-5a27-41ae-b879-13d5369fe552': '2022-08-14T05:16:45.234Z'
  }
  */
}

{
  const dataToProcess = {
    'foo': '2022-08-14T05:16:45.234Z',
    'bar': '2021-10-14T05:16:45.000Z',
    '31064709-5a27-41ae-b879-13d5369fe552': '2022-08-14T05:16:45.234Z'
  };

  const { data, errors } = Jdv.validate(schema, dataToProcess);

  console.dir(errors);
  // [ 'keys must be UUIDs', 'keys must be UUIDs' ]

  console.dir(data);
  /*
  {
    null: '2021-10-14T05:16:45.000Z',
    '31064709-5a27-41ae-b879-13d5369fe552': '2022-08-14T05:16:45.234Z'
  }
  */
}

{
  const dataToProcess = {
    '9378f5ca-e4ef-4cb5-8612-a3175f46c641': 'foo',
    '31064709-5a27-41ae-b879-13d5369fe552': 5
  };

  const { data, errors } = Jdv.validate(schema, dataToProcess);

  console.dir(errors);
  // [ 'valus must be ISO date strings', 'valus must be ISO date strings' ]

  console.dir(data);
  /*
  {
    '9378f5ca-e4ef-4cb5-8612-a3175f46c641': null,
    '31064709-5a27-41ae-b879-13d5369fe552': null
  }
  */
}

{
  const dataToProcess = {};

  const { data, errors } = Jdv.validate(schema, dataToProcess);

  console.dir(errors);
  // [ 'record must not be empty' ]

  console.dir(data);
  // {}
}

process.exit(0);
