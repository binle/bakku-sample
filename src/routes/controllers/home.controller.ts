/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  ResponseSchemaSuccess,
  Get,
  IObjectSchema,
  IStringSchema,
  Queries,
  ResponseDataSuccess,
  Middleware,
} from '@bakku/platform';

import { HomeController } from 'src/definitions';

export const StringSchema: IStringSchema = { type: 'string' };

const querySchema: IObjectSchema = {
  type: 'object',
  properties: {
    name: StringSchema,
  },
};

@Controller({
  name: Symbol('HomeController'),
  path: HomeController.path,
})
export class HomeControllerImpl {
  @Get(HomeController.children.hello, 'Hello ')
  @ResponseSchemaSuccess(
    { type: 'file', bodyContentType: 'text/plain' } as ResponseDataSuccess,
    'Return message welcome!'
  )
  helloAnonymous(@Queries(querySchema) queries: { name: string }): string {
    return `hello ${queries.name || 'anonymous'}! Welcome to my service.`;
  }
}
