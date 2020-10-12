// Configure the steps
var stepsList = [
    {
        "name": "img#hplogo",
        "text": "<p>Welcome to <em><strong>Google</strong></em>!</p>\n",
        "position": "top"
    },
    {
        "name": "a.gb_g",
        "text": "<p>Click <strong>Images</strong> to go to images section</p>\n",
        "position": "bottom"
    },
    {
        "name": "input.gLFyf.gsfi",
        "text": "<p>Enter a search query here and click ENTER!</p>\n",
        "position": "left"
    },
    {
        "name": "input.gNO89b",
        "text": "<p>Click here to search</p>\n",
        "position": "bottom"
    }
];

var step = 0;    // Current step
var total_steps = stepsList.length;    // Total number of steps

displayGuidePanel();

// Event handlers for starting, stopping & navigationg through the learning 
document.getElementById("startLearning").addEventListener("click", startLearning);
document.getElementById("cancelLearning").addEventListener("click", endLearning);
document.getElementById("endLearning").addEventListener("click", endLearning);
document.getElementById("restartLearning").addEventListener("click", restartLearning);
document.getElementById("prevstep").addEventListener("click", prevStep);
document.getElementById("nextstep").addEventListener("click", nextStep);

function startLearning() {
    $('#startLearning').remove();
    $('#endLearning, #restartLearning').show();
    if (total_steps > 1)
        $('#nextstep').show();
    showOverlay();
    nextStep();
}

function endLearning() {
    step = 0;
    removeTooltip();
    hideGuidePanel();
    hideOverlay();
}

function restartLearning() {
    step = 0;
    nextStep();
}

// Displays the next step in learning algorithm
function nextStep() {
    // Show Previous button only if it is not the first step
    if (step > 0)
        $('#prevstep').show();
    else
        $('#prevstep').hide();

    // Show Next step only if it is not the last step
    if (step == total_steps)
        $('#nextstep').hide();
    else
        $('#nextstep').show();

    // End the guided learning if it is the last step
    if (step >= total_steps) {
        endLearning();
        return false;
    }
    ++step;
    showTooltip();
}

// Displays the previous step in learning algorithm
function prevStep() {
    if (step > 1)
        $('#prevstep').show();
    else
        $('#prevstep').hide();

    if (step == total_steps)
        $('#nextstep').show();

    if (step <= 1)
        return false;
    --step;
    showTooltip();
}

// Displays the guided control main panel
function displayGuidePanel() {
    var $guidecontrol = document.createElement("div");
    $guidecontrol.className = ("guidecontrol");
    $guidecontrol.id = "guidecontrol";
    $guidecontrol.innerHTML += '<p>Welcome to Guided Learning Solution!</p>';
    $guidecontrol.innerHTML += '<span class="actionButton" id="startLearning">Start Learning</span>';
    $guidecontrol.innerHTML += '<div class="nav"><span class="actionButton" id="prevstep" style="display:none;">< Previous</span><span class="actionButton" id="nextstep" style="display:none;">Next ></span></div>';
    $guidecontrol.innerHTML += '<a id="restartLearning" style="display:none;">Restart the guided learning!</a>';
    $guidecontrol.innerHTML += '<a id="endLearning" style="display:none;">Close</a>';
    $guidecontrol.innerHTML += '<span class="close" id="cancelLearning"></span>';
    $('BODY').prepend($guidecontrol);
}

// Hides the guided control main panel
function hideGuidePanel() {
    $('#guidecontrol').remove();
}

// Puts an overlay to show the steps
function showOverlay() {
    var $overlay = '<div id="gls_overlay" class="overlay"></div>';
    $('BODY').prepend($overlay);
}

// Hides the overlay once guided learning is over
function hideOverlay() {
    $('#gls_overlay').remove();
}

// Add the tooltip step
function showTooltip() {
    removeTooltip();        //remove current tooltip
    var step_config = stepsList[step - 1];
    var $elem = $(step_config.name);

    var $tooltip = $('<div>', {
        id: 'gls_tooltip',
        class: 'gls_tooltip',
        html: step_config.text
    }).css({
        'display': 'none'
    });

    var properties = {};        //the css properties the tooltip should have
    var tip_position = step_config.position;
    $('BODY').append($tooltip);

    //getting position info of the element
    var e_w = $elem.outerWidth();
    var e_h = $elem.outerHeight();
    var e_l = $elem.offset().left;
    var e_t = $elem.offset().top;


    switch (tip_position) {
        case 'TL':
            properties = {
                'left': e_l,
                'top': e_t + e_h + 'px'
            };
            break;
        case 'TR':
            properties = {
                'left': e_l + e_w - $tooltip.width() + 'px',
                'top': e_t + e_h + 'px'
            };
            break;
        case 'BL':
            properties = {
                'left': e_l + 'px',
                'top': e_t - $tooltip.height() + 'px'
            };
            break;
        case 'BR':
            properties = {
                'left': e_l + e_w - $tooltip.width() + 'px',
                'top': e_t - $tooltip.height() + 'px'
            };
            break;
        case 'LT':
            properties = {
                'left': e_l + e_w + 'px',
                'top': e_t + 'px'
            };
            break;
        case 'LB':
            properties = {
                'left': e_l + e_w + 'px',
                'top': e_t + e_h - $tooltip.height() + 'px'
            };
            break;
        case 'RT':
            properties = {
                'left': e_l - $tooltip.width() + 'px',
                'top': e_t + 'px'
            };
            break;
        case 'RB':
            properties = {
                'left': e_l - $tooltip.width() + 'px',
                'top': e_t + e_h - $tooltip.height() + 'px'
            };
            break;
        case 'T':
            properties = {
                'left': e_l + e_w / 2 - $tooltip.width() / 2 + 'px',
                'top': e_t + e_h + 'px'
            };
            break;
        case 'R':
            properties = {
                'left': e_l - $tooltip.width() + 'px',
                'top': e_t + e_h / 2 - $tooltip.height() / 2 + 'px'
            };
            break;
        case 'B':
            properties = {
                'left': e_l + e_w / 2 - $tooltip.width() / 2 + 'px',
                'top': e_t - $tooltip.height() + 'px'
            };
            break;
        case 'L':
            properties = {
                'left': e_l + e_w + 'px',
                'top': e_t + e_h / 2 - $tooltip.height() / 2 + 'px'
            };
            break;
    }
    $tooltip.css(properties).show();
}

// Removes the tooltip
function removeTooltip() {
    $("#gls_tooltip").remove();
}