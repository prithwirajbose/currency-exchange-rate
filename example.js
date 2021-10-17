var currencyExchangeRate = require("currency-exchange-rate");
//Using a Promise.
currencyExchangeRate.getCurrencyExchangeRate({ fromCurrency: "USD", toCurrency: "INR" }).then(function (exchangeRateValue) {
    console.log(exchangeRateValue);
}).catch((error) => {
    console.log(error);
});

//Using a callback function.
currencyExchangeRate.getCurrencyExchangeRate({ fromCurrency: "USD", toCurrency: "INR" }, function (exchangeRateValue, e) {
    if (e) {
        console.error(error);
    }
    else {
        console.log(exchangeRateValue);
    }
});