const max_sliders = 3;

droplist.onclick = function () {
    unclickPopup();
    unclickSlider();

    toggleDisplay('droplist_list', false);

    toggleColor('droplist');
    toggleDisplay('droplist_block');
};

droplist_btn.onclick = function () {
    toggleDisplay('droplist_list');
};

popup.onclick = function () {
    unclickDroplist();
    unclickSlider();

    toggleColor('popup');
    toggleDisplay('popup_block');
};

popup_bg.onclick = function () {
    toggleDisplay('popup_list', false);
};

popup_btn.onclick = function () {
    toggleDisplay('popup_list');
};

slider.onclick = function () {
    unclickDroplist();
    unclickPopup();

    toggleColor('slider');
    toggleDisplay('slider_block');
};

slider_img.onclick = function () {
    switchSlider('slider_img', 'slider', true);
};

function unclickDroplist() {
    toggleDisplay('droplist_list', false);

    toggleColor('droplist', false);
    toggleDisplay('droplist_block', false);
}

function unclickPopup() {
    toggleColor('popup', false);
    toggleDisplay('popup_block', false);
}

function unclickSlider() {
    toggleColor('slider', false);
    toggleDisplay('slider_block', false);
}

function toggleDisplay(id, state) {
    const element = document.getElementById(id);
    const style = getComputedStyle(element);

    if (state != undefined) {
        if (state == true) element.style.display = "block";
        else element.style.display = "";
    }
    else {
        if (style.display == "none") toggleDisplay(id, true);
        else toggleDisplay(id, false);
    }
}

function toggleColor(id, state) {
    const element = document.getElementById(id);
    const style = getComputedStyle(element);

    if (state != undefined) {
        if (state == true) {
            element.style.background = "rgb(190, 151, 108)";
            element.style.border = "none";
            element.style.borderRadius = "4px";
            element.style.borderBottomLeftRadius = "0px";
            element.style.borderBottomRightRadius = "0px";
        }
        else {
            element.style.background = "";
            element.style.border = "";
            element.style.borderRadius = "";
            element.style.borderBottomLeftRadius = "";
            element.style.borderBottomRightRadius = "";
        }
    }
    else {
        if (!style.background.startsWith('rgba(211, 195, 195, ') && !style.background.startsWith('rgb(190, 151, 108)')) toggleColor(id, true);
        else toggleColor(id, false);
    }
}

/* Slider's state: true - next, false - prev, any integer - set slide by num */
function switchSlider(id, folder, state) {
    const element = document.getElementById(id);
    const src = element.getAttribute('src');

    var cur_slider = parseInt(src.slice(folder.length + 1, src.length - 4));
    if (Number.isInteger(state)) cur_slider = state;
    else {
        if (state == true || state == undefined) cur_slider++;
        else cur_slider--;
    }
    if (cur_slider > max_sliders) cur_slider = 1;
    if (cur_slider < 1) cur_slider = max_sliders;

    element.src = folder + '/' + cur_slider + '.png';
}