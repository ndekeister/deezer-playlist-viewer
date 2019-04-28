import * as faker from 'faker/locale/en_US';

/**
 * A representation of an deezer user
 */
export interface User {
  // the id of the user
  readonly id: number;
  // the name of the user
  readonly name: string;
  // url to the small avatar of the user
  readonly picture_small: string;
}

/**
 * A utility function used to generate a mock object
 */
export const generateResult = (id?: number): User => ({
  id: id || faker.random.number(),
  name: faker.random.word(),
  picture_small: 'assets/images/no-avatar.png'
});
