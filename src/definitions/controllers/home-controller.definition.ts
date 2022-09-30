import { DataProperty } from '@bakku/platform';

export declare namespace HomeController {}

export const HomeController = {
  path: '',
  children: {
    hello: 'hello',
  },
};

export class HelloQueries {
  @DataProperty({ description: 'name of person', type: 'string', validation: { isRequired: true } })
  name: string;
}
