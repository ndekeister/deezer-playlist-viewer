import * as faker from 'faker/locale/en_US';

import * as PlaylistBasicModel from '@playlist/lib/models/playlist-basic.model';
import * as PlaylistTrackModel from '@playlist/lib/models/playlist-track.model';

export interface PlaylistFull extends PlaylistBasicModel.PlaylistBasic {
  author: string;
  duration: number;
  nbFans: number;
  nbTracks: number;
  tracks: PlaylistTrackModel.PlaylistTrack[];
}

/**
 * A utility function used to generate a mock object
 */
export const generateResult = (id?: number): PlaylistFull => {
  const nbTracks = faker.random.number();
  return {
    ...PlaylistBasicModel.generateResult(id),
    author: faker.random.word(),
    duration: faker.random.number(),
    nbFans: faker.random.number(),
    nbTracks,
    tracks: new Array(nbTracks).map(() => PlaylistTrackModel.generateResult())
  };
};
