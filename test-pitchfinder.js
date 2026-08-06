const { Macleod, YIN } = require('pitchfinder');
const macleod = Macleod({ sampleRate: 44100, bufferSize: 4096 });
const yin = YIN({ sampleRate: 44100 });
const data = new Float32Array(4096);
for(let i=0; i<4096; i++) data[i] = Math.sin(i * 440 * 2 * Math.PI / 44100);
console.log('Macleod:', macleod(data));
console.log('YIN:', yin(data));
