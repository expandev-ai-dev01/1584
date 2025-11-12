import { z } from 'zod';

/**
 * @summary Common Zod validation schemas
 * @description Reusable validation schemas for common data types
 */

/**
 * @summary String validations
 */
export const zString = z.string().min(1);
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

/**
 * @summary Name validation (1-200 characters)
 */
export const zName = z.string().min(1).max(200);

/**
 * @summary Description validation (max 500 characters, nullable)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary Numeric validations
 */
export const zNumber = z.number();
export const zPositiveNumber = z.number().positive();
export const zNonNegativeNumber = z.number().min(0);

/**
 * @summary Foreign key validation (positive integer)
 */
export const zFK = z.number().int().positive();
export const zNullableFK = z.number().int().positive().nullable();

/**
 * @summary Bit/Boolean validation
 */
export const zBit = z.union([z.literal(0), z.literal(1)]);

/**
 * @summary Date validations
 */
export const zDate = z.date();
export const zDateString = z.string().datetime();
export const zNullableDate = z.date().nullable();

/**
 * @summary Email validation
 */
export const zEmail = z.string().email();

/**
 * @summary Decimal validation (15,2 precision)
 */
export const zDecimal = z.number();

/**
 * @summary Price validation (18,6 precision)
 */
export const zPrice = z.number();
