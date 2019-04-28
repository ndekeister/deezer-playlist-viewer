import * as faker from 'faker/locale/en_US';

export interface PlaylistTrack {
  artistName: string;
  duration: number;
  id: number;
  preview: string;
  title: string;
}

/**
 * A utility function used to generate a mock object
 */
export const generateResult = (): PlaylistTrack => ({
  artistName: faker.random.word(),
  duration: faker.random.number(),
  id: faker.random.number(),
  preview: 'http://example.com/test.mp3',
  title: faker.random.word()
});
