// DOM ready polyfill
function onDOMready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// On DOM ready
onDOMready(function(){

    // Init custom select inputs
    var FILTER_SELECT_CLASSNAME = 'filter__droprown-select';
    var FILTER_SELECT_MARKER = 'select-type-filter';
    var FORM_SELECT_CLASSNAME = 'form__select';
    var FORM_SELECT_MARKER = 'select-type-form';

    Select.init({
        selector: '.' + FILTER_SELECT_CLASSNAME,
        className: 'select-theme-default ' + FILTER_SELECT_MARKER
    });

    Select.init({
        selector: '.' + FORM_SELECT_CLASSNAME,
        className: 'select-theme-default ' + FORM_SELECT_MARKER
    });

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvanMifQ==
