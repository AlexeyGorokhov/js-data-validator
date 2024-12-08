export type ValidationSchema = {
  type: 'any';

  isRequired: boolean;
  isRequiredMsg: string;
  required: (this: ValidationSchema, msg?: string) => ValidationSchema;
};
