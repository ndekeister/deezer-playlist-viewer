import { Injectable } from '@angular/core';
import { PlaylistPicture } from '@playlist/lib/models/playlist-picture.type';

@Injectable()
export class PlaylistPictureService {
  constructor() {}

  /**
   * Return what PlaylistPicture property to use when manipulating playlist picture
   */
  getPropertyToUse(
    containerWidth: number,
    nbPictureInARow: number
  ): PlaylistPicture {
    if (containerWidth <= 56 * nbPictureInARow) {
      return 'picture_small';
    } else if (containerWidth <= 120 * nbPictureInARow) {
      return 'picture';
    } else if (containerWidth <= 250 * nbPictureInARow) {
      return 'picture_medium';
    } else if (containerWidth <= 500 * nbPictureInARow) {
      return 'picture_big';
    } else {
      return 'picture_xl';
    }
  }
}
