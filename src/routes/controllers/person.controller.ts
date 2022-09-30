/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Headers,
  HttpCodeStatuses,
  newBakkuHttpError,
  Post,
  ResponseSchemaError,
  ResponseSchemaSuccess,
} from '@bakku/platform';

import { BakkuHttpErrorCodes, Header, HeaderSchema, Person, PersonController } from 'src/definitions';

@Controller({
  name: Symbol('PersonController'),
  path: PersonController.path,
})
export class PersonControllerImpl {
  @Post(PersonController.children.create, 'Create a person')
  @ResponseSchemaSuccess({ propertyType: Person }, 'Return create success response')
  @ResponseSchemaError([
    newBakkuHttpError(HttpCodeStatuses[401]),
    newBakkuHttpError({ ...BakkuHttpErrorCodes.invalid_authorized_state, ...HttpCodeStatuses[403] }),
  ])
  helloAnonymous(@Headers(HeaderSchema) { apiKey }: Header, @Body() person: Person): string {
    console.log({ apiKey });
    return `hello ${person || 'anonymous'}! Welcome to my service.`;
  }
}
