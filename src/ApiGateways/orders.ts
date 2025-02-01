import { url } from "../config";

export const getCustomersOrder = async (
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {
    try {
        const response = await fetch(`${url}/api/orders/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
            }
        });

        const jsonData = await response.json();

        if (response.status === 200) handleSuccess(jsonData);
        else handleError(jsonData);

    } catch (err) {
        handleError(err);
    }
}


export const createOrder = async (
    body: any,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {
    try {
        const response = await fetch(`${url}/api/orders/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
            },
            body: JSON.stringify(body)
        });

        const jsonData = await response.json();

        if (response.status === 201) handleSuccess(jsonData);
        else handleError(jsonData);

    } catch (err) {
        handleError(err);
    }
}


export const validatePayment = async (
    body: any,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {
    try {
        const response = await fetch(`${url}/api/orders/validation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        const jsonData = await response.json();

        if (response.status === 200) handleSuccess(jsonData);
        else handleError(jsonData);

    } catch (err) {
        handleError(err);
    }
}