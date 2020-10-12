// Style View

var sheet = document.createElement('style')
sheet.innerHTML = ".guidecontrol { position:fixed; top:20px; left: 20px; width:300px; background-color: #fbfbfb; box-shadow: 0px 0px 10px 0px #d8d8d8; color:#008BD0; padding: 10px 10px 20px; border-radius:5px; font-weight:bold; z-index:9999; }";
sheet.innerHTML += ".guidecontrol a{ font-size:11px; color: #008BD0; cursor:pointer; font-weight:normal; text-decoration:underline; margin:10px; }";
sheet.innerHTML += ".guidecontrol a:hover{ opacity: 0.5 }";
sheet.innerHTML += ".close{ position:absolute; top:6px; right:7px; width:10px; height:10px; background: url('https://img.icons8.com/windows/32/000000/close-window.png') no-repeat center center; cursor:pointer; }";
sheet.innerHTML += ".guidecontrol p{ padding:10px; margin: 0;}";
sheet.innerHTML += ".actionButton{ position: relative; white-space: nowrap; display:block; float:left; margin:10px 0px 10px 10px; cursor:pointer; background-color: #008BD0; border: 1px solid #008BD0; border-radius: 5px; box-shadow: inset 0px 0px 0px 1px rgba(255, 115, 100, 0.4), 0 1px 3px #333; color: #fff; font-size: 13px; font-weight: bold; letter-spacing: 1px; line-height: 1; padding:6px 7px; text-align: center; text-shadow: 0px -1px 1px rgba(0, 0, 0, .8); }";
sheet.innerHTML += ".nav{ clear:both; width:100%; float:left; padding-bottom: 10px;}";
sheet.innerHTML += ".gls_tooltip { position:absolute; left:0; top:0; background-color: #444; color:white; z-index:999; border-radius:5px; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=70); }";
sheet.innerHTML += ".gls_tooltip p{ padding:10px; font-size:14px; text-shadow:none; font-style:italic; }";
sheet.innerHTML += ".overlay{ position:fixed; width:100%; height:100%; top:0px; left:0px; background:#000; opacity:0.5; z-index:100; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50); }";
document.body.appendChild(sheet);

// Script Dependency

var script = document.createElement('script');
script.src = "https://code.jquery.com/jquery-3.5.1.min.js";
document.getElementsByTagName('head')[0].appendChild(script);

// Configure the steps
var stepsList = [
    {
        "name": "img#hplogo",
        "text": "<p>Welcome to <em><strong>Google</strong></em>!</p>",
        "position": "TL",
    },
    {
        "name": "a.gb_g",
        "text": "<p>Click <strong>Images</strong> to go to images section</p>",
        "position": "T"
    },
    {
        "name": "input.gLFyf.gsfi",
        "text": "<p>Enter a search query here and click ENTER!</p>",
        "position": "RT"
    },
    {
        "name": "div#SIvCob",
        "text": "<p>Click button Google Search</p>",
        "position": "T"
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

// Method that fires on click of Start button
function startLearning() {
    $('#startLearning').remove();
    $('#endLearning, #restartLearning').show();
    if (total_steps > 1)
        $('#nextstep').show();
    showOverlay();
    nextStep();
}

// Method that ends the learning
function endLearning() {
    step = 0;
    removeTooltip();
    hideGuidePanel();
    hideOverlay();
}

// Method to restart the learning
function restartLearning() {
    step = 0;
    nextStep();
}

// Method to display the next step
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

// Method to display the previous step
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

// Method to display the guided control main panel
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

// Method to hide the guided control main panel
function hideGuidePanel() {
    $('#guidecontrol').remove();
}

// Method to put an overlay to show the steps
function showOverlay() {
    var $overlay = '<div id="gls_overlay" class="overlay"></div>';
    $('BODY').prepend($overlay);
}

// Method to hide the overlay once guided learning is over
function hideOverlay() {
    $('#gls_overlay').remove();
}

// Method to add the tooltip
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

// Method to remove the tooltip
function removeTooltip() {
    $("#gls_tooltip").remove();
}