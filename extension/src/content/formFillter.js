import { SearchHelperFill_Icon, SearchHelperUser_Icon } from "utils/constant";
import { ext, sendMessage } from "util";
import { FormFieldRegex, FormType } from "utils/constant";
import _ from "lodash";

/**
 * Filter forms from website
 */
class FormFilter {
    static s_langResult = "";
    static s_forms = undefined;

    constructor() {}

    searchForms = () => {
        try {
            console.log("start searching....");
            searchForStaticSites();

            let arrForms = [];
            let username = "";
            let password = "";
            let firstName = "";
            let tempPassword = "";

            let forms = document.forms; // document.forms;
            for (let i = 0; i < forms.length; i++) {}

            if (
                arrForms.length > 0 &&
                (typeof password == "undefined" ||
                    password == null ||
                    password == "")
            ) {
                let apmPasswords = $('input[type="password"]').filter(
                    function() {
                        return (
                            $(this).parents("form").length === 0 &&
                            $(this).attr("data-apmpasswordfield") != "true" &&
                            $(this).attr("data-apmtextfield") != "true"
                        );
                    }
                );
                if (
                    (typeof apmPasswords != "undefined" &&
                        apmPasswords != null) ||
                    apmPasswords != ""
                ) {
                    $(apmPasswords).each(function(index, val) {
                        if (setIconOnPage(val, "Password")) {
                            tempPassword = val;
                        }
                    });
                }
            }

            searchForFormField();

            applySubmitButton();

            //$("div[id^='apmtemp']").each(function () {
            //    let apmtemp = $(this);
            //    if (arrForms.length == 0 && (typeof password == 'undefined' || password == null || password == '')) {
            //        $(apmtemp).remove();
            //    }
            //});

            if (arrForms.length == 0) {
                let apmPasswords = $('input[type="password"]');
                if (
                    (typeof apmPasswords != "undefined" &&
                        apmPasswords != null) ||
                    apmPasswords != ""
                ) {
                    $(apmPasswords).each(function(index, val) {
                        if (
                            typeof val.maxLength == "undefined" ||
                            val.maxLength >= 6
                        ) {
                            if (setIconOnPage(val, "Password")) {
                                tempPassword = val;
                            }
                        }
                    });
                }
            }

            return bFound;
        } catch (e) {
            chrome.runtime.sendMessage(
                { Action: "DEBUG_DATA", Result: e.stack.toString() },
                function(response) {}
            );
        }
    };

    checkForm = form => {
        try {
            let tempForm = {};
            const arrPwdFields = this.getPasswordFields(form.elements);
            const arrTextFields = this.getTextFields(form.elements);
            for (let i = 0; i < form.elements.length; i++) {
                tempForm = {};
                let element = form.elements[i];

                if (this.isUserNameField(element)) {
                    tempForm["username"] = element;
                }

                if (
                    arrPwdFields.length === 2 ||
                    (arrPwdFields.length === 1 && arrTextFields.length > 1)
                ) {
                    //Sign up
                    tempForm["type"] = FormType.SIGN_UP;
                    tempForm["password"] = arrPwdFields[0];
                    if (arrPwdFields.length === 2) {
                        tempForm["confirm_password"] = arrPwdFields[1];
                    }
                }

                tempForm["submit"] = this.getSubmitButton(form);

                FormFilter.s_forms = [...FormFilter.s_forms, { ...tempForm }];
            }
        } catch (err) {
            ext.runtime.sendMessage(
                { Action: "DEBUG_DATA", Result: e.stack.toString() },
                function(response) {}
            );
        }
    };

    /**
     * Get Password fields from input elements
     * @param {*} elements
     */
    getPasswordFields = elements =>
        _.filter(elements, ele => this.isPasswordField(ele));

    /**
     * Check if element is password field
     * @param {*} element
     */
    isPasswordField = element => {
        if (
            element.type === "password" &&
            elemRect1.left > -1 &&
            $(element).is(":visible") &&
            element.name.toLowerCase().indexOf("cvv") === -1 &&
            element.id.toLowerCase().indexOf("cvv") === -1 &&
            element.name.toLowerCase().indexOf("cvc") === -1 &&
            element.id.toLowerCase().indexOf("cvc") === -1
        ) {
            return true;
        }
        return false;
    };

    /**
     * Get text fields from elements
     * @param {*} elements
     */
    getTextFields = elements =>
        _.filter(elements, ele => this.isTextField(ele));

    /**
     * Check if element is text field
     * @param {*} element
     */
    isTextField = element => {
        if (
            (element.type === "text" ||
                element.type === "email" ||
                element.type === "tel" ||
                element.type === "url") &&
            $(element).is(":visible") &&
            element.name.toLowerCase().indexOf("otp") === -1 &&
            element.id.toLowerCase().indexOf("otp") === -1 &&
            element.name.toLowerCase().indexOf("captcha") === -1 &&
            element.id.toLowerCase().indexOf("captcha") === -1 &&
            element.name.toLowerCase().indexOf("search") === -1 &&
            element.id.toLowerCase().indexOf("search") === -1
        ) {
            return true;
        }
        return false;
    };

    getUserNameField = elements =>
        _.find(elements, element => this.isUserNameField(element));

    isUserNameField = element => {
        if (
            element.name === "login" ||
            element.name === "username" ||
            element.id === "appleId"
        )
            return true;

        if (
            element.name.toLowerCase().match(FormFieldRegex.username) ||
            element.id.toLowerCase().match(FormFieldRegex.username)
        )
            return true;
        return false;
    };

    getSubmitButton = form => {
        var arrButtons = [];
        var bPassedPasswordField = false;
        for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            if (element.id == "btnPopupLogin") continue;
            var bVisible = $(element).is(":visible");
            if (element.type === "password" && bVisible)
                bPassedPasswordField = true;
            if (!bPassedPasswordField)
                // skip everything before passwords
                continue;
            if (element.type === "submit" && bVisible) return element;
            else if (
                (element.type === "button" &&
                    bVisible &&
                    $(element)
                        .text()
                        .toLowerCase() == "sign in") ||
                $(element)
                    .text()
                    .toLowerCase() == "log in" ||
                $(element)
                    .text()
                    .toLowerCase() == "login" ||
                $(element)
                    .text()
                    .toLowerCase() == "submit"
            )
                arrButtons.push(element);
            else if (
                (element.type === "image" &&
                    bVisible &&
                    $(element)
                        .text()
                        .toLowerCase() == "sign in") ||
                $(element)
                    .text()
                    .toLowerCase() == "log in" ||
                $(element)
                    .text()
                    .toLowerCase() == "login" ||
                $(element)
                    .text()
                    .toLowerCase() == "submit"
            )
                arrButtons.push(element);
        }
        if (arrButtons.length >= 1) return arrButtons[arrButtons.length - 1]; // last button

        return null;
    };
}
