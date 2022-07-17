let ctxSnapshot = null;

function snapshot(ctx) {
    ctxSnapshot = {};
    for (const item in ctx) {
        ctxSnapshot[item] = ctx[item]
    }
}

function restore(ctx) {
    for (const item in ctx) {
        if (ctx[item] !== ctxSnapshot[item]) {
            ctx[item] = ctxSnapshot[item];
        }
    }
    ctxSnapshot = null;
}

snapshot(window);
window.test = 'test001';
console.log('sandbox windo', window.test);
restore(window);
console.log('origin window', window.test);

