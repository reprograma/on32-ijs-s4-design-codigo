const CARD_BRAND_VISA = 'visa';
const CARD_BRAND_MASTERCARD = 'mastercard';
const CARD_BRAND_AMEX = 'amex';

const CARD_BRANDS = [CARD_BRAND_VISA, CARD_BRAND_MASTERCARD, CARD_BRAND_AMEX];

const REGEX_CVV_3_DIGITS = /^\d{3}$/;
const REGEX_CVV_4_DIGITS = /^\d{4}$/;

const REGEX_CARD_NUMBER_VISA = /^4[0-9]{15}$/;
const REGEX_CARD_NUMBER_MASTER_CARD = /^5[1-5][0-9]{14}$/;
const REGEX_CARD_NUMBER_AMEX = /^3[47][0-9]{13}$/;

const CVV_ERROR_MESSAGES = {
    [CARD_BRAND_AMEX]: 'CVV invalid for Amex',
    [CARD_BRAND_VISA]: 'CVV invalid for Visa',
    [CARD_BRAND_MASTERCARD]: 'CVV invalid for Master Card',
};

const CARD_NUMBER_ERROR_MESSAGES = {
    [CARD_BRAND_AMEX]: 'Invalid card number from amex',
    [CARD_BRAND_VISA]: 'Invalid card number from visa',
    [CARD_BRAND_MASTERCARD]: 'Invalid card number from mastercard',
}

const CARD_BRAND_ERROR_MESSAGE = 'Invalid card brand';

const EXPIRED_CARD_ERROR_MESSAGE = 'Expired card'; 

const INVALID_INSTALLMENTS_ERROR_MESSAGE = 'Invalid installment count';

const MIN_INSTALLMENTS = 1;
const MAX_INSTALLMENTS = 12;

function verifyRegex(regex, value, errorMessage) {
    if (!regex.test(value)) {
        throw new Error(errorMessage);
    }
}

function validCard (card) {
    const { cardBrand, cardNumber, numberOfInstallments, cardExpirationDate, cvv } = card;
    const [cardExpirationMonth, cardExpirationYear] = cardExpirationDate.split('/');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    if (!CARD_BRANDS.includes(cardBrand)) {
        throw new Error(CARD_BRAND_ERROR_MESSAGE);
    }

    if (cardBrand === CARD_BRAND_AMEX) {
        verifyRegex(REGEX_CARD_NUMBER_AMEX, cardNumber, CARD_NUMBER_ERROR_MESSAGES[CARD_BRAND_AMEX]);
        verifyRegex(REGEX_CVV_4_DIGITS, cvv, CVV_ERROR_MESSAGES[CARD_BRAND_AMEX]);
    }

    if (cardBrand === CARD_BRAND_VISA) {
        verifyRegex(REGEX_CARD_NUMBER_VISA, cardNumber, CARD_NUMBER_ERROR_MESSAGES[CARD_BRAND_VISA]);
        verifyRegex(REGEX_CVV_3_DIGITS, cvv, CVV_ERROR_MESSAGES[CARD_BRAND_VISA]);
    }

    if (cardBrand === CARD_BRAND_MASTERCARD) {
        verifyRegex(REGEX_CARD_NUMBER_MASTER_CARD, cardNumber, CARD_NUMBER_ERROR_MESSAGES[CARD_BRAND_MASTERCARD]);
        verifyRegex(REGEX_CVV_3_DIGITS, cvv, CVV_ERROR_MESSAGES[CARD_BRAND_MASTERCARD]);
    }

    if (numberOfInstallments < MIN_INSTALLMENTS || numberOfInstallments > MAX_INSTALLMENTS) {
        throw new Error(INVALID_INSTALLMENTS_ERROR_MESSAGE);
    }

    if (parseInt(cardExpirationYear) < currentYear 
        || (parseInt(cardExpirationYear) === currentYear
        && parseInt(cardExpirationMonth) < currentMonth)) {
        throw new Error(EXPIRED_CARD_ERROR_MESSAGE);
    }

    return true;
}
  
  function checkErrorMessage(error, desireMessage) {
    if (error.message === desireMessage) {
      console.log('Teste passou');
    } else {
      console.error('Teste falhou', error.message);
    }
  }
  
  function testToBe(func, valorEsperado) {
    if (func === valorEsperado) {
      console.log('Teste passou');
    } else {
      console.error('Teste falhou');
    }
  }
  
  function testCardValidate() {
    // Throws expcetion when card date year is less than current year
    try {
      validCard({ cardBrand: 'visa', cardNumber: '4111111111111111', numberOfInstallments: 3, cardExpirationDate: '12/20', cvv: '123' })
    } catch (error) {
      checkErrorMessage(error, 'Expired card');
    }
  
    // Throws expcetion when card date month is less than current month
    try {
      validCard({ cardBrand: 'visa', cardNumber: '4111111111111111', numberOfInstallments: 3, cardExpirationDate: '05/24', cvv: '123' })
    } catch (error) {
      checkErrorMessage(error, 'Expired card');
    }
  }
  
  function testCardNumber() {
    // Throws exception when the AMEX CVV number is not 4 digits
    try {
      validCard({ cardBrand: 'amex', cardNumber: '341571769704121', numberOfInstallments: 3, cardExpirationDate: '12/22', cvv: '123' })
    } catch (error) {
      checkErrorMessage(error, 'CVV invalid for Amex');
    }
  
    // Throws exception when the Visa CVV number is not 3 digits
    try {
      validCard({ cardBrand: 'visa', cardNumber: '4111111111111111', numberOfInstallments: 3, cardExpirationDate: '12/22', cvv: '1233' })
    } catch (error) {
      checkErrorMessage(error, 'CVV invalid for Visa');
    }
  
    // Throws exception when the Master card CVV number is not 3 digits
    try {
      validCard({ cardBrand: 'mastercard', cardNumber: '5264454478913451', numberOfInstallments: 3, cardExpirationDate: '12/24', cvv: '12332' })
    } catch (error) {
      checkErrorMessage(error, 'CVV invalid for Master Card');
    }
  
    // Throws exception whe Amex card not start with 3
    try {
      validCard({ cardBrand: 'amex', cardNumber: '441571769704121', numberOfInstallments: 3, cardExpirationDate: '12/24', cvv: '123' })
    } catch (error) {
      checkErrorMessage(error, 'Invalid card number from amex');
    }
  
    // Throws exception whe Visa card not start with 4
    try {
      validCard({ cardBrand: 'visa', cardNumber: '5111111111111111', numberOfInstallments: 3, cardExpirationDate: '12/24', cvv: '1231' })
    } catch (error) {
      checkErrorMessage(error, 'Invalid card number from visa');
    }
  
    // Throws exception whe Master card not start with 5
    try {
      validCard({ cardBrand: 'mastercard', cardNumber: '6264454478913451', numberOfInstallments: 3, cardExpirationDate: '12/24', cvv: '1231' })
    } catch (error) {
      checkErrorMessage(error, 'Invalid card number from mastercard');
    }
  }
  
  function testCardBrand() {
    // throws an exception when card brand is invalid
    try {
      validCard({ cardBrand: 'diners', cardNumber: '4111111111111111', numberOfInstallments: 3, cardExpirationDate: '12/24', cvv: '123' })
    } catch (error) {
      checkErrorMessage(error, 'Invalid card brand');
    }
  }
  
  function testInstalmments() {
    // throws an exception when installments is less than 1
    try {
      validCard({ cardBrand: 'visa', cardNumber: '4111111111111111', numberOfInstallments: 0, cardExpirationDate: '12/24', cvv: '123' })
    } catch (error) {
      checkErrorMessage(error, 'Invalid installment count');
    }
  
     // throws an exception when installments is greater than 12
     try {
      validCard({ cardBrand: 'visa', cardNumber: '4111111111111111', numberOfInstallments: 13, cardExpirationDate: '12/24', cvv: '123' })
    } catch (error) {
      checkErrorMessage(error, 'Invalid installment count');
    }
  }
  
  testToBe(validCard({ cardBrand: 'visa', cardNumber: '4111111111111111', numberOfInstallments: 3, cardExpirationDate: '12/24', cvv: '123'}), true);
  testToBe(validCard({ cardBrand: 'mastercard', cardNumber: '5264454478913451', numberOfInstallments: 3, cardExpirationDate: '12/24', cvv: '123'}), true);
  testToBe(validCard({ cardBrand: 'amex', cardNumber: '341571769704121', numberOfInstallments: 3, cardExpirationDate: '12/24', cvv: '1231'}), true);
  testCardValidate();
  testCardBrand();
  testCardNumber();
  testInstalmments();