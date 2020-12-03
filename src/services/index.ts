import request from "@/utils/request";

export async function queryUserList(params: any) {
    return request(`/api/list`, {
        cache: true,
        params: params
    });
}

export async function accountLogin(data: any) {
    return request("/api/login/account", {
        method: "post",
        data,
    });
}

export async function outLogin() {
    return request("/api/login/outLogin", {
        method: "post",
    });
}