const session_time = 3600;
const current_time = Date.now();

document.getElementById('usrnm').focus();
if (!localStorage.getItem('jsession_time') || localStorage.getItem('jsession_time') < Date.now()) {

}

login_btn.onclick = function () {
    let username_text = document.getElementById('usrnm').value;
    let password_text = document.getElementById('pswrd').value;
    if (username_text.length < 4) {
        alert('Login error!\n\nUsername must be atleast 4 symbols length!');
        return;
    }
    if (password_text.length < 6) {
        alert('Login error!\n\nYour password too small!');
        return;
    }
    var xhr = new XMLHttpRequest();
    var body = '{"usrnm":"' + encodeURIComponent(username_text) + '","pswrd":"' + encodeURIComponent(password_text) + '"}';
    xhr.open("POST", '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //xhr.onreadystatechange = ...;

    xhr.send(body);
};