export default class Validator {
  static instance = null;

  constructor() {
    if (Validator.instance) {
      throw new Error('Cannot create multiple instances of Validator');
    }

    this.passwordsMatch = function passwordsMatch(password, confirmPassword) {
      return password === confirmPassword;
    };

    this.isStrongPassword = function isStrongPassword(password) {
      return password.length >= 6;
    };

    this.validateMaxLength = function validateMaxLength(value, maxLength) {
      return value.length <= maxLength;
    };

    this.isValidEmail = function isValidEmail(email) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };

    this.validateTextOnly = function validateTextOnly(value) {
      return /^[a-zA-Z\u0104\u0105\u0106\u0107\u0118\u0119\u0141\u0142\u0143\u0144\u00D3\u00F3\u015A\u015B\u0179\u017A\u017B\u017C]*$/.test(
        value
      );
    };

    this.validateTextAndNumbersOnly = function validateTextAndNumbersOnly(
      value
    ) {
      return /^[a-zA-Z0-9\u0104\u0105\u0106\u0107\u0118\u0119\u0141\u0142\u0143\u0144\u00D3\u00F3\u015A\u015B\u0179\u017A\u017B\u017C]*$/.test(
        value
      );
    };

    this.validateNotOnlyNumbers = function alidateNotOnlyNumbers(value) {
      return !/^[0-9\s]*$/.test(value);
    };

    this.validateNumbersOnly = function validateNumbersOnly(value) {
      return /^[0-9]*$/.test(value);
    };

    this.validateFileType = function validateFileType(file, allowedTypes) {
      return file && allowedTypes.includes(file.type);
    };

    Validator.instance = this;
  }

  static getInstance() {
    if (!Validator.instance) {
      Validator.instance = new Validator();
    }
    return Validator.instance;
  }
}
