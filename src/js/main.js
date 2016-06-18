// DOM ready polyfill
function DOMready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// On DOM ready
DOMready(function(){
    var FILTER_SELECT_CLASSNAME = 'filter__droprown-select'
    var FILTER_SELECT_MARKER = 'select-type-filter'

    Select.init({
        selector: '.' + FILTER_SELECT_CLASSNAME,
        className: 'select-theme-default ' + FILTER_SELECT_MARKER
    });
});
