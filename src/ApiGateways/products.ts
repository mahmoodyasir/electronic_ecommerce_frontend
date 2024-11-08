import { url } from "../config";
import { FilterTypes } from "../utils/utils";

export const getAllfilteredProduct = async (
  page: number,
  limit: number,
  body: FilterTypes,
  handleSuccess: (data?: any) => void,
  handleError: (err?: any) => void
) => {

  try {
    const response = await fetch(`${url}/api/products/filter?skip=${page}&limit=${limit}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)

      });

    const jsonData = await response.json();
    if (response.status === 200) handleSuccess(jsonData);
    else handleError(jsonData);
  }
  catch (err) {
    handleError(err)
  }
};


export const getFeature = async (
  category: string,
  handleSuccess: (data?: any) => void,
  handleError: (err?: any) => void
) => {
  try {
    const response = await fetch(`${url}/api/products/get_feature?category=${category}`, {
      method: "GET",
      headers: {

      }
    })

    const jsonData = await response.json();

    if (response.status === 200) handleSuccess(jsonData);
    else handleError(jsonData);
  } catch (err) {
    handleError(err);
  }
}


export const getProductById = async (id: any,
  handleSuccess: (data?: any) => void,
  handleError: (err?: any) => void
) => {

  try {
    const response = await fetch(`${url}/api/products/${id}/`, {
      method: 'GET',
    });

    const jsonData = await response.json();

    if (response.status === 200) handleSuccess(jsonData);
    else handleError(jsonData);

  } catch (err) {
    handleError(err);
  }
}