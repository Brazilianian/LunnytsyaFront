import axios from "axios";
import {checkForRefreshToken, getToken, refreshToken} from "./security";

let token = '';

export function getProfile() {
    token = getToken()
    return axios.get('/profile', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200) {
            let user = response.data;
            return getProfileFromUser(user);
        } else {
            return null;
        }
    }).catch((e) => {
        if (checkForRefreshToken(e.response)) {
            return refreshToken(getProfile);
        } else {
            return null;
        }
    })
}

export function saveProfileChanges(profile) {
    token = getToken()
    return axios.put('/profile', profile, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        return response;
    }).catch((e) => {
        if (checkForRefreshToken(e.response)) {
            return refreshToken(saveProfileChanges);
        } else {
            return e.response;
        }
    });
}

function getProfileFromUser(user) {
    return {
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        image: user.image,
        phone: user.phone,
    }
}