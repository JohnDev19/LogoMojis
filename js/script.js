function sendMessageToMessenger() {
    var message = "Hello there!";
    var messengerLink = "https://m.me/IamJohnPoras.org?ref=" + encodeURIComponent(message);
    var newWindow = window.open(messengerLink, "_blank");
    newWindow.opener = null;
}

$(document).ready(function() {
    var body = $("body"),
        screenWidth = $(window).width(),
        emojis = {
            animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'],
            things: ['🚗', '🏠', '📱', '💻', '🔑', '📚', '🖼️', '📺', '🛏️', '🕰️', '🎨', '🛒', '🚀', '🚴', '⚽'],
            foods: ['🍎', '🍔', '🍕', '🍣', '🍪', '🍩', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥕', '🍆', '🥒']
        },
        placeholder = $(".js-emoji"),
        introText = $(".js-intro-one"),
        tweetTrigger = $(".js-tweet");

    function getRandomEmoji(category) {
        var categoryEmojis = emojis[category];
        return categoryEmojis[Math.floor(Math.random() * categoryEmojis.length)];
    }

    function getRandomCategory() {
        var categories = Object.keys(emojis);
        return categories[Math.floor(Math.random() * categories.length)];
    }

    function generateEmoji() {
        var category1 = getRandomCategory(),
            category2 = getRandomCategory();
        
        // Ensure the two categories are different
        while (category1 === category2) {
            category2 = getRandomCategory();
        }

        var emoji1 = getRandomEmoji(category1),
            emoji2 = getRandomEmoji(category2),
            mashup = '<div class="slide-down">' + emoji1 + '</div> <div class="slide-up">' + emoji2 + "</div>",
            emojiPair = emoji1 + " + " + emoji2;

        placeholder.html('<div class="fade-in-medium">' + mashup + "</div>");
        introText.fadeOut(); // Fades out the intro text
    }

    function deployEmoji() {
        generateEmoji();
        ga("send", "event", "EmojiGenerator", "Generate Emoji", "Desktop Emoji");
    }

    $(document).keydown(function(e) {
        if (e.keyCode === 32) {
            deployEmoji();
        }
    });

    $("#filterSwitchForm").change(function() {
        var filterSwitchState = $("input[name='filterSwitch']:checked").val();
        if (filterSwitchState === "mashup") {
            body.addClass("mashup");
        } else {
            body.removeClass("mashup");
        }
    });

    $(".js-modal-trigger").bind("click", function() {
        var modalTriggerID = $(this).attr("id");
        var modal = $("#modal-" + modalTriggerID);
        modal.addClass("active");
        $("body").addClass("active-modal active-modal-" + modalTriggerID);
        $(".js-overlay").addClass("active");
    });

    $(".js-modal-x, .js-overlay").bind("click", function() {
        $(".js-modal").removeClass("active");
        $("body").removeClass("active-modal");
        $(".js-overlay").removeClass("active");
    });

    // Remove the initial emoji display
    placeholder.html('');

    // Function to show emoji only when spacebar is pressed
    $(document).keydown(function(e) {
        if (e.keyCode === 32) {
            deployEmoji();
        }
    });

    // Function to show emoji when tapped on mobile
    $(".di-sm-down-on").on("click", function() {
        deployEmoji();
    });
});
