var chai = require('chai');
var assert = chai.assert;

describe('App Initialization', function () {
    var stepsList;
    beforeEach(function () {
        stepsList = [
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
    });

    describe('Validate the learning steps', function () {
        var currentStep;
        it('Should have atleast one step', function () {
            var total_steps = stepsList.length;
            assert(total_steps > 0);
        });

        it('Total steps is validated', function () {
            var total_steps = stepsList.length;
            assert.strictEqual(total_steps, 4);
        });

        it('A valid step should contain a unique name', function () {
            currentStep = stepsList[0];
            assert.isNotEmpty(currentStep['name']);
        });

        it('A valid step should contain a guided body', function () {
            currentStep = stepsList[0];
            assert.isNotEmpty(currentStep['text']);
        });

        it('A valid step should contain a valid position', function () {
            currentStep = stepsList[0];
            assert.isNotEmpty(currentStep['position']);
        });

    });
});

