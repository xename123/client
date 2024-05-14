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

const normalizeDataObject = (obj: any): any => {
    let str = JSON.stringify(obj);
    str = str.replaceAll("_id", "id");
    const newObj = JSON.parse(str);
    const result = { ...newObj, category: newObj.categories };
    return result;
};

export const normalizeData = (data: any[]): any[] => {
    return data.map((item) => {
        return normalizeDataObject(item);
    });
};

export const getNormalizedGameDataById = async (url: string, id: string): Promise<any> => {
    const data = await getData(`${url}/${id}`);
    return isResponseOk(data) ? normalizeDataObject(data) : data;
};

export const authorize = async (url: string, data: any): Promise<any> => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (response.status !== 200) {
            throw new Error("Ошибка авторизации");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
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

