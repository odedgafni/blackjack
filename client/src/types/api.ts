export interface ApiRequest {
    url: string;
    httpMethod: HttpMethod;
    queryString?: object;
    payload?: any;
    headers?: {};
}

export enum HttpMethod {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE,
}

export type GetResponse<K extends string, V> = {
    success: boolean;
} & {
    [key in K]: V;
};