import axios from "axios";
import {getToken} from "./security";

let token = null;

export function createProduct(product) {
    token = getToken();
    return axios.post('/product', product, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
                return error.response;
            }
        );
}

export function getProductById(id) {
    token = getToken();

    return axios.get('/product/' + id, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            return response.data
        }).catch(() => {
            return null;
        });
}

export function deleteProductById(id) {
    token = getToken()
    return axios.delete('/product/' + id, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => {
        return res.data;
    }).catch(() => {
        return null
    });
}

export function editProduct(product) {
    token = getToken();
    return axios.put('/product', product, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => {
                return response;
            }
        )
        .catch(error => {
            if (error.response.status === 422) {
                return error.response
            } else {
                return null;
            }
        })
}