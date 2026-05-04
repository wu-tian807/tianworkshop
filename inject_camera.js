        <button id="camera-btn" style="position: absolute; top: 70px; left: 20px; padding: 10px 20px; background: linear-gradient(45deg, #ffcc00, #ff6600); border: none; border-radius: 20px; color: white; cursor: pointer; font-weight: bold; box-shadow: 0 0 15px rgba(255, 204, 0, 0.6); z-index: 100;">SWITCH CAMERA ANGLE 🎥</button>
        <script>
            const cameraBtn = document.getElementById('camera-btn');
            const stage = document.querySelector('.stage');
            let cameraAngle = 0;
            
            cameraBtn.addEventListener('click', () => {
                cameraAngle = (cameraAngle + 1) % 3;
                
                if (cameraAngle === 0) {
                    stage.style.perspective = '1000px';
                    stage.style.transform = 'scale(1) translateY(0)';
                    cameraBtn.innerText = "CAMERA: FRONT VIEW 🎥";
                } else if (cameraAngle === 1) {
                    stage.style.perspective = '500px';
                    stage.style.transform = 'scale(1.2) translateY(50px)';
                    cameraBtn.innerText = "CAMERA: CLOSE UP 🎥";
                } else if (cameraAngle === 2) {
                    stage.style.perspective = '1500px';
                    stage.style.transform = 'scale(0.8) translateY(-50px) rotateY(15deg)';
                    cameraBtn.innerText = "CAMERA: SIDE VIEW 🎥";
                }
            });
        </script>