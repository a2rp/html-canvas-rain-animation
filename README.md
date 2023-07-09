# html-canvas-rain-animation


<img width="467" alt="Screenshot (769)" src="https://github.com/a2rp/html-canvas-rain-animation/assets/5670738/953b05c1-29ce-4df1-b6bc-448b8abf5972">

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>a2rp: canvas rain</title>
        <style>
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            .container {
                /* border: 1px solid #f00; */
                overflow: hidden;
                height: 100vh;
            }

            .canvas {
                width: 100%;
                height: 100%;
                background-color: #fff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <canvas class="canvas">canvas not supported</canvas>
        </div>

        <script>
            const canvas = document.querySelector(".canvas");
            const context = canvas.getContext("2d");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            let particlesArray = [];
            const numberOfParticles = window.innerWidth * 2;

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = 0;
                    this.speed = 0;
                    this.velocity = Math.random() * 3;
                    this.size = Math.random() * 1.5 + 0.5;
                }
                update() {
                    this.y += this.velocity;
                    if (this.y >= canvas.height) {
                        this.y = 0;
                        this.x = Math.random() * canvas.width;
                    }
                }
                draw() {
                    context.beginPath();
                    context.fillStyle = "rgba(0,0,0,1)";
                    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    context.fill();
                }
            }
            function init() {
                for (let i = 0; i < numberOfParticles; ++i) {
                    particlesArray.push(new Particle());
                }
            }
            init();

            const animate = () => {
                context.globalAlpha = 0.05;
                context.fillStyle = "rgba(255,255,255,1)";
                context.fillRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < particlesArray.length; ++i) {
                    particlesArray[i].update();
                    particlesArray[i].draw();
                }
                requestAnimationFrame(animate);
            };
            animate();
        </script>
    </body>
</html>
