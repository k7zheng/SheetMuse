function indexToHertz(x) {
 return x * 44100 / 2048;
}

function handleFreq(f) {
///deal with the frequency, get notes and stuff
freq = f
recognizeSequence(seqs[currPage]);
prevFreq = f;
}

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
if(dataArr[i] > dataArr[biggest]) { 
	var thisFreq = indexToHertz(i);
	if(thisFreq > 64.1018 && thisFreq < 712.4292) biggest = i;
}
}
var prominentFreq = indexToHertz(biggest);

handleFreq(prominentFreq);

}, 100);

},
function() {
console.error("blah");
});

var seqs = [["g3", "b3", "d4", "g4", "b4", "d4", "g4", "b4"], 
			"ab3, f3, b3, c4, d4, b3,c4,d4,ab3,f3,b3,c4,d4,b3,c4,d4,b3,c4,d4".split(","), 
			"g4, b4, d5, f5, d5, b4, d5, b4, d4, f4, e4, d4".split(",")];

var next_seq = seqs[0];
var placeInSequence = 0;
var freq;
var prevFreq;
currPage = 1
// var noteRanges = [[64.1018,66.7182,"c2"],
// 				  [71.9516,74.8884,"d2"],
// 				  [80.7618,84.0582,"e2"],
// 				  [85.5638,89.0562,"f2"],
// 				  [96.04,99,96,"g2"],
// 				  [107.8,112.2,"a2"],
// 				  [121.0006,125.9394,"b2"],
// 				  [128.1938,133.4262,"c3"],
// 				  [143.8934,149.7666,"d3"],
// 				  [161.5138,168.1062,"e3"],
// 				  [171.1178,178.1022,"f3"],
// 				  [192.08,199.92,"g3"],
// 				  [203.497,211.803,"ab3"],
// 				  [215.6,224.4,"a3"] ,
// 				  [242.0012,251.8788,"b3"] ,
// 				  [256.3973,266.8626,"c4"] ,
// 				  [287.7868,299.5332,"d4"] ,
// 				  [323.0374,336.2226,"e4"] ,
// 				  [342.2454,356.2146,"f4"] ,
// 				  [384.16,399.84,"g4"] ,
// 				  [431.2,448.8,"a4"] ,
// 				  [484.0024,503.7576,"b4"] ,
// 				  [512.785,533.715,"c5"] ,
// 				  [575.5834,599.0766,"d5"] ,
// 				  [646.065,672.435,"e5"] ,
// 				  [684.4908,712.4292,"f5"]];
var notes = [[65.41,"c2"],
				  [73.42,"d2"],
				  [82.41,"e2"],
				  [87.31,"f2"],
				  [98,"g2"],
				  [110,"a2"],
				  [123.47,"b2"],
				  [130.81,"c3"],
				  [146.83,"d3"],
				  [164.81,"e3"],
				  [174.61,"f3"],
				  [196,"g3"],
				  [207.65,"ab3"],
				  [220,"a3"] ,
				  [246.94,"b3"] ,
				  [261.63,"c4"] ,
				  [293.66,"d4"] ,
				  [329.63,"e4"] ,
				  [349.23,"f4"] ,
				  [392,"g4"] ,
				  [440,"a4"] ,
				  [493.88,"b4"] ,
				  [523.25,"c5"] ,
				  [587.33,"d5"] ,
				  [659.25,"e5"] ,
				  [698.46,"f5"]];
				  

function recognizeSequence(next_seq) {
var note = convertFreq(freq);
var prevNote = convertFreq(prevFreq);
console.log(note);
if(note == next_seq[placeInSequence].trim()) {
	placeInSequence ++;
	if(placeInSequence == next_seq.length) {
		turnToPage(++ currPage);
		next_seq = seqs[currPage];
	placeInSequence = 0;
	}
} else if(note == prevNote) {

} else {
	placeInSequence = 0;
}
}	

function convertFreq(freq) {
var error = 100;
var closestNote = null;
for(var i=0; i<notes.length; i++) {
	if(freq-notes[i][0]<error) {
		error = freq-notes[i][0];
		closetNote = notes[i][1];

	}
}
return closestNote;
	
}

// function convertFreq(freq) {
// for(var i=0; i<noteRanges.length; i++) {
// 	var upper = noteRanges[i][1]
// 	if(i < noteRanges.length - 1) upper =noteRanges[i+1][0];
// 	var lower = noteRanges[i][0];
// 	if(freq >= lower && freq <= upper) {
// 		return noteRanges[i][2];
// 	}
// // }
// console.log("unknown freq " + freq);
// return "X";
// }