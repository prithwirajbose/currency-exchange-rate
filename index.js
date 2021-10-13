const axios = require('axios'),
    DomParser = require('dom-parser');

var getCurrencyExchangeRate = function (config, callbackFunction) {
    try {
        if (config && typeof (config.fromCurrency) == 'string' && typeof (config.toCurrency) == 'string') {
            var parser = new DomParser();

            var googleFinanceUrl = "https://www.google.com/finance/quote/" + config.fromCurrency.trim().toUpperCase() + "-" + config.toCurrency.trim().toUpperCase();
            var axiosConfig = config;

            axios.get(googleFinanceUrl, axiosConfig).then(function (response) {
                if (!error && response.statusCode == 200) {
                    var dom = parser.parseFromString(body);
                    console.log(dom.getElementsByClassName('fxKbKc')[0].innerHTML.trim());
                }
            }), function (error, response, body) {

            });
        }
    }
    catch (e) {
        if (typeof (callbackFunction) == 'function') {
            callbackFunction(e);
        }
    }

}
getCurrencyExchangeRate("USD", "INR");
module.exports.getCurrencyExchangeRate = getCurrencyExchangeRate;
