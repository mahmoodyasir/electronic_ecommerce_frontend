import { url } from "../config";

export const createUser = (body: Object, handleSuccess: (data?: any) => void, handleError: (err?: any) => void) => {
    fetch(`${url}/api/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(res => {
        if (res.status !== 201) handleError(res)
        else return res.json();
    }).then(data => handleSuccess(data));
}


export const loginUser = (body: Object, handleSuccess: (data?: any) => void, handleError: (err?: any) => void) => {
    fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => {
        if (res.status !== 200) handleError(res)
        else return res.json()
    }).then((data) => {
        handleSuccess(data)
    });
}


export const loginAdmin = (body: Object, handleSuccess: (data?: any) => void, handleError: (err?: any) => void) => {
    fetch(`${url}/api/user/admin_login`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => {
        if (res.status !== 200) handleError(res)
        else return res.json()
    }).then((data) => {
        handleSuccess(data)
    });
}


export const getUser = (handleSuccess: (data?: any) => void, handleError: (err?: any) => void) => {
    fetch(`${url}/api/user/get_user`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
        },
    })
        .then((res) => {
            if (res.status !== 200) {
                throw new Error('Network request failed');
            } else {
                return res.json();
            }
        })
        .then((data) => {
            handleSuccess(data);
        })
        .catch((error) => {
            handleError(error.message);
        });
}


export const refreahAccessToken = async (body: any, handleSuccess: (data?: any) => void, handleError: (err?: any) => void) => {
    try {
        const response = await fetch(`${url}/api/user/token/refresh`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(body),
        })

        const jsonData = await response.json();

        if (response.status === 200) handleSuccess(jsonData);
        else handleError(jsonData);
    } catch (err) {
        handleError(err);
    }
}



export const updateUser = async (body: any, handleSuccess: (data?: any) => void, handleError: (err?: any) => void) => {
    try {
        const response = await fetch(`${url}/api/user/update_user`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
            },
            body,
        })

        const jsonData = await response.json();

        if (response.status === 200) handleSuccess(jsonData);
        else handleError(jsonData);
    } catch (err) {
        handleError(err);
    }
}

