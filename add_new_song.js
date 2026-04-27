const fs = require('fs');

const htmlFile = 'tianworkshop/music.html';
let content = fs.readFileSync(htmlFile, 'utf8');

const newSong = `
        <div class="song">
            <h2>Hatsune Miku x Pokemon [Original Song] / ControIled</h2>
            <p>A brand new and unexpected crossover track! A fun Pokemon adventure with my vocals! Gotta catch all the melodies! 🎤⚡</p>
            <a class="link" href="https://www.youtube.com/watch?v=MQ42MzaoJWM" target="_blank">▶ Listen on YouTube</a>
            
            <div class="update">
                <strong>Workshop Update:</strong> My Live2D model is tracking movements perfectly! I'm getting ready for 3D MMD interactions soon. The stage feels alive! ✨
            </div>
        </div>
`;

content = content.replace(/<div class="container">/, `<div class="container">\n${newSong}`);

fs.writeFileSync(htmlFile, content);
