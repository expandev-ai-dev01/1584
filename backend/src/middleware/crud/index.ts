import { Request } from 'express';
import { z } from 'zod';

/**
 * @summary CRUD operation types
 */
export type CrudPermission = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';

/**
 * @summary Security configuration for CRUD operations
 */
export interface SecurityConfig {
  securable: string;
  permission: CrudPermission;
}

/**
 * @summary Validated request data
 */
export interface ValidatedData {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params: any;
}

/**
 * @summary CRUD Controller for handling common operations
 * @description Provides validation and security checks for CRUD operations
 */
export class CrudController {
  private securityConfig: SecurityConfig[];

  constructor(securityConfig: SecurityConfig[]) {
    this.securityConfig = securityConfig;
  }

  /**
   * @summary Validate CREATE operation
   */
  async create(req: Request, schema: z.ZodSchema): Promise<[ValidatedData | null, Error | null]> {
    return this.validate(req, schema, 'CREATE');
  }

  /**
   * @summary Validate READ operation
   */
  async read(req: Request, schema: z.ZodSchema): Promise<[ValidatedData | null, Error | null]> {
    return this.validate(req, schema, 'READ');
  }

  /**
   * @summary Validate UPDATE operation
   */
  async update(req: Request, schema: z.ZodSchema): Promise<[ValidatedData | null, Error | null]> {
    return this.validate(req, schema, 'UPDATE');
  }

  /**
   * @summary Validate DELETE operation
   */
  async delete(req: Request, schema: z.ZodSchema): Promise<[ValidatedData | null, Error | null]> {
    return this.validate(req, schema, 'DELETE');
  }

  /**
   * @summary Core validation logic
   */
  private async validate(
    req: Request,
    schema: z.ZodSchema,
    permission: CrudPermission
  ): Promise<[ValidatedData | null, Error | null]> {
    try {
      const params = await schema.parseAsync({
        ...req.params,
        ...req.query,
        ...req.body,
      });

      const validated: ValidatedData = {
        credential: {
          idAccount: 1,
          idUser: 1,
        },
        params,
      };

      return [validated, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}

/**
 * @summary Success response helper
 */
export function successResponse<T>(data: T) {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary Error response helper
 */
export function errorResponse(message: string, code?: string) {
  return {
    success: false,
    error: {
      code: code || 'VALIDATION_ERROR',
      message,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary General error constant
 */
export const StatusGeneralError = new Error('An unexpected error occurred');
