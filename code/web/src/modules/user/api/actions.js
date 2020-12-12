// Imports
import axios from "axios";
import { query, mutation } from "gql-query-builder";
import cookie from "js-cookie";

// App Imports
import { routeApi } from "../../../setup/routes";

// Actions Types
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'
export const CHANGE_EDIT_MODE = 'AUTH/CHANGE_EDIT_MODE'
export const SAVE_PROFILE = 'AUTH/SAVE_PROFILE'
export const GET_PRODUCTS_HISTORY = 'AUTH/GET_PRODUCTS_HISTORY'

// Actions

//Set edit mode for user

export function changeEditMode(user) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_EDIT_MODE,
      user,
    });
  };
}

//Set product history
export function getProductsHistory() {
  return dispatch => {
    let deliveries, products;
    axios.post(routeApi, query({
      operation: 'deliveries',
      fields: ['user{id}', 'product{id}', 'id', 'kept']
    })).then(response => deliveries = response)
    axios.post(routeApi, query({
      operation: 'products',
      fields: ['id', 'name', 'slug', 'description', 'image', 'createdAt', 'updatedAt']
    })).then(response => products = response).then(()=>{
      dispatch({
        type: GET_PRODUCTS_HISTORY,
        deliveries,
        products
      })
    })
  }
}

// Set a user after login or using localStorage token
export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  return { type: SET_USER, user };
}

export function saveProfile(updatedDetails, subDetails, userSubs) {
  if (subDetails.nextDeliveryDate) {
    userSubs.forEach((sub) => {
      subDetails.id = sub
      axios.post(
        routeApi,
        mutation({
          operation: "subscriptionUpdate",
          variables: subDetails,
          fields: ["id"],
        })
      );
    });
  }
  return (dispatch) => {
    axios.post(
      routeApi,
      mutation({
        operation: "userUpdate",
        variables: updatedDetails,
        fields: ["id"],
      })
    );
    dispatch({
      type: SAVE_PROFILE,
      email: updatedDetails.email,
      img: updatedDetails.image,
      description: updatedDetails.description,
      address: updatedDetails.address,
    });
  };
}

// Login a user using credentials
export function login(userCredentials, isLoading = true) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading,
    });

    return axios
      .post(
        routeApi,
        query({
          operation: "userLogin",
          variables: userCredentials,
          fields: ["user {name, email, role, id}", "token"],
        })
      )
      .then((response) => {
        let error = "";

        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message;
        } else if (response.data.data.userLogin.token !== "") {
          const token = response.data.data.userLogin.token;
          const user = response.data.data.userLogin.user;

          dispatch(setUser(token, user));

          loginSetUserLocalStorageAndCookie(token, user);
        }

        dispatch({
          type: LOGIN_RESPONSE,
          error,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_RESPONSE,
          error: "Please try again",
        });
      });
  };
}

// Set user token and info in localStorage and cookie
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("user", JSON.stringify(user));

  // Set cookie for SSR
  cookie.set("auth", { token, user }, { path: "/" });
}

// Register a user
export function register(userDetails) {
  return (dispatch) => {
    return axios.post(
      routeApi,
      mutation({
        operation: "userSignup",
        variables: userDetails,
        fields: ["id", "name", "email"],
      })
    );
  };
}

// Log out user and remove token from localStorage
export function logout() {
  return (dispatch) => {
    logoutUnsetUserLocalStorageAndCookie();

    dispatch({
      type: LOGOUT,
    });
  };
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");

  // Remove cookie
  cookie.remove("auth");
}

// Get user gender
export function getGenders() {
  return (dispatch) => {
    return axios.post(
      routeApi,
      query({
        operation: "userGenders",
        fields: ["id", "name"],
      })
    );
  };
}
