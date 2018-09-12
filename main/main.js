window.onload = function() {
    getTextRecursion(document.body);
    var options = {
        childList: true,
        characterData: true,
        subtree: true
    };
    var observer = new MutationObserver(function(mutations, _observer) {
        observer.disconnect();
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                getTextRecursion(node);
                console.log(node);
            });
        });
        observer.observe(document, options);
    });
    observer.observe(document, options);
};

function getTextRecursion(element) {
    skipTag = ["script", "noscript", "style"];
    element.childNodes.forEach(function(node) {
        if (node.tagName) {
            getTextRecursion(node);
        } else {
            _getTextRecursion(node);
        }
    });
    _getTextRecursion(element);
}

function _getTextRecursion(node) {
    if (
        node.nodeType == Node.TEXT_NODE &&
        skipTag.indexOf(node.parentNode.tagName.toLowerCase()) == -1 &&
        node.data.trim() != ""
    ) {
        replaceNode(node);
    }
}

function replaceNode(node) {
    chrome.runtime.sendMessage({ method: "replaceText", url: location.href, text: node.data }, function(result) {
        var newNodes = createReplacement(result.texts, result.replaceTo);
        for (index in newNodes) {
            node.parentNode.insertBefore(newNodes[index], node);
        }
        node.parentNode.removeChild(node);
    });
}

function createReplacement(texts, replaceTo) {
    var newNodes = [];
    for (index in texts) {
        var text = texts[index];
        if (text[1] == 0)
            newNodes.push(createTextNode(text[0]));
        else if (text[1] == 1)
            newNodes.push(createTextNode(replaceTo));
        else
            newNodes.push(createSpanElement(text[0], replaceTo));
    }
    return newNodes;
}

function createTextNode(text) {
    return document.createTextNode(text);
}

function createSpanElement(text, replaceTo) {
    var element = document.createElement("span");
    element.className = "rsc-H18M53";
    element.setAttribute("rsc-H18M53-value-disp", replaceTo);
    element.setAttribute("rsc-H18M53-value-replaced", text);
    element.setAttribute("rsc-H18M53-value-state-opened", 0);
    var textNode = document.createTextNode(replaceTo);
    element.appendChild(textNode);

    element.addEventListener("click", function(e) {
        var elem = e.target;
        if (elem.getAttribute("rsc-H18M53-value-state-opened") == 0) {
            replaceDisabledText(elem, document.createTextNode(elem.getAttribute("rsc-H18M53-value-replaced")));
            elem.setAttribute("rsc-H18M53-value-state-opened", 1);
        } else {
            replaceDisabledText(elem, document.createTextNode(elem.getAttribute("rsc-H18M53-value-disp")));
            elem.setAttribute("rsc-H18M53-value-state-opened", 0);
        }
    });
    return element;
}

function replaceDisabledText(node, text) {
    node.insertBefore(text, node.childNodes[0]);
    node.removeChild(node.childNodes[1]);
}