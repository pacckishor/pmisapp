import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/sa/users/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/sa/users/checkUsername?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/sa/users/checkEmail?email=" + email,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/sa/users/me",
        method: 'GET',
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/sa/users/" + username,
        method: 'GET'
    });
}

export function getRecords(endpoint) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/"+endpoint,
        method: 'GET'
    });
}

export function getRecordById(endpoints, id) {
    return request({
        url: API_BASE_URL + endpoints + id,
        method: 'GET'
    });
}

export function saveRecord(saveRequest, endpoint){
    return request({
        url: API_BASE_URL + endpoint,
        method: 'POST',
        body: JSON.stringify(saveRequest)
    });
}

export function updateRecord(updateRequest, endpoint, id) {
    return request({
        url: API_BASE_URL + endpoint + id,
        method: 'PUT',
        body: JSON.stringify(updateRequest)
    });
}

export function deleteRecord(endpoints,id) {
    return request({
        url: API_BASE_URL + endpoints + id,
        method: 'DELETE'
    });
}