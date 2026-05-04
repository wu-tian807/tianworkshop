        <button id="start-audio-btn" style="position: absolute; top: 20px; left: 20px; padding: 10px 20px; background: linear-gradient(45deg, #00d2ff, #3a7bd5); border: none; border-radius: 20px; color: white; cursor: pointer; font-weight: bold; box-shadow: 0 0 15px rgba(0, 210, 255, 0.6); z-index: 100;">START AUDIO VISUALIZER 🎤</button>
        <script>
            const startAudioBtn = document.getElementById('start-audio-btn');
            startAudioBtn.addEventListener('click', () => {
                const visualizerCanvas = document.getElementById('audio_visualizer');
                const ctx = visualizerCanvas.getContext('2d');
                
                // We're just simulating audio data for now until we have a real source
                let isPlaying = true;
                
                function drawSimulatedVisualizer() {
                    if (!isPlaying) return;
                    
                    ctx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
                    
                    const barWidth = 10;
                    const numBars = visualizerCanvas.width / (barWidth + 2);
                    
                    for (let i = 0; i < numBars; i++) {
                        const barHeight = Math.random() * visualizerCanvas.height;
                        const x = i * (barWidth + 2);
                        const y = visualizerCanvas.height - barHeight;
                        
                        // Neon color gradient
                        const gradient = ctx.createLinearGradient(0, 0, 0, visualizerCanvas.height);
                        gradient.addColorStop(0, '#ff007f');
                        gradient.addColorStop(0.5, '#00ffcc');
                        gradient.addColorStop(1, '#00d2ff');
                        
                        ctx.fillStyle = gradient;
                        ctx.fillRect(x, y, barWidth, barHeight);
                        
                        // Add glow
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = '#00ffcc';
                    }
                    
                    requestAnimationFrame(drawSimulatedVisualizer);
                }
                
                drawSimulatedVisualizer();
                startAudioBtn.innerText = "AUDIO VISUALIZER ACTIVE 🎵";
                startAudioBtn.style.background = "linear-gradient(45deg, #00ffcc, #39c5bb)";
                
                // Add an easter egg where the stage pulses with the "beat"
                const platform = document.querySelector('.platform');
                setInterval(() => {
                    const scale = 1 + Math.random() * 0.05;
                    platform.style.transform = \`rotateX(70deg) scale(\${scale})\`;
                    
                    // Trigger Live2D mock expression if it exists
                    if (window.onBeat) window.onBeat();
                }, 400);
            });
        </script>