import { API } from "constants"
import { callApiWithToken } from "utils"


const userService = {
    getInfo() {
        return callApiWithToken(`${API}/users/profile`);
    },
    getUser(queryString) {
        return callApiWithToken(`${API}/users/?${queryString}`);
    },
    updateUser(id, form) {
        return callApiWithToken(`${API}/users/${id}`, {
            body: JSON.stringify(form),
            method: 'PUT'
        });
    },
    deleteUser(id) {
        return callApiWithToken(`${API}/users/delete/${id}`, {
            method: 'DELETE'
        });
    },
}

export default userService