var currentValue = null;
var preValue = null;
var result = null;
var valueLocked = false;
// var valueLocked2 = false;
var equalPressed = false;
var currentOperation = null;
var preOperation = null;
var inputStream = "";
//this helps "=" get ignored when pressed after an operator
var keepIgnore = true;
$(".numbers").click(function() {
    inputStream += $(this).val();
    keepIgnore = false;
    if (!currentValue || equalPressed) { //if it's empty or equal pressed
        currentValue = $(this).val();
        equalPressed = false; //need to reset to false after clearing out the space
    } else {
        if (!valueLocked) { //if no operation button is pressed
            currentValue += $(this).val(); //they are all strings
        } else {
            currentValue = $(this).val();
            valueLocked = false;
        }
    }
    $("input[name='display']").val(currentValue); //can't use .html here
})

$("#addButton").click(function() {
    inputStream += $(this).val();
    valueLocked = true;
    equalPressed = false;
    //
    preOperation = currentOperation;
    currentOperation = "+";
    var charBefore = inputStream.charAt(inputStream.length - 2);
    if (isNaN(charBefore) && charBefore !== "=") {

        return;
    }
    //when another operation is pressed again before pressing equal
    if (preOperation != "=" && preOperation !== null) {
        result = operator(preOperation);
        // result = Number(preValue) + Number(currentValue);
        $("input[name='display']").val(result);
        currentValue = result;
    }
    preValue = currentValue;
    keepIgnore = true;
})

$("#subtractButton").click(function() {
    inputStream += $(this).val();
    valueLocked = true;
    equalPressed = false;
    preOperation = currentOperation;
    currentOperation = "-";
    var charBefore = inputStream.charAt(inputStream.length - 2);
    if (isNaN(charBefore) && charBefore !== "=") {

        return;
    }
    if (preOperation != "=" && preOperation !== null) {
        result = operator(preOperation);
        $("input[name='display']").val(result);
        currentValue = result;
    }
    // operation = "-"
    preValue = currentValue;
    keepIgnore = true;
})

$("#multiplyButton").click(function() {
    inputStream += $(this).val();
    valueLocked = true;
    equalPressed = false;
    preOperation = currentOperation;
    currentOperation = "*";
    var charBefore = inputStream.charAt(inputStream.length - 2);
    if (isNaN(charBefore) && charBefore !== "=") {

        return;
    }
    if (preOperation != "=" && preOperation !== null) {
        result = operator(preOperation);
        $("input[name='display']").val(result);
        currentValue = result;
    }
    // operation = "*";
    preValue = currentValue;
    keepIgnore = true;
})

$("#divideButton").click(function() {
    inputStream += $(this).val();
    valueLocked = true;
    equalPressed = false;
    preOperation = currentOperation;
    currentOperation = "/";
    var charBefore = inputStream.charAt(inputStream.length - 2);
    if (isNaN(charBefore) && charBefore !== "=") {

        return;
    }
    if (preOperation != "=" && preOperation !== null) {
        result = operator(preOperation);
        $("input[name='display']").val(result);
        currentValue = result;
    }
    preValue = currentValue;
    keepIgnore = true;
})

$("#equalsButton").click(function() {
    inputStream += $(this).val();
    // valueLocked = false;
    //ignore "=" when it's pressed before any operation
    if (currentOperation === null) {
        return;
    }
    //if the previous input is not a number
    if (isNaN(inputStream.charAt(inputStream.length - 2))) {
        if (inputStream.charAt(inputStream.length - 2) === "=" && !keepIgnore) {
            //repeat the previous operation on the result
            var temp = null;
            temp = preValue;
            preValue = currentValue;
            currentValue = temp;
            result = operator(preOperation);
            //flip it back after calculating
            currentValue = result;
            preValue = temp;
            $("input[name='display']").val(result);
        }

        return;
    }
    preOperation = currentOperation;
    currentOperation = "=";
    result = operator(preOperation);
    $("input[name='display']").val(result);
    preValue = currentValue;
    currentValue = result;
    equalPressed = true;
})

$("#clearButton").click(function() {
    currentValue = null;
    preValue = null;
    result = null;
    valueLocked = false;
    equalPressed = false;
    currentOperation = null;
    preOperation = null;
    inputStream = "";
    $("input").val(null);
})

function operator(operation) {
    if (operation === "+") {
        return Number(preValue) + Number(currentValue);
    } else if (operation === "-") {
        return Number(preValue) - Number(currentValue);
    } else if (operation === "*") {
        return Number(preValue) * Number(currentValue);
    } else if (operation === "/") {
        return Number(preValue) * 1.0 / Number(currentValue); //float precision
    }
}

////debug
// $("button").click(function() {
//     $("#output").html("input is :" + inputStream);
//     $("#output").append("<br> currentValue: " + currentValue);
//     $("#output").append("<br> preValue: " + preValue);
//     $("#output").append("<br> currentOperation: " + currentOperation);
//     $("#output").append("<br> preOperation: " + preOperation);
//     $("#output").append("<br> valueLocked: " + valueLocked);
//
// })
