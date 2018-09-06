try {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        sendResponse(switchCallRequestedMethod(request));
    });
} catch (e) {
    console.log("this is not chrome ent;");
}

if (process.argv && process.argv.length > 2 && process.argv[2] == "debug") {
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

    console.log("start replaceW2ildCardToRegex test..."); {
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

    console.log("start checkComment test..."); {

        var patterns = {};
        patterns[getBaseURL("https://google.com/")] = [{
                "url": "https://google.com/test/*",
                "text": "kuso"
            },
            {
                "url": "https://google.com/test/*",
                "text": "unko"
            },
            {
                "url": "https://google.com/t??st",
                "text": "gero"
            }
        ];
        patterns[getBaseURL("https://[a-c]?[!a-c][ade]")] = [{
            "url": "https://[a-c]?[!a-c][ade]",
            "text": "kuso"
        }];
        patterns[getBaseURL("https://??.??")] = [{
            "url": "https://??.??",
            "text": "kuso"
        }];

        var requests = [{
                "url": "https://google.com",
                "text": "kuso",
            },
            {
                "url": "https://google.com/test/",
                "text": "kuso",
            },
            {
                "url": "https://google.com/test/",
                "text": "kuso",
            },
            {
                "url": "https://google.com/test/aaa",
                "text": "kuso",
            },
            {
                "url": "https://google.com/test/",
                "text": "unko",
            },
            {
                "url": "https://google.com/test/",
                "text": "zako",
            },
            {
                "url": "https://google.com/test",
                "text": "gero",
            },
            {
                "url": "https://google.com/toast",
                "text": "kuso",
            },
            {
                "url": "https://google.com/toast",
                "text": "gero",
            },
            {
                "url": "https://google.com/toaest",
                "text": "gero",
            },
            {
                "url": "https://akda",
                "text": "kuso",
            },
            {
                "url": "https://akde",
                "text": "kuso",
            },
            {
                "url": "https://akdd",
                "text": "kuso",
            },
            {
                "url": "https://akdc",
                "text": "kuso",
            },
            {
                "url": "https://akaa",
                "text": "kuso",
            },
            {
                "url": "https://akba",
                "text": "kuso",
            },
            {
                "url": "https://akca",
                "text": "kuso",
            },
            {
                "url": "https://akjda",
                "text": "kuso",
            },
            {
                "url": "https://dada",
                "text": "kuso",
            },
            {
                "url": "https://ab.cd",
                "text": "kuso",
            },
            {
                "url": "https://abc.de",
                "text": "kuso",
            },
            {
                "url": "https://ab.cde",
                "text": "kuso",
            },
        ];

        var regularResults = [
            // http://google.com -> kuso
            false,
            // http://google.com/test/ -> kuso
            true,
            // https://google.com/test/ -> kuso
            true,
            // https://google.com/test/aaa -> kuso
            true,
            // https://google.com/test/ ->unko
            true,
            // https://google.com/test/ -> zako
            false,
            // https://google.com/test -> gero
            false,
            // https://google.com/toast ->kuso
            false,
            // https://google.com/toast -> gero
            true,
            // https://google.com/toaest -> gero
            false,
            // https://akda -> kuso
            true,
            // https://akde -> kuso
            true,
            // https://akdd -> kuso
            true,
            // https://akdc -> kuso
            false,
            // https://akaa -> kuso
            false,
            // https://akba -> kuso
            false,
            // https://akca -> kuso
            false,
            // https://akjda -> kuso
            false,
            // https://dada -> kuso
            false,
            // https://ab.cd -> kuso
            true,
            // https://abc.de -> kuso
            false,
            // https://ab.cde -> kuso
            false
        ];

        var actualyResults = [];

        for (requestKies in requests) {
            actualyResults.push(checkComment(patterns, requests[requestKies]));
        }

        var replacedPatterns = [];
        for (patternKies in patterns)
            for (index in patterns[patternKies])
                replacedPatterns.push(replaceWildCardToRegex(patterns[patternKies][index].url));

        console.log("test patterns are");
        console.log(patterns);
        console.log("replaced patterns are");
        console.log(replacedPatterns);

        for (index in regularResults) {
            var res = (regularResults[index] == actualyResults[index]) ? "OK" : "FAILED";
            console.log("request - url : " + requests[index].url + ", text : " + requests[index].text + ", result : " + actualyResults[index] + " ......... " + res);
        }

        console.log((arrayEquals(regularResults, actualyResults) ? "OK" : "FAILED"));
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

    console.log("test switchCallRequestedMethod"); {
        localStorage = {};
        savePattern = function(items) {
            return true;
        };
        checkComment = function(patterns, request) { return true; };

        request = { "method": "savePattern" };
        switchCallRequestedMethod(request);

        console.log("method savePattern ...... " + ((localStorage["patterns"]) ? "OK" : "FAILED"));

        request = { "method": "checkComment" };
        var res = switchCallRequestedMethod(request);

        console.log("method checkComment ...... " + ((res) ? "OK" : "FAILED"));
    }
}

function switchCallRequestedMethod(request) {
    var response = null;
    switch (request.method) {
        case "checkComment":
            response = JSON.stringify(checkComment(JSON.parse(localStorage["patterns"]), request));
            break;
    }
    return response;
}

function getData() {
    return localStorage["patterns"];
}

function savePattern(items) {
    localStorage["patterns"] = JSON.stringify(_savePattern(JSON.parse(items)));
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

function checkComment(patterns, request) {
    result = false;
    for (key in patterns) {
        if (!checkWildCardtext(key, getBaseURL(request.url)))
            continue;

        for (var i = 0; i < patterns[key].length; i++) {
            if (checkWildCardtext(patterns[key][i].url, request.url) && checkWildCardtext(patterns[key][i].text, request.text)) {
                result = true;
                break;
            }
        }

        if (result)
            break;
    }

    return result;
}

function getBaseURL(url) {
    var reBaseUrl = /\/\/([a-zA-Z0-9\*\?\[\]\!\-\#\.]+)\/?.*/;
    return reBaseUrl.exec(url)[1];
}

function getAddress(url) {
    var reAddress = /.*:\/\/(.+)/;
    return reAddress.exec(url)[1];
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