module.exports = {
  name: 'deezer-playlist-viewer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/deezer-playlist-viewer/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
