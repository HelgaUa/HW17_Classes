class FormValidate {
    static SUCCESS_CLASS_NAME = 'success';
    static ERROR_CLASS_NAME = 'error';
    static ERROR_ITEM_CLASS_NAME = 'error__item';
    static FORM_CONTROL_CLASS_NAME = 'form-group';
    constructor (form) {
        this.sended = null;
        this.success = null;
        this.elements = form.elements;
        this.form = form;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.checkFormElement();
            this.checkForm();
            this.disableForm();
            this.sended = true;
        })
    }

    checkFormElement()  {
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            const reqMessage = element.dataset.req;
            const minMessage = element.dataset.min_message;
            const emailMessage = element.dataset.email;
            this.clearError(element);

            if (reqMessage) {
                this.required(element, reqMessage);
            }
            if (minMessage) {
                this.minLength(element, minMessage);
            }
            if (emailMessage) {
                this.email(element, emailMessage);
            }
        }
    }

    checkForm(element) {
        const errorElements = this.form.querySelectorAll(`.${FormValidate.ERROR_CLASS_NAME}`);
        this.success = errorElements.length === 0;

        if (this.success) {
            this.form.classList.add(FormValidate.SUCCESS_CLASS_NAME);
            let formFields = this.form.querySelectorAll("." + FormValidate.FORM_CONTROL_CLASS_NAME);
            for (let i = 0; i < formFields.length; i++) {
                formFields[i].classList.add(FormValidate.SUCCESS_CLASS_NAME);
            }
            console.log('Form data:', this.getFormData());
            console.log('Method - ', this.form.method, 'Action - ', this.form.action);
        }
    }

    getFormData() {
        const formData = {};
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            formData[element.name] = element.value;
        }
        return formData;
    }

    required(element, reqMessage) {
        if (element.value.length === 0) {
            this.errorTemplate(element, reqMessage)
        }
    }

    minLength(element, minMessage) {
        const minLength = element.dataset.min_length;
        if (element.value.length < minLength) {
            this.errorTemplate(element, minMessage);
        }
    }

    email(element, emailMessage) {
        const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regEmail.test(element.value)) {
            this.errorTemplate(element, emailMessage);
        }
    }

    errorTemplate(element, message) {
        const parent = element.closest(`.${FormValidate.FORM_CONTROL_CLASS_NAME}`);
        if (parent.classList.contains(FormValidate.ERROR_CLASS_NAME) === false) {
            parent.classList.add(FormValidate.ERROR_CLASS_NAME);
            parent.insertAdjacentHTML('beforeend', `<small class = "${FormValidate.ERROR_ITEM_CLASS_NAME}">${message}</small>`)
        }
    }

    clearError(element) {
        const parent = element.closest(`.${FormValidate.FORM_CONTROL_CLASS_NAME}`);
        if (parent !== null && parent.classList.contains(FormValidate.ERROR_CLASS_NAME)) {
            parent.classList.remove(FormValidate.ERROR_CLASS_NAME);
            parent.querySelector(`.${FormValidate.ERROR_ITEM_CLASS_NAME}`).remove();
        }
    }
}

FormValidate.prototype.disableForm = function () {
    if (this.success) {
        const formFields = this.form.querySelectorAll("." + FormValidate.FORM_CONTROL_CLASS_NAME);
        for (let i = 0; i < formFields.length; i++) {
            formFields[i].querySelector('input, textarea, select, button').setAttribute('disabled', 'disabled');
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const regForm = new FormValidate(document.querySelector('.js--reg_form'));
    document.querySelector('.js--check').addEventListener('click', function () {
        const result =  {sent: regForm.sended, success: regForm.success};
        console.log(result);
    })
})