var config = {
    debug: true,
    css_dir: 'styles',
    html_dir: 'html',
    img_dir: 'images',
    js_dir: 'js'
};

const http = require('http'), fs = require('fs');
const port = process.env.PORT || 80;


fs.readFile('config.json', 'utf8', function (err, data) {
    if (err) {
        console.error('Failed to load config file: ' + err);
        console.error('Using default sets.');
        return;
    }
    var parsed_config;
    try {
        parsed_config = JSON.parse(data);
    }
    catch (json_err)
    {
        console.error('Failed to load config file: ' + json_err);
        console.error('Using default sets.');
        return;
    }
    console.log('[CONFIG] \x1b[43m\x1b[30mDebug: ' + (( config.debug = parsed_config.enable_debug ) ? '\x1b[42mtrue' :'\x1b[41mfalse') + '\x1b[0m');
    console.log('[CONFIG] \x1b[43m\x1b[30mCSS Folder: \x1b[46m' + (config.css_dir = parsed_config.default_styles_folder ) + '\x1b[0m');
    console.log('[CONFIG] \x1b[43m\x1b[30mHTML Folder: \x1b[46m' + (config.html_dir = parsed_config.default_html_folder ) + '\x1b[0m');
    console.log('[CONFIG] \x1b[43m\x1b[30mImages Folder: \x1b[46m' + (config.img_dir = parsed_config.default_images_folder ) + '\x1b[0m');
    console.log('[CONFIG] \x1b[43m\x1b[30mJavaScript Folder: \x1b[46m' + (config.js_dir = parsed_config.default_javascript_folder) + '\x1b[0m');
    console.log('');
});

fs.readFile('rewrites.json', 'utf8', function (err, data) {
    if (err) {
        console.error('Failed to load rewrites file: ' + err);
        console.error('No rewrites can be used.\n');
        return;
    }
});

console.log('[START] Trying to initialize server...');
http.createServer(function (req, res) {
    DebugMsg('Requested for \"' + req.url.slice(1, req.url.length) + '\"', 'REQUEST');

    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
        renderPage(res, config.css_dir + req.url);
    }
    else if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
        renderPage(res, config.js_dir + req.url);
    }
    else if (req.url.endsWith('.ico')) {
        res.setHeader('Content-Type', 'image/x-icon');
        renderPage(res, config.img_dir + req.url);
    }
    else if (req.url.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
        renderPage(res, config.img_dir + req.url);
    }
    else if (req.url.endsWith('.jpg') || req.url.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
        renderPage(res, config.img_dir + req.url);
    }
    else {
        if (req.url == '/') req.url = '/index';
        var html_page_str = config.html_dir + req.url + '.html';
        res.setHeader('Content-Type', 'text/html');
        fs.readFile(html_page_str, 'utf8', function (err, data) {
            if (err) {
                DebugMsg('Can`t load HTML: ' + err);
                renderPage(res, config.html_dir + '/404.html', 404);
                return;
            }
            renderPage(res, html_page_str, 200);
        });
    }
}).listen(port);
console.log('[START] Server has been started (Port: ' + port + ').\n\n');

function DebugMsg(msg, debug_prefix = 'DEBUG') {
    if (config.debug) console.log('[' + debug_prefix + '] ' + msg);
}

function renderPage(response_variable, page_name, code) {
    DebugMsg('Drawing \"' + page_name + '\"...\n', 'DRAWER');
    if (code) response_variable.statusCode = code;
    fs.readFile(page_name, 'utf8', function (err, data) {
        if (err) {
            DebugMsg('\"' + page_name + '\" doesn`t exists:');
            DebugMsg(err);
            response_variable.end('');
            return;
        }
        fs.createReadStream(page_name).pipe(response_variable);
    });
}

/*
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
 * String.endsWith(...) prototype
 */
if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, 'endsWith', {
        value: function (searchString, position) {
            var subjectString = this.toString();
            if (position === undefined || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        }
    });
}