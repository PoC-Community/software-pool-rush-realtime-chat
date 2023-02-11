if (!!window.EventSource) {
    var source = new EventSource('/stream/{{.roomid}}');
    source.addEventListener('message', function(e) {
        $('#messages').append(e.data + "</br>");
        $('html, body').animate({scrollTop:$(document).height()}, 'slow');
    }, false);
} else {
    alert("NOT SUPPORTED");
}