import initialState from "./initialState";
import snackDefaultOptions from "./snackDefaultOptions";

const newSnack = data => ({
    id: Math.random(),
    ...snackDefaultOptions,
    ...data
});

const addNewSnack = (data, snack) => {
    const nextData = [...data.filter(item => item.id !== snack.id), snack];

    return nextData;
};

export default (state = initialState, action) => {
    if (action.type.endsWith("_ERROR") && action.error && action.payload) {
        if (action.payload.status === 401) {
            return addNewSnack(
                state,
                newSnack({
                    id: "unauthorized",
                    type: "error",
                    content:
                        "You are not logged in or your session expired. Please login again."
                })
            );
        }

        if (action.payload.status === 403) {
            return addNewSnack(
                state,
                newSnack({
                    id: "nopermission",
                    type: "error",
                    content:
                        action.payload.message ||
                        action.payload.error ||
                        "You have no access permission in this app."
                })
            );
        }
    }

    if (action.meta && action.type.endsWith("_SUCCESS")) {
        if (action.meta.snack_success) {
            let snackData = {
                ...action.meta.snack_success,
                type: "success"
            };
            if (action.payload["snack"]) {
                snackData = {
                    type: "success",
                    ...action.payload["snack"]
                };
            }
            return [...state, newSnack(snackData)];
        }
    }
    if (action.type.endsWith("_ERROR")) {
        if (action.meta && action.meta.snack_error) {
            return [
                ...state,
                newSnack({
                    ...action.meta.snack_error,
                    type: "error"
                })
            ];
        }
        return [
            ...state,
            newSnack({
                // the errors from the server should be mapped
                content:
                    action.payload.message ||
                    action.payload.error ||
                    "Oops! We couldn't reach the server!",
                type: "error"
            })
        ];
    }

    switch (action.type) {
        case "@snack/ADD":
            return [...state, newSnack(action.payload)];
        case "@snack/DELETE":
            return state.filter(item => item.id !== action.payload);

        default:
            return state;
    }
};
