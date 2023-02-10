import axios, { AxiosInstance } from "axios";
import { ApiRequest, HttpMethod } from "../types";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json",
    },
});

export const request = async <T>({ url, httpMethod, queryString = {}, payload }: ApiRequest) => {
    switch (httpMethod) {
        case HttpMethod.GET:
            return await axiosInstance.get<T>(url, { params: queryString });
        case HttpMethod.POST:
            return await axiosInstance.post<T>(url, payload, { params: queryString });
        case HttpMethod.PUT:
            return await axiosInstance.put<T>(url, payload, { params: queryString });
        case HttpMethod.PATCH:
            return await axiosInstance.patch<T>(url, payload, { params: queryString });
        case HttpMethod.DELETE:
            return await axiosInstance.delete<T>(url, { params: queryString });
    }
};

export const get = async <T>(url: string) => {
    return await request<T>({
        url,
        httpMethod: HttpMethod.GET,
    });
};
