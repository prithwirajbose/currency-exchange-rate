const axios = require('axios'),
    DomParser = require('dom-parser');

var getCurrencyExchangeRatePromiseCallback = function (config, callbackFunction, resolve, reject) {
    try {
        if (config && typeof (config.fromCurrency) == 'string' && typeof (config.toCurrency) == 'string') {
            var parser = new DomParser();

            var googleFinanceUrl = "https://www.google.com/finance/quote/" + config.fromCurrency.trim().toUpperCase() + "-" + config.toCurrency.trim().toUpperCase();
            var axiosConfig = config;
            var defaultHeaders = {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "user-agent": "Axios",
                "keep-alive": "true",
                "cache-control": "no-cache"
            }
            axiosConfig.headers = ((typeof (axiosConfig.headers) == 'object') ? axiosConfig.headers : {});
            axiosConfig.headers = Object.assign(axiosConfig.headers, defaultHeaders);
            axiosConfig.url = googleFinanceUrl;
            axiosConfig.method = "get";

            axios.get(googleFinanceUrl, axiosConfig).then(function (response) {
                if (response && response.status === 200) {
                    var dom = parser.parseFromString(response.data);
                    var conversionRate = dom.getElementsByClassName('fxKbKc')[0].innerHTML.trim();
                    if (typeof (callbackFunction) == "function") {
                        callbackFunction(conversionRate, undefined);
                    }
                    return resolve(conversionRate);
                }
                else {
                    if (typeof (callbackFunction) == "function") {
                        callbackFunction(undefined, "Google Finance didn't return a HTTP 200 response");
                    }
                    return reject("Google Finance didn't return a HTTP 200 response");
                }
            }).catch(function (err) {
                if (typeof (callbackFunction) == "function") {
                    callbackFunction(undefined, err);
                }
            });
        }
        else {
            throw "fromCurrency and toCurrency configs are required";
        }
    }
    catch (e) {
        if (typeof (callbackFunction) == "function") {
            callbackFunction(undefined, e);
        }
        return reject(e);
    }
};

var getCurrencyExchangeRate = function (config, callbackFunction) {
    return new Promise(function (resolve, reject) {
        return getCurrencyExchangeRatePromiseCallback(config, callbackFunction, resolve, reject);
    });
};

module.exports.getCurrencyExchangeRate = getCurrencyExchangeRate;
