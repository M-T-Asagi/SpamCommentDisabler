try {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        sendResponse(switchCallRequestedMethod(request));
    });
} catch (e) {
    console.log("this is not chrome ent;");
}

if (process.argv && process.argv.length > 2 && process.argv[2] == "debug") {
    console.log("start test.");

    console.log("start replaceW2ildCardToRegex test..."); {
        var testInput = "http?://*.*/[!kill]/#abc\+bbc";
        var processed = replaceWildCardToRegex(testInput);
        var regular = "http.?:\\/\\/.*\\..*\\/[^kill]\\/[0-9]abc\+bbc";
        console.log("test input is : " + testInput + " : processed : " + processed + " : regular : " + regular);
        console.log((processed == regular) ? "OK" : "FAILED");
    }

    console.log("");
    console.log("");
    console.log("");

    console.log("start checkWildCardtext test..."); {
        var testPattern = "http?://*twitter.com/*";
        var testUrls = [
            "http://twitter.com/",
            "http://www.twitter.com/",
            "https://www.twitter.com/",
            "http://www.twitter.com/asagi_00a3af/status/12567890?buf=true",
            "http://www.twitter.el/",
            "http://www.twittera.com/",
        ]
        var regular = [true, true, true, true, false, false];

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

        var a = true;
        for (var i = 0; i < regular.length; i++) {
            if (regular[i] != results[i]) {
                a = false;
                break;
            }
        }
        console.log((a) ? "OK" : "FAILED");
    }
}

function switchCallRequestedMethod(request) {
    var response = null;
    switch (request.method) {
        case "savePattern":
            localStorage["patterns"] = savePattern(request.items);
            break;
        case "checkComment":
            response = checkComment(localStorage["patterns"], request);
            break;
    }
    return response;
}

function savePattern(items) {
    var reBaseUrl = /https?:\/\/(([\*0-9a-zA-Z]+\.)+[\*0-9a-zA-Z]+).*/;
    var patterns = {};
    items.forEach(function(item) {
        var baseUrl = reBaseUrl.match(item.url)[1];
        if (!patterns[baseUrl])
            patterns[item.url] = {};
        patterns[item.url].push({ url: item.url, text: item.text, isReg: item.reg });
    });
    return patterns;
}

function checkComment(patterns, request) {
    kies = [];
    result = false;
    for (key in patterns) {
        if (key.indexOf("*") >= 0) {
            if (!(new RegExp(key.replace(/\./, "\."))).exec(request.url))
                break;

            for (var i = 0; i < patterns[key].length; i++) {
                if (patterns[key][i].isReg && (new RegExp(patterns[key][i].url).exec(request.url) && (new RegExp(patterns[key][i].text).exec(request.text)))) {
                    result = true;
                    break;
                } else if (!patterns[key][i].isReg && patterns[key][i].text == request.text) {
                    result = true;
                    break;
                }
            }
        } else {
            if (key != request.url)
                break;

            for (var i = 0; i < patterns[key].length; i++) {
                if (patterns[key][i].isReg && (new RegExp(patterns[key][i].url).exec(request.url) && (new RegExp(patterns[key][i].text).exec(request.text)))) {
                    result = true;
                    break;
                } else if (!patterns[key][i].isReg && patterns[key][i].text == request.text) {
                    result = true;
                    break;
                }
            }
        }

        if (result)
            break;
    }

    return result;
}

function checkWildCardtext(pattern, text) {
    pattern = replaceWildCardToRegex(pattern);
    re = new RegExp(pattern);
    return (re.exec(text)) ? true : false;
}

function replaceWildCardToRegex(pattern) {
    pattern = pattern.replace(/\./g, "\\.");
    pattern = pattern.replace(/\//g, "\\\/");
    pattern = pattern.replace(/\*/g, ".*");
    pattern = pattern.replace(/\?/g, ".?");
    pattern = pattern.replace(/\+/g, "\+");
    pattern = pattern.replace(/\[\!/g, "[^");
    pattern = pattern.replace(/\#/g, "[0-9]");

    return pattern;
}