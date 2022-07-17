const iframe = document.createElement('iframe', {src: 'about:blank'});
document.body.appendChild(iframe);
iframe.style = "display:none";

/*
const originWindow = window;
const sandboxWindow = iframe.contentWindow;

console.log('sandboxWindow', sandboxWindow);
console.log('originWindow', originWindow);

sandboxWindow.test = 'test-001';
console.log('sandboxWindow',sandboxWindow.test);
console.log('originWindow',originWindow.test);


console.log(sandboxWindow.location);
*/

const originWindow = window;
const sharedState = {
    document: window.document,
    history: window.history,
    location: window.location,
};

const sandboxWindow = new Proxy(iframe.contentWindow, {
    get(target, p) {
        if (sharedState[p]) {
            return sharedState[p];
        }
        return target[p];
    },
    set(target, p, value) {
        if (sharedState[p]) {
            sharedState[p] = value;
        }
        target[p] = value;
    }
});

console.log(sandboxWindow.document === originWindow.document);
console.log(sandboxWindow.history === originWindow.history);
console.log(sandboxWindow.location === originWindow.location);
