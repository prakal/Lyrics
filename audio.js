var FFT = require('fft');
// var wav = require('wav');

// var fs = require('fs');
// // var Speaker = require('speaker');
 
// var file = fs.createReadStream('piano2.wav');
// var reader = new wav.Reader();
 
// // the "format" event gets emitted at the end of the WAVE header 
// reader.on('format', function (format) {
 
//   // the WAVE header is stripped from the output of the reader 
// });
 
// // pipe the WAVE file to the Reader instance 
// file.pipe(reader);
// console.log(file);
var fs = require('fs');
// fs.readFile('piano2.wav', function(err,data){
// 	console.log(data);
// });

var WavDecoder = require("wav-decoder");
// console.log('fft',fft.complex);
var buffer = fs.readFileSync("piano2.wav");
var output = [];
WavDecoder.decode(buffer).then(function(audioData) {
  console.log(audioData.numberOfChannels);
  console.log(audioData.length);
  var fft = new FFT.complex(audioData.sampleRate/10);
  console.log(audioData.sampleRate);
  // console.log(audioData.channelData[0]); // Float32Array
  // fft.process(output, audioData.channelData[0]);
  fft.simple(output, audioData.channelData[0])
  console.log('output',output);
  // console.log(audioData.channelData[1]); // Float32Array 
});