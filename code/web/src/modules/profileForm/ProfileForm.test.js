import React from 'react';
import { getAllByRole, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../setup/store';
import ProfileForm from './ProfileForm.js';

jest.mock('../user/api/actions')

describe('ProfileForm', () => {

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileForm />
        </MemoryRouter>
      </Provider>
    )
  })
  it('should display the ProfileForm\'s edit mode on load', () => {

    const profileFormTest = screen.queryByTestId('profile');
    const profileEditModeTest = screen.queryByTestId('profile-edit-mode');
    const profileSaveButtonTest = screen.queryByTestId('profile-save-button');
    
    expect(profileFormTest).toBeInTheDocument();
    expect(profileEditModeTest).toBeInTheDocument();
    expect(profileSaveButtonTest).toBeInTheDocument();


    screen.debug()
  })
})
