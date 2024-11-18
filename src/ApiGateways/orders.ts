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