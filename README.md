# currency-exchange-rate
NPM library to get realtime Currency Exchange Rate from Google Finance Website. This library uses axios under the hood to make HTTP Call to Google Finance. 

## Parameters
`fromCurrency` and `toCurrency` are two mandatory properties for `config` parameter of `getCurrencyExchangeRate(config, callbackFunction(exchangeRateValue, error))` function. The currency symbols are [ISO 4217 Currency Codes](https://en.wikipedia.org/wiki/ISO_4217). You must pass valid values for the 2 config properties, otherwise the library function will retun error.
You can optionally use any of the [axios config properties](https://www.npmjs.com/package/axios#config-defaults) along with `fromCurrency` and `toCurrency`

If you are using the library behind a coporate proxy please refer axios config properties link  on how to set your proxy settings.

## Usage
```js
var currencyExchangeRate = require("currency-exchange-rate");
//Using a Promise.
currencyExchangeRate.getCurrencyExchangeRate({ fromCurrency: "USD", toCurrency: "INR" }).then(function(exchangeRateValue) {
    console.log(exchangeRateValue);
}).catch((error) => {
    console.log(error);
});

//Using a callback function.
currencyExchangeRate.getCurrencyExchangeRate({ fromCurrency: "USD", toCurrency: "INR" }, function(exchangeRateValue, error){
    if(e){
        console.error(error);
    }
    else{
        console.log(exchangeRateValue);
    }
});
```

