try {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        sendResponse(switchCallRequestedMethod(request));
    });
} catch (e) {
    console.log("this is not chrome ent;");
}

try {
    var greatestResult = 0;
    var testProcessinoCalled = 0;
    var addGreatestResult = function(result) {
        greatestResult += (result) ? 1 : 0;
        testProcessinoCalled++;
    };
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

            checkTextReplace = function(request) {
                return true;
            };

            var calledReplaceText = switchCallRequestedMethod({ method: "replaceText" });

            console.log("replaceText is " + ((calledReplaceText) ? "called" : "uncalled"));
            console.log((calledReplaceText) ? "OK" : "FAILED");
            addGreatestResult((calledReplaceText));
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

            var result = (arrayEquals(regular, actually) && actually2 == null);
            console.log(result ? "OK" : "FAILED");
            addGreatestResult(result);
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
            addGreatestResult(regular == localStorage[testKey]);
        }

        console.log("");
        console.log("");
        console.log("");


        console.log("start getPattern Test"); {
            var called = false;
            read = function(key) { called = true; return key; };
            var readKey = getPattern();
            console.log("isCalled : " + ((called) ? "called" : "uncalled") + " / read key : " + readKey + " ...... " + ((called && readKey == "patterns") ? "OK" : "FAILED"));
            addGreatestResult((called) && (readKey == "patterns"));
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
            addGreatestResult((processed == regular));
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

            console.log((result) ? "OK" : "FAILED");
            addGreatestResult(result);
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

            console.log((result) ? "OK" : "FAILED");
            addGreatestResult(result);
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start patternToRegex test..."); {
            var testPattern = ".*";
            var called = 0;
            var regularCallNum = 2;

            var _test_replaceWildCardToRegex = replaceWildCardToRegex;
            replaceWildCardToRegex = function(pattern) {
                called++;
                return _test_replaceWildCardToRegex(pattern);
            };

            console.log("test pattern : " + testPattern);
            var regular = "\\..*";
            var actually = patternToRegex(testPattern, false, true);
            console.log("regular result : " + regular + ", actually : " + actually + " ......... " + (regular == actually) ? "OK" : "FAILED");
            actually = patternToRegex(testPattern, false, false);
            console.log("regular result : " + regular + ", actually : " + actually + " ......... " + (regular == actually) ? "OK" : "FAILED");

            regular = "^\\..*$";
            actually = patternToRegex(testPattern, true, true);
            console.log("regular result : " + regular + ", actually : " + actually + " ......... " + (regular == actually) ? "OK" : "FAILED");

            replaceWildCardToRegex = _test_replaceWildCardToRegex;
            console.log("regular called replaceWildCardToRegex : " + regularCallNum + ", actually called : " + called + " ............ " + ((called == regularCallNum) ? "OK" : "FAILED"));
            addGreatestResult((called == regularCallNum));
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start checkWildCardText test..."); {
            var testPattern = "test.*";
            var called = 0;
            var regularCallNum = 3;

            var testTexts = [
                "test.co.jp",
                "test.com",
                "tttest.com"
            ];

            var regularResults = [
                true, true, false
            ];

            var __test_replaceWildCardToRegex = replaceWildCardToRegex;
            replaceWildCardToRegex = function(pattern) {
                called++;
                return __test_replaceWildCardToRegex(pattern);
            };

            console.log("testPattern is " + testPattern);
            console.log("test texts are");
            console.log(testTexts);

            var res = true;
            for (index in testTexts) {
                var _res = checkWildCardText(testPattern, true, true, testTexts[index]);
                console.log("regular : " + ((regularResults[index] ? "TRUE" : "FALSE")) + ", actually : " + ((_res) ? "TRUE" : "FALSE"));
                res = (res && regularResults[index] == _res);
            }

            console.log("text pattern check ............ " + ((res) ? "OK" : "FAILED"));

            replaceWildCardToRegex = __test_replaceWildCardToRegex;
            console.log("regular called replaceWildCardToRegex : " + regularCallNum + ", actually called : " + called + " ............ " + ((called == regularCallNum) ? "OK" : "FAILED"));

            addGreatestResult((res && (regularCallNum == called)));
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start asortText test..."); {
            var testRegex = new RegExp(/f..k/);
            var testText = "applefuck,twestfuckfucktestfuckringo";
            var regularResultsA = [
                ["apple", 0],
                ["fuck", 1],
                [",twest", 0],
                ["fuck", 1],
                ["fuck", 1],
                ["test", 0],
                ["fuck", 1],
                ["ringo", 0]
            ];
            var regularResultsB = [
                ["apple", 0],
                ["fuck", 2],
                [",twest", 0],
                ["fuck", 2],
                ["fuck", 2],
                ["test", 0],
                ["fuck", 2],
                ["ringo", 0]
            ];

            var resA = asortText(testRegex, testText, false);
            var resultA = (arrayEquals(resA[0], regularResultsA[0]));
            var resB = asortText(testRegex, testText, true);
            var resultB = (arrayEquals(resB[0], regularResultsB[0]));

            console.log("test text is : " + testText);
            console.log("regular A : ");
            console.log(regularResultsA);
            console.log("result A : ");
            console.log(resA);
            console.log("test A ............ " + (resultA ? "OK" : "FAILED"));
            console.log("regular B : ");
            console.log(regularResultsB);
            console.log("result B : ");
            console.log(resB);
            console.log("test B ............ " + (resultB ? "OK" : "FAILED"));

            console.log(resultA && resultB ? "OK" : "FAILED");
            addGreatestResult(resultA && resultB);
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start patternCheckText test..."); {
            var testTexts = [
                ["a", 1],
                ["abc", 1],
                ["a", 0],
                ["abc", 0]
            ];

            var regularResults = [
                ["a", 1],
                ["abc", 1],
                ["a", 1],
                ["abc", 1]
            ];


            var called = 0;
            var regularCallNum = 2;
            asortTextWithWildCard = function(a, b, c, d, e) {
                called++;
                return [
                    [c, 1]
                ];
            };

            var actuallyResults = patternCheckText(0, 0, testTexts, 0);
            var dataMatch = true;

            for (index in regularResults) {
                console.log("regular");
                console.log(regularResults[index]);
                console.log("actually");
                console.log(actuallyResults[index]);
                var _result = arrayEquals(regularResults[index], actuallyResults[index]);
                console.log(_result ? "OK" : "FAILED");
                dataMatch = dataMatch && _result;
            }

            console.log("regular call : " + regularCallNum + ", actually : " + called + " ............ " + ((regularCallNum == called) ? "OK" : "FAILED"));
            console.log(dataMatch && (regularCallNum && called) ? "OK" : "FAILED");
            addGreatestResult(dataMatch && (regularCallNum && called));
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("start _checkTextReplace test..."); {
            var testRequest = {
                "text": "abcdefghijklmnopqrstuvwxyz",
                "url": "test.com",
                "open": true
            };

            getBaseURL = function(url) {
                return url;
            }

            var regularCalledCWCT = 2;
            var calledCheckWildCardText = 0;
            checkWildCardText = function(key, aline, tf, url) {
                calledCheckWildCardText++;
                return (key == "abs") ? true : false;
            };

            var regularCalledPCT = 1;
            var calledPatternCheckText = 0;
            patternCheckText = function(a, b, c, d) {
                calledPatternCheckText++;
                return [c, 1];
            };

            var testPatterns = {
                "test": [{
                    "url": "test",
                    "regex": "text",
                    "open": true
                }],
                "abs": [{
                    "url": "test2",
                    "regex": "text2",
                    "open": true
                }],
            };

            _checkTextReplace(testRequest, testPatterns);

            console.log("regular called checkWildCardText");
            console.log(regularCalledCWCT);

            console.log("actually calledCheckWildCardText");
            console.log(calledCheckWildCardText);

            console.log("regular called patter check text");
            console.log(regularCalledPCT);

            console.log("actually calledPatternChecktext");
            console.log(calledPatternCheckText);

            console.log(regularCalledCWCT == calledCheckWildCardText && regularCalledPCT == calledPatternCheckText ? "OK" : "FAILED");
            addGreatestResult(regularCalledCWCT == calledCheckWildCardText && regularCalledPCT == calledPatternCheckText);
        }

        console.log("");
        console.log("");
        console.log("");

        console.log("all test is finished.");
        console.log("test procession called : " + testProcessinoCalled);
        console.log("test Successed : " + greatestResult);

        if (greatestResult == testProcessinoCalled)
            console.log("test all clean.");
        else
            console.log("test failed!");
    }
} catch (e) {
    console.log(e);
    console.log("Error!! test is failed!");
}

function switchCallRequestedMethod(request) {
    var response = null;
    switch (request.method) {
        case "replaceText":
            response = checkTextReplace(request);
            console.log(response);
            break;
    }
    return response;
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
    return read("patterns");
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
        patterns[baseUrl].push({ url: item.url, text: item.text, regex: item.regex, openable: item.openable });
    });
    return patterns;
}

function checkTextReplace(request) {
    return _checkTextReplace(request, read("patterns"));
}

function _checkTextReplace(request, patterns) {
    var texts = [
        [request.text, 0]
    ];
    for (key in patterns) {
        if (!checkWildCardText(key, true, true, getBaseURL(request.url)))
            continue;

        for (index in patterns[key]) {
            texts = patternCheckText(patterns[key][index], (patterns[key][index].regex != null), texts, request.open);
        }
    }
    return texts;
}

function patternCheckText(pattern, hasRegex, texts, canOpen) {
    var _texts = [];
    for (var i = 0; i < texts.length; i++) {
        if (texts[i][1] != 0) {
            _texts.push(texts[i]);
            continue;
        }
        var res = asortTextWithWildCard((hasRegex) ? pattern.regex : pattern.text, !hasRegex, texts[i][0], hasRegex, canOpen);
        console.log(res);
        for (k in res)
            _texts.push(res[k]);
    }
    console.log(_texts);
    return _texts;
}

function asortTextWithWildCard(pattern, convert, text, canOpen) {
    return asortText(patternToRegex(pattern, false, convert), text, canOpen);
}

function asortText(re, text, canOpen) {
    var result = [];
    while (true) {
        var _res = text.match(re);
        if (_res == null)
            break;

        if (_res.index != 0)
            result.push([text.slice(0, _res.index), 0]);
        result.push([text.substr(_res.index, _res[0].length), (canOpen) ? 2 : 1]);
        text = text.slice(_res.index + _res[0].length);
    }

    result.push([text, 0]);
    return result;
}

function checkWildCardText(pattern, aline, convert, text) {
    return (patternToRegex(pattern, aline, convert).exec(text)) ? true : false;
}

function patternToRegex(pattern, aline, convert) {
    pattern = (convert) ? replaceWildCardToRegex(pattern) : pattern;
    return new RegExp(aline ? "^" + pattern + "$" : pattern);
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

function getBaseURL(url) {
    var reBaseUrl = /\/\/([a-zA-Z0-9\*\?\[\]\!\-\#\.]+)\/?.*/;
    return reBaseUrl.exec(url)[1];
}

function getAddress(url) {
    var reAddress = /.*:\/\/(.+)/;
    return reAddress.exec(url)[1];
}