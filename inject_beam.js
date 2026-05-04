        <button class="beam-btn" onclick="mikuBeam()" style="position: absolute; bottom: 20px; left: 20px; background: linear-gradient(45deg, #39c5bb, #ff6b6b); border: none; padding: 10px 20px; color: white; font-weight: bold; border-radius: 20px; cursor: pointer; box-shadow: 0 0 10px rgba(57,197,187,0.5);">MIKU BEAM! 💫</button>
        <script>
            function mikuBeam() {
                const beam = document.createElement("div");
                beam.style.position = "absolute";
                beam.style.top = "50%";
                beam.style.left = "-100%";
                beam.style.width = "200%";
                beam.style.height = "50px";
                beam.style.background = "linear-gradient(90deg, transparent, #39c5bb, #ff6b6b, #39c5bb, transparent)";
                beam.style.boxShadow = "0 0 30px #39c5bb, 0 0 60px #ff6b6b";
                beam.style.transform = "translateY(-50%) rotate(-10deg)";
                beam.style.transition = "left 0.5s cubic-bezier(0.1, 0.8, 0.3, 1)";
                beam.style.zIndex = "100";
                beam.style.pointerEvents = "none";
                document.body.appendChild(beam);
                
                setTimeout(() => {
                    beam.style.left = "100%";
                }, 50);
                
                setTimeout(() => {
                    beam.remove();
                }, 600);
            }
        </script>