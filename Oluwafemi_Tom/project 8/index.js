
//Simple JS to call the backend API ###


function welcome()
        {
            var testInput = document.getElementById("name").value;
            
            if(testInput.length == 0)
            {
                // alert("Hey! you didn't type anything!");
                document.getElementById("response").innerHTML = "Hey! you didn't type anything!";
            }
            else
                document.getElementById("response").innerHTML = "Holla! " + testInput + ",<br>Howdy?!";
        }
        
const submitWithEnter = function (event) {
    var keyPressed = event.keyCode || event.which;
    if (keyPressed === 13) {
        welcome()
    }
}
