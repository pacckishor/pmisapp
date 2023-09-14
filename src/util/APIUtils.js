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



export function saveActivity(saveActivityRequest) {
    return request({
        url: API_BASE_URL + "/activity/save",
        method: 'POST',
        body: JSON.stringify(saveActivityRequest)
    });
}

export function getAllGeneralInfo() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/generalinfo",
        method: 'GET'
    });
}

export function getActivityById(id) {
    return request({
        url: API_BASE_URL + "/activity/getActivityById/" + id,
        method: 'GET'
    });
}

export function updateActivity(id, updateActivityRequest) {
    return request({
        url: API_BASE_URL + "/activity/updateActivity/" + id,
        method: 'PUT',
        body: JSON.stringify(updateActivityRequest)
    });
}


export function deleteActivity(id) {
    return request({
        url: API_BASE_URL + "/activity/deleteActivity/" + id,
        method: 'DELETE'
    });
}


export function savePostingStatus(postingStatusRequest){
    return request({
        url: API_BASE_URL + "/postingstatus",
        method: 'POST',
        body: JSON.stringify(postingStatusRequest)
    }); 
}

export function saveForeignTraining(foreignTrainingInfoRequest){
    return request({
        url: API_BASE_URL + "/foreigntrainings",
        method: 'POST',
        body: JSON.stringify(foreignTrainingInfoRequest)
    }); 
}


export function savePromotion(promotionRequest){
    return request({
        url: API_BASE_URL + "/promotion",
        method: 'POST',
        body: JSON.stringify(promotionRequest)
    }); 
}

export function saveSpouseInfo(spouseInfoRequest){
    return request({
        url: API_BASE_URL + "/spouseinfo",
        method: 'POST',
        body: JSON.stringify(spouseInfoRequest)
    }); 
}