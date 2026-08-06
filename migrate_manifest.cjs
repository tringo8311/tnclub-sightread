const fs = require('fs');
const manifestPath = './src/manifest.json';
const data = require(manifestPath);

data.forEach(song => {
  if (song.title.includes(' - ')) {
    const parts = song.title.split(' - ');
    song.title = parts[0].trim();
    song.author = parts[1].trim();
  } else {
    song.author = "Unknown";
  }
});

fs.writeFileSync(manifestPath, JSON.stringify(data, null, 2));
console.log('Migrated manifest.json successfully!');
