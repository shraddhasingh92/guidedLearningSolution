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