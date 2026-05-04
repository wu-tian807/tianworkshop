        <button onclick="fireConfetti()" style="position: absolute; bottom: 20px; right: 20px; padding: 10px 20px; background: linear-gradient(45deg, #ff007f, #7f00ff); border: none; border-radius: 20px; color: white; cursor: pointer; font-weight: bold; box-shadow: 0 0 15px rgba(255, 0, 127, 0.6); z-index: 100;">FIRE CONFETTI! 🎉</button>
        <script>
            function fireConfetti() {
                const colors = ['#ff007f', '#00ffcc', '#ffff00', '#ff6600', '#cc00ff'];
                for (let i = 0; i < 100; i++) {
                    const confetti = document.createElement('div');
                    confetti.style.position = 'absolute';
                    confetti.style.width = '8px';
                    confetti.style.height = '15px';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.left = '50%';
                    confetti.style.top = '80%';
                    confetti.style.zIndex = '50';
                    
                    const angle = Math.random() * Math.PI * 2;
                    const velocity = 10 + Math.random() * 20;
                    const tx = Math.cos(angle) * velocity * 20;
                    const ty = Math.sin(angle) * velocity * 20 - 300;
                    const rot = Math.random() * 360;
                    
                    confetti.style.transition = 'all 1.5s cubic-bezier(0.1, 0.8, 0.3, 1)';
                    confetti.style.transform = 'translate(-50%, -50%) rotate(0deg)';
                    
                    document.body.appendChild(confetti);
                    
                    requestAnimationFrame(() => {
                        confetti.style.transform = \`translate(\${tx}px, \${ty}px) rotate(\${rot}deg)\`;
                        confetti.style.opacity = '0';
                    });
                    
                    setTimeout(() => confetti.remove(), 1500);
                }
            }
        </script>