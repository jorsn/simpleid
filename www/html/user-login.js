$(document).ready(function() {
    // Javascript is working, so tell the user
    $('.login-security').removeClass('unsecure').addClass('secure');
    $('.login-security p').html('Secure login using <strong>digest</strong>.  Your password is secured before it is sent to SimpleID.');
    $('input:disabled').removeAttr('disabled');
    $('#edit-pass').attr('autocomplete', 'off');
    
    $('form#login-form').submit(function() {
        $('#edit-submit').disabled = 'disabled';
        
        var user = $('#edit-name').val();
        var password = $('#edit-pass').val();
        var nonce = $('#edit-nonce').val();
        
        var digest1 = md5(user + ':' + md5(password));
        var digest = md5(nonce + ':' + digest1);
        
        // Set the digest
        $('#edit-digest').val(digest);
        
        // Set password to nothing
        $('#edit-pass').val('');
        $('#edit-pass').disabled = 'disabled';
        
        return true;
    });
});

function utf8_encode(s) {
    var code;
    var r = '';
    
    for (var i = 0; i < s.length; i++) {
        code = s.charCodeAt(i);
        
        if (code <= 0x7F) {
            r += String.fromCharCode(code);
        } else if (code <= 0x7FF) {
            r += String.fromCharCode((code >> 6) | 0xC0) + String.fromCharCode((code & 0x3F) | 0x80);
        } else if ((code <= 0xD7FF) || ((code >= 0xE000) && (code <= 0xFFFF))) {
            r += String.fromCharCode((code >> 12) | 0xE0) + String.fromCharCode(((code >> 6) & 0x3F) | 0xC0)
                 + String.fromCharCode((code & 0x3F) | 0x80); 
        } else if ((code >= 0xE000) && (code <= 0x10FFFF)) {
            r += String.fromCharCode((code >> 18) | 0xF0) + String.fromCharCode(((code >> 12) & 0x3F) | 0xE0)
                 + String.fromCharCode(((code >> 6) & 0x3F) | 0xC0) + String.fromCharCode((code & 0x3F) | 0x80);
        } else {
            return false;
        }
    }
    
    return r;
}

function md5(s) {
    return hex_md5(utf8_encode(s));
}
