try {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        sendResponse(switchCallRequestedMethod(request));
    });
} catch (e) {
    console.log("this is not chrome ent;");
}

try {
    if (process != null && process.argv && process.argv.length > 2 && process.argv[2] == "debug") {
        var arrayEquals = function(a, b) {
            if (a.length != b.length)
                return false;
            var result = true;
            for (var i = 0; i < a.length; i++) {
                if (a[i] != b[i]) {
                    result = false;
                    break;
                }
            }
            return result;
        }

        console.log("start test.");

        console.log("");
        console.log("");
        console.log("");

        console.log("test switchCallRequestedMethod"); {
            localStorage = {};

            replaceText = function(request) {
                return true;
            };

            var calledReplaceText = JSON.parse(switchCallRequestedMethod({ method: "replaceText" }));

            console.log("replaceText is " + ((calledReplaceText) ? "called" : "uncalled"));
            console.log((calledReplaceText) ? "OK" : "FAILED");
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start read test"); {
            localStorage = { "test": "[1, 2, 3]" };
            var regular = [1, 2, 3];
            var actually = read("test");
            var actually2 = read("nullable");
            console.log("test data");
            console.log(localStorage["test"]);
            console.log("regular");
            console.log(regular);
            console.log("test1");
            console.log(actually);
            console.log("test2");
            console.log(actually2);

            console.log((arrayEquals(regular, actually) && actually2 == null) ? "OK" : "FAILED");
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start save test"); {
            localStorage = [];
            var data = { "test": [1, 2, 3] };
            var regular = "{\"test\":[1,2,3]}";
            var testKey = "test";
            save(testKey, data);
            console.log("test data");
            console.log(data);
            console.log("regular : " + regular);
            console.log("actually : " + localStorage[testKey]);
            console.log((regular == localStorage[testKey]) ? "OK" : "FAILED");
        }

        console.log("");
        console.log("");
        console.log("");


        console.log("start getPatter Test"); {
            var called = false;
            read = function(key) { called = true; return key; };
            var readKey = JSON.parse(getPattern());
            console.log("isCalled : " + ((called) ? "called" : "uncalled") + " / read key : " + readKey + " ...... " + ((called && readKey == "patterns") ? "OK" : "FAILED"));
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start replaceWildCardToRegex test..."); {
            var testInput = "http?://*.*/[!kill]/#abc\+bbc";
            var processed = replaceWildCardToRegex(testInput);
            var regular = "http.:\\/\\/.*\\..*\\/[^kill]\\/[0-9]abc\+bbc";
            console.log("test input is : " + testInput + " : processed : " + processed + " : regular : " + regular);
            console.log((processed == regular) ? "OK" : "FAILED");
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start checkWildCardtext test..."); {
            var testPattern = "http?://*twitter.com/*";
            var testUrls = [
                "https://twitter.com/",
                "http://twitter.com/",
                "https://www.twitter.com/",
                "https://www.twitter.com/",
                "https://www.twitter.com/asagi_00a3af/status/12567890?buf=true",
                "https://www.twitter.el/",
                "https://www.twptter.com/",
            ]
            var regular = [true, false, true, true, true, false, false];

            var results = [];
            for (index in testUrls) {
                console.log("testing pattern : " + testPattern + " : url : " + testUrls[index]);
                console.log("converted pattern : " + replaceWildCardToRegex(testPattern));
                results.push(checkWildCardtext(testPattern, testUrls[index]));
            }


            console.log("test inputs are");
            console.log(testUrls);
            console.log("regular results are");
            console.log(regular);
            console.log("actually results are");
            console.log(results);


            console.log((arrayEquals(regular, results)) ? "OK" : "FAILED");
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start getBaseURL test..."); {
            var urls = [
                "https://google.com",
                "http://google.com",
                "https://google.com/test",
                "https://?????.com/test",
                "https://*.*",
                "https://[a-z].com",
            ];

            var regularResults = [
                "google.com",
                "google.com",
                "google.com",
                "?????.com",
                "*.*",
                "[a-z].com"
            ];

            var actuallyResults = [];

            console.log("test urls are")
            console.log(urls);
            console.log("regular results are")
            console.log(regularResults);

            var result = false;
            for (index in urls) {
                var _result = (regularResults[index] == getBaseURL(urls[index]));
                result = (result || _result);
                var OKFAILED = (_result) ? "OK" : "FAILED";
                console.log(urls[index] + " - " + regularResults[index] + " ............ " + OKFAILED);
            }

            var OKFAILED = (result) ? "OK" : "FAILED";
            console.log(OKFAILED);
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start getAddress test..."); {
            var urls = [
                "http://google.com",
                "https://google.com",
                "https://google.com/test/url"
            ]

            var regularResults = [
                "google.com",
                "google.com",
                "google.com/test/url"
            ]

            var actuallyResults = [];
            console.log("test urls");
            console.log(urls);

            var result = false;
            for (index in urls) {
                var _result = (regularResults[index] == getAddress(urls[index]));
                var OKFAILED = (_result) ? "OK" : "FAILED";
                result = (result || _result);
                console.log(urls[index] + " - " + regularResults[index] + " - " + getAddress(urls[index] + " ............ " + OKFAILED));
            }

            var OKDAILED = (result) ? "OK" : "FAILED";
            console.log(OKFAILED);
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start replaceTextWithWildCard test..."); {
            var texts = [
                "fuck",
                "f/u/c/k",
                "motherfucker",
                "死ね",
                "こんにちは",
            ];

            var patterns = [
                "f*u*c*k",
                "f*u*c*k",
                "f*u*c*k",
                "死ね",
                "死ね"
            ]

            var regularResults = [
                "replaced",
                "replaced",
                "motherreplaceder",
                "replaced",
                "こんにちは"
            ];

            var replaceTo = "replaced";

            console.log("test texts are...");
            console.log(texts);
            console.log("test patterns are...")
            console.log(patterns);

            var result = true;

            for (index in texts) {
                console.log(index);
                var replaced = replaceTextWithWildCard(patterns[index], texts[index], replaceTo);
                var _result = (replaced == regularResults[index]);
                result = (result && _result);
                var OKFAILED = (_result) ? "OK" : "FAILED";
                console.log("input - " + texts[index] + " / regular - " + regularResults[index] + " / result - " + replaced + " ......... " + OKFAILED);
            }
            console.log((result) ? "OK" : "FAILED");
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start _savePattern test..."); {
            var items = [{
                    "url": "https://google.com",
                    "text": "unko"
                },
                {
                    "url": "https://google.com/test",
                    "text": "tikitiki"
                },
                {
                    "url": "https://twitter.com/test",
                    "text": "saiko"
                },
                {
                    "url": "https://*.*",
                    "text": "satoh"
                },
            ];

            var regularResults = {
                "google.com": [{
                        "url": "https://google.com",
                        "text": "unko"
                    },
                    {
                        "url": "https://google.com/test",
                        "text": "tikitiki"
                    }
                ],
                "twitter.com": [{
                    "url": "https://twitter.com/test",
                    "text": "saiko"
                }],
                "*.*": [{
                    "url": "https://*.*",
                    "text": "satoh"
                }]
            };

            var actuallyResults = _savePattern(items);

            console.log("test items");
            console.log(items);
            console.log("regular results");
            console.log(regularResults);
            console.log("actuaaly results");
            console.log(actuallyResults);

            var result = true;
            for (key in regularResults) {
                if (!actuallyResults[key] || regularResults[key].length != actuallyResults[key].length) {
                    result = false;
                    break;
                }
                for (index in regularResults[key]) {
                    if (regularResults[key][index].url != actuallyResults[key][index].url ||
                        regularResults[key][index].text != actuallyResults[key][index].text) result = false;
                }
            }

            console.log((result) ? "OK" : "FAILED");
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start _replaceText test..."); {
            var requests = [{
                    "url": "https://twitter.com",
                    "text": "fuck"
                },
                {
                    "url": "https://google.com",
                    "text": "fuck"
                }
            ];

            var patterns = {
                "twitter.com": [{
                        "url": "",
                        "text": "f??k"
                    },
                    {
                        "url": "",
                        "text": "neko"
                    },
                ]
            };

            var called = 0;
            var regularCalled = 2;

            replaceTextWithWildCard = function() {
                called++;
            }

            requests.forEach(function(request) {
                _replaceText(request, patterns, replaceTo);
            });

            console.log("test requests are");
            console.log(requests);
            console.log("test patterns are");
            console.log(patterns);

            console.log("num of call regular : " + regularCalled);
            console.log("num of call actually : " + called);
            console.log((called == regularCalled) ? "OK" : "FAILED");
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("test all clean.");
    }
} catch (e) {
    console.log(e);
    console.log("Error!! test is failed!");
}

function switchCallRequestedMethod(request) {
    var response = null;
    switch (request.method) {
        case "replaceText":
            response = replaceText(request);
            console.log(response);
            break;
    }
    return JSON.stringify(response);
}

function read(key) {
    var data = localStorage[key];
    if (data)
        return JSON.parse(data);
    else null;
}

function save(key, data) {
    localStorage[key] = JSON.stringify(data);
}

function getPattern() {
    return JSON.stringify(read("patterns"));
}

function savePattern(items) {
    save("patterns", _savePattern(items));
}

function _savePattern(items) {
    var patterns = {};
    items.forEach(function(item) {
        var baseUrl = getBaseURL(item.url);
        if (!patterns[baseUrl])
            patterns[baseUrl] = [];
        patterns[baseUrl].push({ url: item.url, text: item.text });
    });
    return patterns;
}

function replaceText(request) {
    return _replaceText(request, read("patterns"), (read("replaceTo") != null) ? read("replaceTo") : "replaced");
}

function _replaceText(request, patterns, replaceTo) {
    var text = request.text;
    for (key in patterns) {
        if (!checkWildCardtext(key, getBaseURL(request.url)))
            continue;

        for (var i = 0; i < patterns[key].length; i++) {
            text = replaceTextWithWildCard(patterns[key][i].text, text, replaceTo);
        }
    }
    console.log(text);
    return text;
}

function getBaseURL(url) {
    var reBaseUrl = /\/\/([a-zA-Z0-9\*\?\[\]\!\-\#\.]+)\/?.*/;
    return reBaseUrl.exec(url)[1];
}

function getAddress(url) {
    var reAddress = /.*:\/\/(.+)/;
    return reAddress.exec(url)[1];
}

function replaceTextWithWildCard(pattern, text, replaceTo) {
    pattern = replaceWildCardToRegex(pattern);
    re = new RegExp(pattern);
    return (text.replace(re, replaceTo));
}

function checkWildCardtext(pattern, text) {
    pattern = replaceWildCardToRegex(pattern);
    re = new RegExp("^" + pattern + "$");
    return (re.exec(text)) ? true : false;
}

function replaceWildCardToRegex(pattern) {
    pattern = pattern.replace(/\./g, "\\.");
    pattern = pattern.replace(/\//g, "\\\/");
    pattern = pattern.replace(/\*/g, ".*");
    pattern = pattern.replace(/\?/g, ".");
    pattern = pattern.replace(/\+/g, "\+");
    pattern = pattern.replace(/\[\!/g, "[^");
    pattern = pattern.replace(/\#/g, "[0-9]");

    return pattern;
}