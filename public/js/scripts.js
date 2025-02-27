var currentQuestionID = null; // Variable to store the current question ID

$(document).ready(function () {
    loadQuestion(); // Load the first question on page load
});

function loadQuestion() {
    $.ajax({
        url: 'get_question.php',
        type: 'GET',
        success: function (data) {
            var question = JSON.parse(data);
            $('#question').text(question.Question);
            $('#answer').text(question.Answer);
            $('#questionID').val(question.ID);
            currentQuestionID = question.ID; // Set the current question ID
            updateButtonStates(); // Update button states
        }
    });
}

function flipCard() {
    // Make an AJAX request to update the "Solved" status in the database
    $.ajax({
        url: 'update_status.php',
        type: 'POST',
        data: { questionID: $('#questionID').val() },
        success: function () {
            // Flip the card by adding a CSS class
            var flashcard = $('.flashcard');
            flashcard.toggleClass('flipped');
        }
    });
}

function nextQuestion() {
    $.ajax({
        url: 'get_next_question.php',
        type: 'GET',
        data: { currentQuestionID: currentQuestionID },
        success: function (data) {
            var question = JSON.parse(data);
            if (question) {
                $('#question').text(question.Question);
                $('#answer').text(question.Answer);
                $('#questionID').val(question.ID);
                currentQuestionID = question.ID; // Update the current question ID
                $('.flashcard').removeClass('flipped');
                updateButtonStates(); // Update button states
            } else {
                alert('No next question found.');
            }
        }
    });
}

function prevQuestion() {
    $.ajax({
        url: 'get_prev_question.php',
        type: 'GET',
        data: { currentQuestionID: currentQuestionID },
        success: function (data) {
            var question = JSON.parse(data);
            if (question) {
                $('#question').text(question.Question);
                $('#answer').text(question.Answer);
                $('#questionID').val(question.ID);
                currentQuestionID = question.ID; // Update the current question ID
                $('.flashcard').removeClass('flipped');
                updateButtonStates(); // Update button states
            } else {
                alert('No previous question found.');
            }
        }
    });
}

function updateButtonStates() {
    // Enable or disable the "Next Question" button based on the availability of the next question
    $.ajax({
        url: 'get_next_question.php',
        type: 'GET',
        data: { currentQuestionID: currentQuestionID },
        success: function (data) {
            var question = JSON.parse(data);
            if (!question) {
                // No next question found, disable the button
                $('#nextButton').prop('disabled', true);
            } else {
                $('#nextButton').prop('disabled', false);
            }
        }
    });

    // Enable or disable the "Previous Question" button based on the availability of the previous question
    $.ajax({
        url: 'get_prev_question.php',
        type: 'GET',
        data: { currentQuestionID: currentQuestionID },
        success: function (data) {
            var question = JSON.parse(data);
            if (!question) {
                // No previous question found, disable the button
                $('#prevButton').prop('disabled', true);
            } else {
                $('#prevButton').prop('disabled', false);
            }
        }
    });
}
