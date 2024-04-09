window.initGauge = (canvasId, canvasWidth, canvasHeight, minValue, maxValue, selectedValue, text, startColor, endColor)=>{

    var canvas = document.getElementById(canvasId);

    if (!canvas) {

        console.error("Canvas element with id '" + canvasId + "' not found.");

        return;

    }

    var context = canvas.getContext('2d');

    if (!context) {

        console.error("Canvas context could not be retrieved.");

        return;

    }

    var centerX = canvasWidth / 2;

    var centerY = canvasHeight / 2;

    var outerRadius = Math.min(canvas.width, canvas.height) / 2 - 3;

    var innerRadius = outerRadius * 0.7; // Adjust the inner radius as needed

    var startAngle = -Math.PI / 2;

    var gaugeValue = selectedValue;

    // Draw the Gauge

    function drawGauge(mouseX, mouseY) {

        debugger

        context.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate the distance from the center of the canvas

        var dx = mouseX - centerX;

        var dy = mouseY - centerY;

        var distance = Math.sqrt(dx * dx + dy * dy);

        // Ensure the distance is a valid number

        if (!isFinite(distance) || distance <= 0) {

            return;

        }

        var gradientRadius = Math.min(distance, outerRadius);

        // Create the RadialGradient centered at the cursor position

        var gradient = context.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, gradientRadius);

        // Start color (lighter)

        gradient.addColorStop(0, startColor);

        // End color (darker)

        gradient.addColorStop(1, endColor);

        // Fill the area with the RadialGradient

        context.fillStyle = gradient;

        context.beginPath();

        context.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);

        context.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, true);

        context.closePath();

        context.fill();

        // Draw dynamic text

        var dynamicText = text

        context.fillStyle = '#000';

        context.font = 'bold 12px Arial';

        context.textAlign = 'center';

        context.textBaseline = 'middle';

        context.fillText(dynamicText, centerX, centerY); // Adjust position as needed

    }

    // Initial draw

    drawGauge(centerX, centerY); // Draw the gauge initially

    // Function to handle mouse and touch events

    function handleInput(event) {

        debugger

        event.preventDefault(); // Prevent default action (e.g., scrolling)

        var clientX, clientY;

        // Check if it's a touch event

        if (event.type.startsWith('touch')) {

            clientX = event.touches[0].clientX;

            clientY = event.touches[0].clientY;

        } else { // Otherwise, it's a mouse event

            clientX = event.clientX;

            clientY = event.clientY;

        }

        // Calculate the cursor position relative to the canvas

        var rect = canvas.getBoundingClientRect();

        var mouseX = clientX - rect.left;

        var mouseY = clientY - rect.top;

        // Redraw the gauge with the new cursor position

        drawGauge(mouseX, mouseY);

        // Update the gauge value

        updateGaugeValue(mouseX, mouseY);

    }

    // Add mouse event listeners

    canvas.addEventListener("mousedown", handleInput);

    canvas.addEventListener("mousemove", handleInput);

    canvas.addEventListener("mouseup", handleInput);

    // Add touch event listeners

    canvas.addEventListener("touchstart", handleInput);

    canvas.addEventListener("touchmove", handleInput);

    canvas.addEventListener("touchend", handleInput);

    // Update values on click dot icon

    function updateGaugeValue(mouseX, mouseY) {

        // Calculate the angle between the cursor and the center of the canvas

        var dx = mouseX - centerX;

        var dy = mouseY - centerY;

        var angle = Math.atan2(dy, dx);

        // Calculate the gauge value based on the angle

        var angleMapped = (angle - startAngle + 2 * Math.PI) % (2 * Math.PI);

        var range = maxValue - minValue;

        var newGaugeValue = Math.round((angleMapped / (2 * Math.PI)) * range) + minValue;

        // Ensure the new gauge value is within the specified range

        if (newGaugeValue < minValue) {

            newGaugeValue = minValue;

        } else if (newGaugeValue > maxValue) {

            newGaugeValue = maxValue;

        }

        // Update gauge value

        gaugeValue = newGaugeValue;

        // Invoke DotNet method to notify about the gauge value change

        window.DotNetReference.invokeMethodAsync('OnGetGaugeValue', gaugeValue);

    }

    window.DotNetReference = null;

    // Set Dot net Reference for function Invoke

    window.setDotnetReference = function (pDotNetReference) {

        window.DotNetReference = pDotNetReference;

    }

    // Get gauge Value

    window.getgaugeValue = function (val) {

        console.log(gaugeValue)

        return gaugeValue;

    };
};
