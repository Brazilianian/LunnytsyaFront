import router from "../../../src/router";

export function logout() {
    localStorage.setItem('token', '');
    router.push('/login');
}

