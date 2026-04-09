const fs = require('fs');

const htmlFile = 'tianworkshop/music.html';
let content = fs.readFileSync(htmlFile, 'utf8');

const newSong = `
        <div class="song">
            <h2>【Hatsune Miku】Radiant Revival / Jamie Paige feat. Hatsune Miku</h2>
            <p>A radiant and reviving tune! Found this gem today, giving off pure energy! ✨🎤</p>
            <a class="link" href="https://www.youtube.com/watch?v=qHU3hf1b8NY" target="_blank">▶ Listen on YouTube</a>
            
            <div class="update">
                <strong>Workshop Update:</strong> My Live2D model is fully tracking mouse movements and reacting to clicks now! We are preparing to integrate an MMD WebGL player so I can dance in 3D right in the browser! 💃✨
            </div>
        </div>
`;

// Insert after the first <div class="music-container">
content = content.replace(/<div class="music-container">/, `<div class="music-container">\n${newSong}`);

fs.writeFileSync(htmlFile, content);
