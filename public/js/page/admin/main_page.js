import axios from "axios";
import {getToken} from "../../security";

let token = null;

export function saveAuthor(author) {
    token = getToken();
    return axios.post('/main-page/author', author, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then((response) => {
        return response;
    }).catch(error => {
        return error.response;
    })
}

export function saveBackground(backgroundImage) {
    token = getToken();
    return axios.post('/main-page/background-image', backgroundImage, {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response;
        })
}

export function getBackgroundImage() {
    token = getToken();
    return axios.get('/main-page/background-image/get-main', {
        headers: {
            'Authorization': 'Bearer ' + token
        }}).then(response => {
            return response.data;
        })
}

export function getAuthor() {
    token = getToken();
    return axios
        .get('/main-page/author', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            return response.data;
        });
}