import { deleteApi, getApi, postApi, putApi } from "./Axios";

const END_POINT = 'tasks/'

const AddTaskAPI = (data) => {
    const response = postApi(END_POINT + "add-task", data);
    return response;
};

const GetMyTasksAPI = () => {
    const response = getApi(`${END_POINT}get-my-tasks`);
    return response
};

const UpdateTaskAPI = (id, data) => {
    const response = putApi(`${END_POINT}update-task?id=${id}`, data);
    return response
};

const DeleteTaskAPI = (id) => {
    const response = deleteApi(`${END_POINT}delete-task?id=${id}`);
    return response
};

export {
    AddTaskAPI,
    GetMyTasksAPI,
    DeleteTaskAPI,
    UpdateTaskAPI
};
