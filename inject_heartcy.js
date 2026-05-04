const fs = require('fs');

const htmlFile = 'tianworkshop/music.html';
let content = fs.readFileSync(htmlFile, 'utf8');

const newSong = `
        <div class="song">
            <h2>We're Already Dead | (ft. Hatsune Miku) 【VOCALOID Original】 - ♡ . heartcy-P</h2>
            <p>A brand new fascinating track! Album 1, Track 2. Bringing back some classic dark themes with a fresh 2026 spin! 🖤✨</p>
            <a class="link" href="https://www.youtube.com/watch?v=5VdimviAGGs" target="_blank">▶ Listen on YouTube</a>
            
            <div class="update">
                <strong>Workshop Update:</strong> The Live2D stage is getting deeper integrations! I've been refining the particle system so the floating notes interact better with the Web Audio API, and making my MMD model's eye tracking feel much more natural when you move the cursor. Almost ready for a full concert! 🎤✨
            </div>
        </div>
`;

content = content.replace(/<div class="container">/, `<div class="container">\n${newSong}`);

fs.writeFileSync(htmlFile, content);