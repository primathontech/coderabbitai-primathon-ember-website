import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import {
  CONTACT_SEND_MESSAGE_CLICK,
  CONTACT_FORM_PAYLOAD_VALID,
  CONTACT_FORM_PAYLOAD_INVALID,
  CONTACT_API_SUCCESS,
  CONTACT_API_ERROR,
} from '../../../constants/event-name';

export default class EmberHeroSectionComponent extends Component {
  @service api;
  @tracked isSubmitted = false; //check if form is submitted
  @tracked apiInProgress = false;
  @tracked apiError = false;
  _COUNTRY_CODE_REGEX = /^(\+?\d{1,3}|\d{1,4})$/;

  //user questions
  @tracked userQuestion = {
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    budget: '',
    message: '',
  };

  //for validation message
  @tracked validation = {
    name: '',
    email: '',
    countryCode: '',
    phone: '',
    budget: '',
    message: '',
  };

  //to remove validation message if focus on input
  @action
  resetErrorMessage(name) {
    if (this.apiError) {
      this.apiError = false;
    }
    if (this.validation[name]) {
      this.validation = { ...this.validation, [name]: '' };
    }
  }

  @action validate() {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let validateObj = { ...this.validation };
    let formObj = {};
    let isValidated = true;

    for (let key in this.userQuestion) {
      formObj[key] = this.userQuestion[key].trim();
    }

    if (formObj.name.length < 1) {
      validateObj.name = 'Please enter valid Name';
      isValidated = false;
    }

    if (!emailRegex.test(formObj.email)) {
      validateObj.email = 'Please enter valid email';
      isValidated = false;
    }

    if (!this.countryCodeValidator(formObj.countryCode)) {
      validateObj.countryCode = 'Please enter valid country code';
      isValidated = false;
    }

    if (!formObj.phone || formObj.phone.length !== 10) {
      validateObj.phone = 'Please enter valid phone number';
      isValidated = false;
    }

    if (formObj.message.length < 10) {
      validateObj.message = 'Please enter valid message';
      isValidated = false;
    }

    this.validation = validateObj;
    return isValidated;
  }

  countryCodeValidator(code) {
    return this._COUNTRY_CODE_REGEX.test(code);
  }

  @action
  async sendMessage(evt) {
    evt.preventDefault();
    this.trackEvent(CONTACT_SEND_MESSAGE_CLICK);
    if (this.validate()) {
      this.trackEvent(CONTACT_FORM_PAYLOAD_VALID, this.userQuestion);

      this.apiInProgress = true;
      const res = await this.api.sendContactMail(this.userQuestion);

      if (res.status === 200) {
        this.isSubmitted = true;
        this.apiInProgress = true;
        this.trackEvent(CONTACT_API_SUCCESS, this.userQuestion);
      } else {
        this.apiError = true;
        this.apiInProgress = true;
        this.trackEvent(CONTACT_API_ERROR, this.userQuestion);
      }
    } else {
      this.trackEvent(CONTACT_FORM_PAYLOAD_INVALID, this.userQuestion);
    }
  }

  trackEvent(name, payload) {
    if (window.gtag) {
      window.gtag('event', name, payload);
    }
  }
}
