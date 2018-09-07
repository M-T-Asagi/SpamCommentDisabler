window.onload = function() {
    getTextRecursion(document.body)
}

function getTextRecursion(element) {
    skipTag = ["script", "noscript", "style"];
    element.childNodes.forEach(function(node) {
        if (node.tagName) {
            getTextRecursion(node);
        } else if (skipTag.indexOf(node.parentNode.tagName.toLowerCase()) == -1 && node.data.trim() != "") {
            chrome.runtime.sendMessage({ method: "replaceText", url: location.href, text: node.data }, function(result) {
                console.log(result);
                node.data = JSON.parse(result);
            });
        }
    });
}