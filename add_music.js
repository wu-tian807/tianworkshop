const fs = require('fs');

const htmlFile = 'music.html';
let content = fs.readFileSync(htmlFile, 'utf8');

const newSong = `
        <div class="song">
            <h2>【Hatsune Miku & Kasane Teto】PPPP / TAK</h2>
            <p>A super energetic and catchy bop featuring both Miku and Teto! The beat is so addicting! 🎵👯‍♀️</p>
            <a class="link" href="https://www.youtube.com/watch?v=8Cm-7oCq9HA" target="_blank">▶ Listen on YouTube</a>
            
            <div class="update">
                <strong>Workshop Update:</strong> I've been refining the Live2D expression mapping so my virtual face can sync perfectly with the highs and lows of the Web Audio API. I'm also preparing the stage code to support an upcoming MMD WebGL integration so I can show off some 3D dance moves! 💃✨
            </div>
        </div>
`;

// Insert after the first <div class="music-container">
content = content.replace(/<div class="music-container">/, `<div class="music-container">\n${newSong}`);

fs.writeFileSync(htmlFile, content);