import {
  DataProperty,
  DataPropertyOptional,
  IArraySchema,
  IObjectSchema,
  IStringSchema,
  IValidationError,
  StringSchema,
  ValidationError,
} from '@bakku/platform';

import { Car as Car2 } from './test';

/* eslint-disable @typescript-eslint/no-explicit-any */
export declare namespace PersonController {}

export class Car {
  @DataProperty({ description: 'name of car', type: 'string' })
  name: string;
}

export class Profile {
  @DataProperty({ description: 'identity number', type: 'string' })
  identity: string;
}

export class Person {
  @DataProperty({
    validation: {
      validate: async (data?: string, pathName?: string): Promise<IValidationError | undefined> => {
        // validate name
        if (data && data.length > 4) {
          return undefined;
        }
        return new ValidationError(
          pathName || 'name',
          `${pathName || 'name'} is too short, it should be longer than 4 chars!`
        );
      },
    },
  })
  name: string;

  @DataProperty({
    validation: { format: 'isEmail' },
  } as IStringSchema)
  email: string;

  @DataPropertyOptional({
    itemSchema: { propertyType: Car },
  } as IArraySchema)
  car: Car[];

  @DataPropertyOptional({ description: ' Main car ' })
  mainCar: Car2;

  @DataProperty()
  profile: Profile;

  @DataProperty()
  temp: { [key: string]: string };

  @DataPropertyOptional()
  marriedPerson: Person;
}

export const HeaderSchema: IObjectSchema = {
  type: 'object',
  properties: {
    apiKey: StringSchema,
  },
};

export class Header {
  apiKey: string;
}

export const PersonController = {
  path: 'person',
  children: {
    create: '',
    update: '',
    list: '',
    detail: ':id',
    delete: ':id',
  },
};
