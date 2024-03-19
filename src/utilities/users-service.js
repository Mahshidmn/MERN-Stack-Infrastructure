// user-service knows everything about token

import * as usersAPI from './users-api';
// sends data to the server via API function and gets
//back a token which is stored in localStorage
export async function signUp (userData) {
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token);
    return getUser();
}

export async function login(credentials) {
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token);
    return getUser();
}

export function logOut() {
    localStorage.removeItem('token');
}

export function getToken() {
    const token = localStorage.getItem('token');

    if (!token) return null;
    // obtain payload of the token
    // JSON.parse() takes the string that represents a 
    //JSON object and converts it into an actual JavaScript object.
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() /1000) {
        localStorage.removeItem('token');
        return null;
    }
    return token;
}

export function getUser() {
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function checkToken() {
    return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr));
}