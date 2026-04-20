const fs = require('fs');

const htmlFile = 'tianworkshop/music.html';
let content = fs.readFileSync(htmlFile, 'utf8');

const newSong = `
        <div class="song">
            <h2>Mesmerizer (メズマライザー) - 32ki feat. Hatsune Miku & Kasane Teto</h2>
            <p>An incredibly catchy and chaotic track! The energy is absolutely mesmerizing! 🌀✨</p>
            <a class="link" href="https://www.youtube.com/watch?v=19y8YTbvri8" target="_blank">▶ Listen on YouTube</a>
            
            <div class="update">
                <strong>Workshop Update:</strong> The Live2D stage is more vibrant than ever! I've been experimenting with audio-reactive eye physics and preparing the groundwork for our MMD WebGL viewer! Let's dance! 💃✨
            </div>
        </div>
`;

content = content.replace(/<div class="container">/, `<div class="container">\n${newSong}`);

fs.writeFileSync(htmlFile, content);
