var socket = io();

socket.on('connect', function () {
    console.log('Connected to socket.io server!');
});

socket.on('message', function (message) {
    console.log('New message:');
    console.log(message.text);

    jQuery('.messages').append('<p><strong>' + message.timestamp + '</strong>: ' + message.text +'</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();

    var $messageText = $form.find('input[name=message]').val();
    var now = moment();
    var timestampMoment = moment.utc(now.valueOf());

    socket.emit('message', {
        text: $messageText,
        timestamp: timestampMoment.local().format('h:mm a')
    });

    $form[0].reset();
});