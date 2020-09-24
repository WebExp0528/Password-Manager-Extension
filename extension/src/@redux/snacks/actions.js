import snackDefaultOptions from "./snackDefaultOptions";

export const snackAdd = snack => ({
    type: "@snack/ADD",
    payload: {
        ...snackDefaultOptions,
        ...snack
    }
});

export const snackDelete = id => ({
    type: "@snack/DELETE",
    payload: id
});
