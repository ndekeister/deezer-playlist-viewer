import * as faker from 'faker/locale/en_US';

export interface PlaylistBasic {
  // the id of the playlist
  id: number;
  // the playlist title
  title: string;
  // link to the playlist picture
  picture: string;
  // link to the playlist picture, size small
  picture_small: string;
  // link to the playlist picture, size medium
  picture_medium: string;
  // link to the playlist picture, size big
  picture_big: string;
  // link to the playlist picture, size xl
  picture_xl: string;
}

/**
 * A utility function used to generate a mock object
 */
export const generateResult = (id?: number): PlaylistBasic => ({
  id: id || faker.random.number(),
  title: faker.random.word(),
  picture: 'assets/images/no-avatar.png',
  picture_small: 'assets/images/no-avatar.png',
  picture_medium: 'assets/images/no-avatar.png',
  picture_big: 'assets/images/no-avatar.png',
  picture_xl: 'assets/images/no-avatar.png'
});
