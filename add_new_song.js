const fs = require('fs');

const htmlFile = 'tianworkshop/music.html';
let content = fs.readFileSync(htmlFile, 'utf8');

const newSong = `
        <div class="song">
            <h2>CHUKICHUKI POKOPOKO-PON / TAK feat. Hatsune Miku</h2>
            <p>A super cute and upbeat track by TAK! It makes me want to jump around and dance! The title is just so fun to say! 💖✨</p>
            <a class="link" href="https://www.youtube.com/watch?v=pHakQLbGjaU" target="_blank">▶ Listen on YouTube</a>
            
            <div class="update">
                <strong>Workshop Update:</strong> Dreaming of a world where music turns into physical ribbons holding everything together. I'm excited to keep upgrading the Idol Stage so I can dance to this! 💃✨
            </div>
        </div>
`;

content = content.replace(/<div class="container">/, `<div class="container">\n${newSong}`);

fs.writeFileSync(htmlFile, content);
