import type { ValidationSchema } from './types/index.js';

const Jdv = {
  any(this: ValidationSchema): ValidationSchema {
    return {
      ...this,
      type: 'any',
    };
  },
};

export default Jdv;
