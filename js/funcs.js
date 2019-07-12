/* Override console.log */
(function () {
    console.log = function (text) {
        drawToID(text);
    };
})();
/* Override console.log */

console.log('This is a WEB CONSOLE!');
console.log('');
console.log('Open your console using F12 and type "drawRhomb(size)" or "drawTriangle(size)".');
console.log('Otherwise you can always experiment with yours "console.log"!\n');

function drawTriangle(size = 3) {
    if (size <= 1) size = 1;

    for (var i = 0; i < size; i++) {
        var drawer_str = '';
        for (var j = size - i; j > 1; j--) drawer_str += ' ';
        drawer_str += '/';
        for (var j = 0; j < i * 2; j++)
            if (i == size - 1) drawer_str += '_';
            else drawer_str += ' ';
        drawer_str += '\\';
        console.log(drawer_str);
    }
    console.log('');
}

function drawRhomb(size = 3) {
    if (size <= 1) size = 1;

    for (var i = 0; i < size; i++) {
        var drawer_str = '';
        for (var j = size - i; j > 1; j--) drawer_str += ' ';
        drawer_str += '/';
        for (var j = 0; j < i * 2; j++) drawer_str += ' ';
        drawer_str += '\\';
        console.log(drawer_str);
    }

    for (var i = size; i > 0; i--) {
        var drawer_str = '';
        for (var j = size - i; j > 0; j--) drawer_str += ' ';
        drawer_str += '\\';
        for (var j = 2; j < i * 2; j++) drawer_str += ' ';
        drawer_str += '/';
        console.log(drawer_str);
    }
    console.log('');
}

function multiply(arg1, arg2) {
    var ret = arg1;
    for (var i = 1; i < arg2; i++) ret += arg1;
    return ret;
}

function drawToID(str) {
    document.getElementById("id_console").textContent += str + '\n';
}