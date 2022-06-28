window.onload = function() {
    var options_num = 1;
    function add_option() {
        var prev = $("#option-" + options_num);
        var prev_html = prev.prop('outerHTML');
        var new_html = prev_html.replaceAll(options_num, options_num + 1);
        $(new_html).insertAfter(prev);
        options_num++;
    }

    document.getElementById('add-option-button').onclick = (add_option);
}