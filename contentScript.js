function getLoginFields() {
    var fieldPairs = [],
        pswd = (function(){
            var inputs = document.getElementsByTagName('input'),
                len = inputs.length,
                ret = [];
            while (len--) {
                if (inputs[len].type === 'password') {
                    ret[ret.length] = inputs[len];
                }
            }
            return ret;
        })(),
        pswdLength = pswd.length,
        parentForm = function(elem) {
            while (elem.parentNode) {
                if(elem.parentNode.nodeName.toLowerCase() === 'form') {
                    return elem.parentNode;
                }
                elem = elem.parentNode;
            }
        };
    while (pswdLength--) {
        var curPswdField = pswd[pswdLength],
            parentForm = parentForm(curPswdField),
            curField = curPswdField;
        if (parentForm) {
            var inputs = parentForm.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i] !== curPswdField && inputs[i].type === 'text') {
                    fieldPairs[fieldPairs.length] = [inputs[i], curPswdField];
                    break;
                }
            }
        }
    }
    return fieldPairs;
}

(() => {
chrome.runtime.onMessage.addListener((obj, sender, response) => {
    console.log(getLoginFields()[0][0].value);
    console.log(getLoginFields()[0][1].value);
  });

})();