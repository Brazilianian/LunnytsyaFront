import axios from "axios";

let token = '';
let user = null;

export async function checkIsAuthorized() {
    token = getToken();

    return axios.get('/user', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200) {
            user = response.data;
            return true;
        }
        user = null;
        return false;
    }).catch(e => {
        if (checkForRefreshToken(e.response)) {
            return refreshToken(checkIsAuthorized);
        } else {
            return false;
        }
    });
}

export function checkIsAdmin() {
    token = getToken();
    return axios.get('/user', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200) {
            user = response.data;
            return user.roles.includes("ADMIN");
        } else {
            user = null;
            return false;
        }
    }).catch(e => {
        if (checkForRefreshToken(e.response)) {
            return refreshToken(checkIsAdmin);
        } else {
            return false;
        }
    })
}

export function getToken() {
    return localStorage.getItem("token");
}

export function checkForRefreshToken(response) {
    return response.headers['exception']?.toString().startsWith('JWT expired');
}

export function refreshToken(callback) {
    return axios.get('/auth/refresh-token', {
        headers: {
            'Authorization': 'Bearer ' + token,
            'isRefreshToken': 'true'
        }
    }).then(response => {
        if (response.status === 200) {
            localStorage.setItem('token', response.data.jwtToken);
            return callback();
        }
    })
}