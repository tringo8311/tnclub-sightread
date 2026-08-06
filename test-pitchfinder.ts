import { Macleod } from 'pitchfinder';
const macleod = Macleod({ sampleRate: 44100, bufferSize: 4096 });
const data = new Float32Array(4096); // silent
console.log('Macleod silent:', macleod(data));
