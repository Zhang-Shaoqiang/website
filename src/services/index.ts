import request from "@/utils/request";

export async function queryUserList() {
    return request(`/api/list`);
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