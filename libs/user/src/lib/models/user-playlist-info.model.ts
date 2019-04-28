import * as faker from 'faker/locale/en_US';
import * as PlaylistBasicModel from '@playlist/lib/models/playlist-basic.model';

export interface UserPlaylistInfo {
  // list of playlist with some basic information
  list: PlaylistBasicModel.PlaylistBasic[];
  // total number of playlist
  total: number;
}

/**
 * A utility function used to generate a mock object
 */
export const generateResult = (min = 1, max = 25): UserPlaylistInfo => {
  const nbPlaylist = faker.random.number({
    min,
    max
  });
  return {
    list: new Array(nbPlaylist)
      .fill(null)
      .map(() => PlaylistBasicModel.generateResult()),
    total: nbPlaylist
  };
};
