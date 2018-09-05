function backgroundSavePatternTest() {
    var items = [{
            "url": "http://google.com",
            "text": "heavy",
            "reg": false
        },
        {
            "url": "http://asagi.co.hjp",
            "text": "うんこ",
            "reg": false
        },
        {
            "url": "/http://omochhi.jp/.*/",
            "text": "クソ",
            "reg": true
        },
        {
            "url": "/http://[0-9a-zA-Z\.]+\/.+/",
            "text": "セエク",
            "reg": true
        },
        {
            "url": "/http://[.]+/",
            "text": "殺す",
            "reg": true
        },
        {
            "url": "/https?://[.]+/",
            "text": "びっくりする",
            "reg": true
        },
    ];
}