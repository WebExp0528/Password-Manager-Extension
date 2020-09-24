export const signIn = ({ email, password }) => ({ fetch }) => ({
    type: "@auth/SIGN_IN",
    payload: fetch("/accounts/login", {
        method: "POST",
        body: {
            email,
            password
        }
    })
});

export const signOut = () => ({ fetch }) => {
    // just logout, don't hanle it
    fetch("/accounts/logout", {
        method: "POST"
    });

    // flush the state
    return {
        type: "@auth/SIGN_OUT"
    };
};

/**
 *
 * Code below as an example!
 *
 */

export const signUp = ({
    firstname,
    lastname,
    email,
    password,
    companyname,
    source
}) => ({ fetch }) => ({
    type: "@auth/SIGN_UP",
    payload: fetch("/accounts/signup", {
        method: "POST",
        body: {
            firstname,
            lastname,
            email,
            password,
            companyname,
            source,
            referral: window.Rewardful.referral
        }
    })
});

export const accountConfirmation = confirmationToken => ({ fetch }) => ({
    type: "@auth/ACCOUNT_CONFIRMATION",
    payload: fetch(`/invitation/${confirmationToken}`, {
        method: "PUT",
        body: {}
    })
});

export const passwordReset = (resetToken, data) => ({ fetch }) => ({
    type: "@auth/PASSWORD_RESET",
    meta: {
        snack_success: {
            content: "Your password has been reset."
        },
        snack_error: {
            content: "We couldn't reset your password."
        }
    },
    payload: fetch(`/accounts/forgotten-password/${resetToken}`, {
        method: "PUT",
        body: data
    })
});

export const passwordResetRequest = ({ email }) => ({ fetch }) => ({
    type: "@auth/PASSWORD_RESET_REQUEST",
    payload: fetch("/accounts/forgotten-password", {
        method: "POST",
        body: {
            email
        }
    })
});

/**
 * Update personal information
 *
 */
export const updatePersonalInfo = ({
    firstName,
    lastName,
    email,
    oldPassword,
    companyName,
    newPassword
}) => ({ fetch }) => ({
    type: "@auth/UPDATE_PERSONAL_INFO",
    meta: {
        snack_success: {
            content: "Personal Information has been updated."
        },
        snack_error: {
            content: "We couldn't update personal information."
        }
    },
    payload: fetch("/accounts/update-personal-info", {
        method: "POST",
        body: {
            firstName,
            lastName,
            email,
            oldPassword,
            companyName,
            newPassword
        }
    })
});

export const emailConfirmation = confirmationToken => ({ fetch }) => ({
    type: "@auth/EMAIL_CONFIRMATION",
    payload: fetch(`/accounts/account-confirm/${confirmationToken}`, {
        method: "POST",
        body: {}
    })
});
