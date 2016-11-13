navigator.getUserMedia({audio:true},
function(stream) {
var audioCtx = new AudioContext();
var analyzer = audioCtx.createAnalyser();
analyzer.fftSize = 2048;
micNode = audioCtx.createMediaStreamSource(stream);

micNode.connect(analyzer)

var dataArr = new Uint8Array(2048);
var inter = setInterval(function() {
analyzer.getByteFrequencyData(dataArr);
var biggest = 0;
for(var i = 1; i < 2048; i++) {
if(dataArr[i] > dataArr[biggest]) biggest = i;
}
console.log(biggest);
}, 500);

},
function() {
console.error("blah");
})