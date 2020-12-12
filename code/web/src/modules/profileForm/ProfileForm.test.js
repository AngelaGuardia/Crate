import React from 'react';
import { getAllByRole, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
// import { store } from '../../setup/store';
import ProfileForm from './ProfileForm.js';
import userEvent from '@testing-library/user-event';
jest.mock('../user/api/actions.js');
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";


describe('ProfileForm', () => {

  const mockStore = configureStore([thunk])
  const store = mockStore({
    user: {
      details: {

        
        img: '',
        address: '',
        email: '',
        description: '',
      },
      isEditMode: true
    },
    saveProfile: () => jest.fn(),
    changeEditMode:() => {
      console.log('dying on the outside')
      // this.user.isEditMode = !this.user.isEditMode
    }
    // changeEditMode() {
    //   this.isEditMode = !this.isEditMode
    // }
    // surveyItems: {
    //   isLoading: false,
    //   surveyItems: [
    //     {image: "image1.jpg",
    //   score: 1
    // }
    //   ]
    // }
  })

  store.dispatch = jest.fn()
  // store.saveProfile = jest.fn()
  // store.changeEditMode = () => {
  //   store.isEditMode = !store.isEditMode
  // }
  let history, updateProfile;
  beforeEach(() => {
    history = createMemoryHistory()
    render(
      <Provider store={store} key="provider">
        <Router history={history}>
          <ProfileForm />
        </Router>
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

    // sad paths
    
    const profileSaveModeTest = screen.queryByTestId('profile-save-mode');
    const profileEditButtonTest = screen.queryByTestId('profile-edit-button');

    expect(profileSaveModeTest).toEqual(null);
    expect(profileEditButtonTest).toEqual(null);

  })
  
  it('should display the ProfileForm\'s saved mode on after clicking the save button', () => {

    
    const profileSaveButtonTest = screen.getByTestId('profile-save-button');


    // store.changeEditMode.mockResolvedValueOnce = () => {
    //   store.isEditMode = !store.isEditMode
    // }
    userEvent.click(profileSaveButtonTest);

    // expect(store.changeEditMode).toHaveBeenCalled(1)
    
    // const profileEditModeTest = screen.queryByTestId('profile-edit-mode');
    // expect(profileEditModeTest).toEqual(null);
    // const profileSaveModeTest = screen.queryByTestId('profile-save-mode');
    // expect(profileSaveModeTest).toBeInTheDocument();
    // const profileFormTest = screen.queryByTestId('profile');
    
    // expect(profileFormTest).toEqual(null);
    // expect(profileSaveButtonTest).toEqual(null);

    // // sad paths
    
    // const profileEditButtonTest = screen.queryByTestId('profile-edit-button');

    // expect(profileEditButtonTest).toBeInTheDocument();

    // screen.debug()
  })
})
