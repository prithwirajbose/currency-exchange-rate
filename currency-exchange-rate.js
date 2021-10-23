const axios = require('axios'),
    DomParser = require('dom-parser');

var getCurrencyExchangeRatePromiseCallback = function (config, callbackFunction, resolve, reject) {
    try {
        if (config && typeof (config.fromCurrency) == 'string' && typeof (config.toCurrency) == 'string') {
            var parser = new DomParser();

            var yahooFinanceUrl = "https://query1.finance.yahoo.com/v8/finance/chart/" + config.fromCurrency.trim().toUpperCase() + config.toCurrency.trim().toUpperCase() + "=X?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance";
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
            axiosConfig.url = yahooFinanceUrl;
            axiosConfig.method = "get";

            axios.get(yahooFinanceUrl, axiosConfig).then(function (response) {
                if (response && response.status === 200 && response.data && response.data.chart && response.data.chart.result
                    && Array.isArray(response.data.chart.result) && response.data.chart.result.length > 0
                    && response.data.chart.result[0].meta && typeof (response.data.chart.result[0].meta.regularMarketPrice) == 'number') {

                    var conversionRate = response.data.chart.result[0].meta.regularMarketPrice;
                    if (typeof (callbackFunction) == "function") {
                        callbackFunction(conversionRate, undefined);
                    }
                    return resolve(conversionRate);
                }
                else {
                    if (typeof (callbackFunction) == "function") {
                        callbackFunction(undefined, "Backend service didn't return a HTTP 200 response");
                    }
                    return reject("Backend service didn't return a HTTP 200 response");
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
