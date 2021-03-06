# currency-exchange-rate
NPM library to get realtime Currency Exchange Rate from Yahoo Finance Website. This library uses axios under the hood to make HTTP Call to Yahoo Finance. 

## Parameters
`fromCurrency` and `toCurrency` are two mandatory properties for `config` parameter of `getCurrencyExchangeRate(config, callbackFunction(exchangeRateValue, error))` function. The currency symbols are [ISO 4217 Currency Codes](https://en.wikipedia.org/wiki/ISO_4217). You must pass valid values for these 2 config properties, otherwise the library function will retun error.
You can optionally use any of the [axios request config](https://www.npmjs.com/package/axios#request-config) along with `fromCurrency` and `toCurrency`

If you are using the library behind a coporate proxy please refer axios request config properties link on how to set your proxy settings.

## Usage
```js
var currencyExchangeRate = require("currency-exchange-rate");
//Using a Promise.
currencyExchangeRate.getCurrencyExchangeRate({ fromCurrency: "USD", toCurrency: "INR" }).then(function (exchangeRateValue) {
    console.log(exchangeRateValue);
}).catch((error) => {
    console.log(error);
});

//Using a callback function.
currencyExchangeRate.getCurrencyExchangeRate({ fromCurrency: "USD", toCurrency: "INR" }, function (exchangeRateValue, error) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(exchangeRateValue);
    }
});
```

