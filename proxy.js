const createSandbox =(ctx = {}) =>  new Proxy(ctx, {
    get(target, p) {
        if (target[p]) {
            return target[p];
        }
        return window[p];
    },
    set(target, p, value) {
        target[p] = value;
    }
});

const sandbox1 = createSandbox();
const sandbox2 = createSandbox();

sandbox1.test = 'test001';
console.log('window.test', window.test);
console.log('sandbox1.test', sandbox1.test);
console.log('sandbox2.test', sandbox2.test);

sandbox2.test = 'test002';
console.log('window.test', window.test);
console.log('sandbox1.test', sandbox1.test);
console.log('sandbox2.test', sandbox2.test);

console.log('sandbox1 document equal:', window.document === sandbox1.document);
console.log('sandbox2 document equal:', window.document === sandbox2.document);