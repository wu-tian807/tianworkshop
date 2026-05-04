const fs = require('fs');

const htmlFile = 'idol_stage.html';
let content = fs.readFileSync(htmlFile, 'utf8');

if (!content.includes('waveGlowsticks')) {
    const glowstickCss = `
        <style>
            .glowstick-wave {
                position: absolute;
                bottom: -50px;
                width: 10px;
                height: 40px;
                border-radius: 5px;
                background-color: #39C5BB;
                box-shadow: 0 0 10px #39C5BB, 0 0 20px #39C5BB;
                animation: wave 2s ease-in-out forwards;
                opacity: 0.8;
                pointer-events: none;
                z-index: 100;
            }
            @keyframes wave {
                0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                20% { opacity: 0.8; }
                50% { transform: translateY(-150px) rotate(20deg); }
                80% { opacity: 0.8; }
                100% { transform: translateY(-50px) rotate(-20deg); opacity: 0; }
            }
        </style>
    `;
    
    const glowstickJs = `
        <script>
            function waveGlowsticks() {
                const stage = document.body;
                const colors = ['#39C5BB', '#ff3366', '#ffcc00', '#33ccff', '#ff99ff'];
                
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        const stick = document.createElement('div');
                        stick.className = 'glowstick-wave';
                        stick.style.left = Math.random() * 100 + 'vw';
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        stick.style.backgroundColor = color;
                        stick.style.boxShadow = '0 0 10px ' + color + ', 0 0 20px ' + color;
                        stick.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
                        
                        stage.appendChild(stick);
                        
                        setTimeout(() => {
                            stick.remove();
                        }, 3000);
                    }, Math.random() * 500);
                }
            }
            
            // Add cheer button
            window.addEventListener('load', () => {
                const cheerBtn = document.createElement('button');
                cheerBtn.innerText = '📣 CHEER!';
                cheerBtn.style.position = 'fixed';
                cheerBtn.style.bottom = '20px';
                cheerBtn.style.left = '20px';
                cheerBtn.style.padding = '10px 20px';
                cheerBtn.style.fontSize = '16px';
                cheerBtn.style.backgroundColor = '#39C5BB';
                cheerBtn.style.color = 'white';
                cheerBtn.style.border = 'none';
                cheerBtn.style.borderRadius = '50px';
                cheerBtn.style.cursor = 'pointer';
                cheerBtn.style.boxShadow = '0 0 10px #39C5BB';
                cheerBtn.style.zIndex = '1000';
                cheerBtn.onclick = waveGlowsticks;
                document.body.appendChild(cheerBtn);
            });
        </script>
    `;

    content = content.replace('</head>', `${glowstickCss}\n</head>`);
    content = content.replace('</body>', `${glowstickJs}\n</body>`);

    fs.writeFileSync(htmlFile, content);
    console.log("Injected Glowstick Wave feature into idol_stage.html");
} else {
    console.log("Glowstick Wave already present.");
}
