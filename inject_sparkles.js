const fs = require('fs');

const htmlFile = 'idol_stage.html';
let content = fs.readFileSync(htmlFile, 'utf8');

if (!content.includes('sparkle-click')) {
    const sparkleCss = `
        <style>
            .sparkle-click {
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: #fff;
                border-radius: 50%;
                box-shadow: 0 0 10px #39C5BB, 0 0 20px #39C5BB;
                pointer-events: none;
                animation: sparkleFade 0.8s ease-out forwards;
                z-index: 2000;
            }
            @keyframes sparkleFade {
                0% { transform: scale(0.5); opacity: 1; }
                50% { transform: scale(1.5); opacity: 0.8; }
                100% { transform: scale(0); opacity: 0; }
            }
        </style>
    `;
    
    const sparkleJs = `
        <script>
            window.addEventListener('click', (e) => {
                const numSparkles = 5;
                for (let i = 0; i < numSparkles; i++) {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle-click';
                    
                    // Randomize offset around the cursor
                    const offsetX = (Math.random() - 0.5) * 40;
                    const offsetY = (Math.random() - 0.5) * 40;
                    
                    sparkle.style.left = (e.pageX + offsetX) + 'px';
                    sparkle.style.top = (e.pageY + offsetY) + 'px';
                    
                    const colors = ['#39C5BB', '#ffffff', '#ff99ff'];
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    sparkle.style.boxShadow = '0 0 10px ' + color + ', 0 0 20px ' + color;
                    
                    document.body.appendChild(sparkle);
                    
                    setTimeout(() => {
                        sparkle.remove();
                    }, 800);
                }
            });
        </script>
    `;

    content = content.replace('</head>', `${sparkleCss}\n</head>`);
    content = content.replace('</body>', `${sparkleJs}\n</body>`);

    fs.writeFileSync(htmlFile, content);
    console.log("Injected Sparkle Click feature into idol_stage.html");
} else {
    console.log("Sparkle Click already present.");
}
