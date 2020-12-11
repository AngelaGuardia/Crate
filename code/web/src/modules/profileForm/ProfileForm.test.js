import React from 'react';
import { getAllByRole, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {memoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../setup/store';
import ProfileForm from './ProfileForm.js';

jest.mock('../user/api/actions')

describe('ProfileForm', () => {
  it('should run a test', () => {
    let test = 1;
    expect(test).toEqual(1)
  })
})
