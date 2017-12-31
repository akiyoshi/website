// depends on jquery, l20n.js and js.cookie

// not all browsers support navigator.languages - if not just use the browser render language
if (typeof navigator !== 'undefined' && navigator.languages === undefined) {
    navigator.languages = [navigator.language];
}

// when browser language changes reload the faq
$(window).bind("languagechange", function() {
    loadFaq();
});

loadFaq();

function loadFaq() {
    var locale = Cookies.get("locale") || getBrowserLocale();
    
    // first look for a translated faq
    $.get('./locales/faq.' + locale + '.md', function(md){
        $('.doc').html(new showdown.Converter().makeHtml(md));  
    }).fail(function(md){ // if no translation - fail back
        $.get('faq.md', function(md){
            $('.doc').html(new showdown.Converter().makeHtml(md));  
        });
    });
}        

function getBrowserLocale()
{
    if (typeof navigator !== 'undefined' && navigator.languages !== undefined) {
        // use the first lanaguage in the list as the user's preference
        var userLang = navigator.languages[0];

        return userLang.split('-')[0];
    }

    return "en";
}