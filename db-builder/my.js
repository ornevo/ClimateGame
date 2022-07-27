window.onload = function() {
    let options_num = 1;
    function add_option() {
        let prev = $("#option-" + options_num);
        let prev_html = prev.prop('outerHTML');
        let new_html = prev_html.replaceAll(options_num, options_num + 1);
        $(new_html).insertAfter(prev);
        options_num++;
    }

    document.getElementById('add-option-button').onclick = (add_option);
}