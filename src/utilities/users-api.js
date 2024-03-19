// //users-api.js talks to server but doesnt knpow anything about token

// // This is the base path of the Express route we'll define
// const BASE_URL = '/api/users';

// // this function is about sending pPOST request to server and 
// //include the userData in JSON format
// export async function signUp(userData) {
//   // Fetch uses an options object as a second arg to make requests
//   // other than basic GET requests, include data, headers, etc. 
//   const res = await fetch(BASE_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     // Fetch requires data payloads to be stringified
//     // and assigned to a body property on the options object
//     // req.body: JSON.stringify(userData)
//     body: JSON.stringify(userData)
//   });
//   // Check if request was successful
//   if (res.ok) {
//     // res.json() will resolve to the JWT
//   // client turn the req.body into res.json() format
//     return res.json();
//   } else {
//     throw new Error('Invalid Sign Up');
//   }
// }


// //This function is designed to work with a server that expects 
// //login credentials to be sent in a JSON format and 
// //responds with a token when the credentials are valid.
// export async function login(credentials) {
//   // Fetch uses an options object as a second arg to make requests
//   // other than basic GET requests, include data, headers, etc. 
//   const res = await fetch(BASE_URL + '/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     // Fetch requires data payloads to be stringified
//     // and assigned to a body property on the options object
//     body: JSON.stringify(credentials)
//   });
//   // Check if request was successful
//   if (res.ok) {
//     // res.json() will resolve to the JWT
//     return res.json();
//   } else {
//     throw new Error('Invalid Login');
//   }
// }

// Refactor the above code to below, and ass send-request.js file,both codes do the same task
import sendRequest from './send-request';
const BASE_URL = '/api/users';

// Refactored code below
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}