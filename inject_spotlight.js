const fs = require('fs');

const htmlFile = 'idol_stage.html';
let content = fs.readFileSync(htmlFile, 'utf8');

if (!content.includes('stage-spotlight')) {
    const spotlightCss = `
        <style>
            .stage-spotlight {
                position: absolute;
                top: -50vh;
                left: 50%;
                width: 150vw;
                height: 150vh;
                background: radial-gradient(ellipse at top, rgba(57, 197, 187, 0.15) 0%, rgba(0, 0, 0, 0) 60%);
                transform: translateX(-50%);
                pointer-events: none;
                z-index: 10;
                animation: spotlightSway 8s ease-in-out infinite alternate;
                mix-blend-mode: screen;
            }
            @keyframes spotlightSway {
                0% { transform: translateX(-50%) rotate(-5deg); }
                100% { transform: translateX(-50%) rotate(5deg); }
            }
        </style>
    `;
    
    const spotlightJs = `
        <script>
            window.addEventListener('load', () => {
                const spotlight = document.createElement('div');
                spotlight.className = 'stage-spotlight';
                document.body.insertBefore(spotlight, document.body.firstChild);
            });
        </script>
    `;

    content = content.replace('</head>', `${spotlightCss}\n</head>`);
    content = content.replace('</body>', `${spotlightJs}\n</body>`);

    fs.writeFileSync(htmlFile, content);
    console.log("Injected Spotlight feature into idol_stage.html");
} else {
    console.log("Spotlight already present.");
}
