import { ValidationError } from 'class-validator';

export interface FormattedError {
  field: string;
  message: string;
}

export function flattenValidationMessages(
  errors: ValidationError[],
  parentPath = '',
): FormattedError[] {
  const results: FormattedError[] = [];

  errors.forEach((error) => {
    const currentPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    if (error.children?.length) {
      results.push(...flattenValidationMessages(error.children, currentPath));
    }

    if (error.constraints) {
      Object.values(error.constraints).forEach((constraint) => {
        results.push({
          field: currentPath,
          message: constraint,
        });
      });
    }
  });

  return results;
}
