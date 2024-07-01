const CARD_BRAND_VISA = 'visa';
const CARD_BRAND_MASTERCARD = 'mastercard';
const CARD_BRAND_AMEX = 'amex';

const CARD_BRANDS = [CARD_BRAND_VISA, CARD_BRAND_MASTERCARD, CARD_BRAND_AMEX];

const MIN_INSTALLMENTS = 1;
const MAX_INSTALLMENTS = 12;

function verifyRegex(regex, value, errorMessage) {
    if (!regex.test(value)) {
        throw new Error(errorMessage);
    }
}

function validCard (cardBrand, cardNumber, numberOfInstallments, cardExpirationDate, cvv) {
    const [cardExpirationMonth, cardExpirationYear] = cardExpirationDate.split('/');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;
    
    if (CARD_BRANDS.includes(cardBrand)) {
      if (cardBrand === CARD_BRAND_AMEX) {
        verifyRegex(/^3[47][0-9]{13}$/, cardNumber, 'Invalid card number from amex');
        verifyRegex(/^\d{4}$/, cvv, 'CVV invalid for Amex');
      } else {
        if (cardBrand === CARD_BRAND_VISA) {
          verifyRegex(/^4[0-9]{15}$/, cardNumber, 'Invalid card number from visa');
          verifyRegex(/^\d{3}$/, cvv, 'CVV invalid for Visa');
        } else {
          if (cardBrand === CARD_BRAND_MASTERCARD) {
            verifyRegex(/^5[1-5][0-9]{14}$/, cardNumber, 'Invalid card number from mastercard');
            verifyRegex(/^\d{3}$/, cvv, 'CVV invalid for Master Card');
          }
        }
      }
      if (numberOfInstallments < MIN_INSTALLMENTS || numberOfInstallments > MAX_INSTALLMENTS) {
        throw new Error('Invalid installment count');
      } else if (parseInt(cardExpirationYear) < currentYear 
        || (parseInt(cardExpirationYear) === currentYear
        && parseInt(cardExpirationMonth) < currentMonth)) {
        throw new Error('Expired card');
      }
  
      return true;
    } else {
      throw new Error('Invalid card brand');
    }
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
      validCard('visa', '4111111111111111', 3, '12/22', '123')
    } catch (error) {
      checkErrorMessage(error, 'Expired card');
    }
  
    // Throws expcetion when card date month is less than current month
    try {
      validCard('visa', '4111111111111111', 3, '05/24', '123')
    } catch (error) {
      checkErrorMessage(error, 'Expired card');
    }
  }
  
  function testCardNumber() {
    // Throws exception when the AMEX CVV number is not 4 digits
    try {
      validCard('amex', '341571769704121', 3, '12/22', '123')
    } catch (error) {
      checkErrorMessage(error, 'CVV invalid for Amex');
    }
  
    // Throws exception when the Visa CVV number is not 3 digits
    try {
      validCard('visa', '4111111111111111', 3, '12/22', '1233')
    } catch (error) {
      checkErrorMessage(error, 'CVV invalid for Visa');
    }
  
    // Throws exception when the Master card CVV number is not 3 digits
    try {
      validCard('mastercard', '5264454478913451', 3, '12/24', '12332')
    } catch (error) {
      checkErrorMessage(error, 'CVV invalid for Master Card');
    }
  
    // Throws exception whe Amex card not start with 3
    try {
      validCard('amex', '441571769704121', 3, '12/24', '123')
    } catch (error) {
      checkErrorMessage(error, 'Invalid card number from amex');
    }
  
    // Throws exception whe Visa card not start with 4
    try {
      validCard('visa', '5111111111111111', 3, '12/24', '1231')
    } catch (error) {
      checkErrorMessage(error, 'Invalid card number from visa');
    }
  
    // Throws exception whe Master card not start with 5
    try {
      validCard('mastercard', '6264454478913451', 3, '12/24', '1231')
    } catch (error) {
      checkErrorMessage(error, 'Invalid card number from mastercard');
    }
  }
  
  function testCardBrand() {
    // throws an exception when card brand is invalid
    try {
      validCard('senff', '4111111111111111', 3, '12/24', '123')
    } catch (error) {
      checkErrorMessage(error, 'Invalid card brand');
    }
  }
  
  function testInstalmments() {
    // throws an exception when installments is less than 1
    try {
      validCard('visa', '4111111111111111', 0, '12/24', '123')
    } catch (error) {
      checkErrorMessage(error, 'Invalid installment count');
    }
  
     // throws an exception when installments is greater than 12
     try {
      validCard('visa', '4111111111111111', 13, '12/24', '123')
    } catch (error) {
      checkErrorMessage(error, 'Invalid installment count');
    }
  }
  
  testToBe(validCard('visa', '4111111111111111', 3, '12/24', '123'), true);
  testToBe(validCard('mastercard', '5264454478913451', 3, '12/24', '123'), true);
  testToBe(validCard('amex', '341571769704121', 3, '12/24', '1234'), true);
  testCardValidate();
  testCardBrand();
  testCardNumber();
  testInstalmments();