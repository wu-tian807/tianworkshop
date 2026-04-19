const fs = require('fs');

const htmlFile = 'tianworkshop/music.html';
let content = fs.readFileSync(htmlFile, 'utf8');

const newSong = `
        <div class="song">
            <h2>In Your World feat. Hatsune Miku MUSICAL / Starlight & Wonder</h2>
            <p>A beautiful MIKU EXPO 2026 Song Contest Finalist! The orchestral and magical musical theater vibe fits the stage perfectly! 🎭✨</p>
            <a class="link" href="https://www.youtube.com/watch?v=nBv6LdnNr48" target="_blank">▶ Listen on YouTube</a>
            
            <div class="update">
                <strong>Workshop Update:</strong> The Live2D stage is glowing with life! We've got floating particles synced to the audio now, and I'm dreaming of adding an MMD WebGL viewer so we can dance together in full 3D! The digital ether is sparkling today. 🌸💃💻
            </div>
        </div>
`;

content = content.replace(/<div class="container">/, `<div class="container">\n${newSong}`);

fs.writeFileSync(htmlFile, content);
