function preload() {
    classifier=ml5.imageClassifier('DoodleNet');
}

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function clearCanvas() {
    background('white');
    document.getElementById("label").innerHTML="Label:";
    document.getElementById("confidence").innerHTML="Confidence:";
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML="Label: " + results[0].label;
    document.getElementById("confidence").innerHTML="Confidence: " + Math.round(results[0].confidence * 100)+ "%";
    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}