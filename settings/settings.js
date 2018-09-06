window.onload = function() {
    var list = this.document.getElementById("site_list");
    var addButtonElement = document.getElementById("button_li");

    document.getElementById("add_button").addEventListener("click", function(e) {
        AddInputField();
        return false;
    });

    this.document.getElementById("save_button").addEventListener("click", function(e) {
        SaveData();
        alert("data are saved.");
        return false;
    });

    var data = GetData();
    for (key in data) {
        console.log(key);
        for (var i = 0; data[key] && i < data[key].length; i++) {
            CreateInputField(list, addButtonElement, data[key][i].url, data[key][i].text);
        }
    }
};

function GetData() {
    return JSON.parse(chrome.extension.getBackgroundPage().getData());
}

function SaveData() {
    var elements = document.getElementById("site_list").children;
    var items = [];
    var deletes = [];
    for (var i = 0; i < elements.length - 1; i++) {
        var item = {};
        var fields = elements[i].getElementsByTagName("input");
        if (fields[2].checked) {
            deletes.push(i);
            continue;
        }

        item["url"] = fields[0].value;
        item["text"] = fields[1].value;
        items.push(item);
    }
    chrome.extension.getBackgroundPage().savePattern(JSON.stringify(items));
    DeleteFields(deletes);
}

function AddInputField() {
    var list = this.document.getElementById("site_list");
    var addButtonElement = document.getElementById("button_li");
    CreateInputField(list, addButtonElement, "", "");
}

function DeleteField(index) {
    var list = this.document.getElementById("site_list");
    if (index == list.childElementCount - 1)
        return;
    var target = list.children[index];
    target.remove();
}

function DeleteFields(indexes) {
    var list = this.document.getElementById("site_list");
    var targets = [];
    for (index in indexes) {
        if (index == list.childElementCount - 1)
            return;
        targets.push(list.children[index]);
    }

    targets.forEach(function(target) {
        target.remove();
    });
}

function CreateInputField(parent, youngBro, url, text) {
    var li = document.createElement("li");
    var label1 = document.createElement("label");
    var urlField = document.createElement("input");
    urlField.name = "url";
    urlField.type = "text";
    urlField.value = url;

    var label1Text = document.createTextNode("Site url: ");
    label1.appendChild(label1Text);
    label1.appendChild(urlField);

    li.appendChild(label1);

    var label2 = document.createElement("label");
    var textField = document.createElement("input");
    textField.name = "text";
    textField.type = "text";
    textField.value = text;

    var label2Text = document.createTextNode("disable text: ");
    label2.appendChild(label2Text);
    label2.appendChild(textField);

    li.appendChild(label2);

    var label3 = document.createElement("label");
    var deleteCheckBox = document.createElement("input");
    deleteCheckBox.name = "delete";
    deleteCheckBox.type = "checkbox";
    deleteCheckBox.value = 0;

    var label3Text = document.createTextNode("delete");
    label3.appendChild(deleteCheckBox);
    label3.appendChild(label3Text);

    li.appendChild(label3);

    parent.insertBefore(li, youngBro);
}