const fs = require('fs');

const htmlFile = 'idol_stage.html';
let content = fs.readFileSync(htmlFile, 'utf8');

if (!content.includes('floating-note')) {
    const noteCss = `
        <style>
            .floating-note {
                position: absolute;
                font-size: 24px;
                color: #39C5BB;
                user-select: none;
                pointer-events: none;
                animation: floatUp 4s linear infinite;
                opacity: 0;
                z-index: 50;
                text-shadow: 0 0 5px #39C5BB;
            }
            @keyframes floatUp {
                0% { transform: translateY(0) scale(0.5); opacity: 0; }
                20% { opacity: 0.8; transform: translateY(-20px) scale(1); }
                80% { opacity: 0.8; transform: translateY(-80px) scale(1); }
                100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
            }
        </style>
    `;
    
    const noteJs = `
        <script>
            function spawnNote() {
                const notes = ['♪', '♫', '♬', '♩'];
                const stage = document.body;
                
                const note = document.createElement('div');
                note.className = 'floating-note';
                note.innerText = notes[Math.floor(Math.random() * notes.length)];
                
                // Random position mostly in the lower half/center
                const left = 20 + Math.random() * 60;
                const bottom = 10 + Math.random() * 30;
                
                note.style.left = left + 'vw';
                note.style.bottom = bottom + 'vh';
                
                // Randomize colors slightly based on Miku palette
                const colors = ['#39C5BB', '#ff3366', '#ffffff'];
                note.style.color = colors[Math.floor(Math.random() * colors.length)];
                note.style.textShadow = '0 0 8px ' + note.style.color;
                
                // Random animation duration
                note.style.animationDuration = (3 + Math.random() * 3) + 's';
                
                stage.appendChild(note);
                
                setTimeout(() => {
                    note.remove();
                }, 6000);
            }
            
            // Spawn notes periodically
            window.addEventListener('load', () => {
                setInterval(spawnNote, 800);
            });
        </script>
    `;

    content = content.replace('</head>', `${noteCss}\n</head>`);
    content = content.replace('</body>', `${noteJs}\n</body>`);

    fs.writeFileSync(htmlFile, content);
    console.log("Injected Floating Notes feature into idol_stage.html");
} else {
    console.log("Floating Notes already present.");
}
