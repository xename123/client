import axios from "axios";

export const getData = async (url: string): Promise<any> => {
    try {
        const response = axios.get(url);;
        return response;
    } catch (error) {
        return error;
    }
};
export const postData = async (url: string, data: Object): Promise<any> => {
    try {
        const response = axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });;
        console.log(response)
        return response;
    } catch (error) {
        return error;
    }
};

export const isResponseOk = (response: any): boolean => {
    return !(response instanceof Error);
};


export const setJWT = (jwt: string): void => {
    localStorage.setItem("jwt", jwt);
};

export const getJWT = (): string | null => {
    return localStorage.getItem("jwt");
};

export const removeJWT = (): void => {
    document.cookie = "jwt=;";
    localStorage.removeItem("jwt");
};



export const getMe = async (url: string, jwt: string): Promise<any> => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${jwt}` },
        });
        if (response.status !== 200) {
            throw new Error("Ошибка получения данных");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

