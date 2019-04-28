/// <reference types="Cypress" />

import { getUserSelectionCardExploreButton } from '../support/app.po';

describe('Home page', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getUserSelectionCardExploreButton().contains('Explore playlists');
  });
});
