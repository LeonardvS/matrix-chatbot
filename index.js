
// this function allows the bot (Morpheus) to speak and increments the message counter for later reply-decision-making
let morpheusMsgCounter = 0;
function morpheusSays(msg) {
    let newMessage = $("<div>")
    .addClass("chat");

    $('<img src="https://i.imgur.com/bSHd9JQ.jpg">')
    .addClass("photo")
    .appendTo(newMessage);

    $("<p>")
    .addClass("message")
    .text(msg)
    .appendTo(newMessage);

    $("<span>")
    .addClass("time")
    .text(time())
    .appendTo(newMessage);


    $("#chatlogs").append(newMessage);
    updateScroll();
    morpheusMsgCounter++;
}

// this function allows the user (Neo) to speak
function neoSays(msg) {
    let newMessage = $("<div>")
    .addClass("chat");

    $('<img src="https://i.imgur.com/zP3yb5L.jpg">')
    .addClass("photo")
    .appendTo(newMessage);

    $("<p>")
    .addClass("message")
    .text(msg)
    .appendTo(newMessage);

    $("<span>")
    .addClass("time")
    .text(time())
    .appendTo(newMessage);


    $("#chatlogs").append(newMessage);
    updateScroll();
}

// Neo gets a wake-up call from Morpheus at the start
morpheusSays("Wake up, Neo!");


function updateScroll() {
    const scrollPosition = $("#chatlogs")[0];
    scrollPosition.scrollTop = scrollPosition.scrollHeight;
}

// these two functions grab the user's input, invoke a reply from Morpheus and reset the textarea after the send button is clicked
function getInput() {
    let msgInput = $("textarea").val();
    neoSays(msgInput);

    // Morpheus answers after 1 second. He has the ability to answer accordingly if either "red" or "blue" is present in Neo's answer, else he defaults to a randomized answer.
    setTimeout(morpheusSays, 1000, () => {
        if(morpheusMsgCounter === 1) {
            return "Neo, for the tenth time, which one's it gonna be? The red, or the blue pill?";
        } else if(morpheusMsgCounter === 2 && msgInput.includes("red") || msgInput.includes("Red")) {
            return "Put on your big boy pants then, we're going for a rabbit hole ride!";
        } else if(morpheusMsgCounter === 2 && msgInput.includes("blue") || msgInput.includes("Blue")) {
            return "You really want me to wake you up again tomorrow? Coz I will!";
        } else {
            return morpheusReplies();
        }
    });

    $("textarea").val("");
}

$("button").on("click", function(event) {
    event.preventDefault();
    getInput();
});

$(".chat-form").on("keydown", function(event) {
    if (event.which === 13) {
      event.preventDefault();
      getInput();
    }
});


function time() {
    let date = new Date();
    let hours = date.getUTCHours() + 1;
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return hours + ":" + minutes + ":" + seconds;
}


// here we get a randomized answer from Morpheus
function morpheusReplies() {
    let replyArr = [
        "Welcome to the desert of the real, Neo",
        "Buckle your seatbelt, Dorothy, coz Kansas is going bye bye.",
        "What is real? How do you define 'real', Neo?",
        "Are you ready to reunite in 2021?",
        "Unfortunately, no one can be told what The Matrix is. You'll have to see it for yourself.",
        "Neo, no one has ever done anything like this.",
        "Whoa, you alright?",
        "What's your name?",
        "The matrix is a system, Neo. That system is our enemy.",
        "You have to let it all go. Fear, doubt, and disbelief, Free your mind.",
        "Do you think that's air you're breathing now?",
        "You are the one"
    ];

    return replyArr[Math.floor(Math.random() * 12)];
}





