# html-canvas-rain-animation
<img width="467" alt="Screenshot (769)" src="https://github.com/a2rp/html-canvas-rain-animation/assets/5670738/c72ca2fc-96cd-47f0-877e-250f26e6076b">

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

## Links

- Portfolio: [https://www.ashishranjan.net](https://www.ashishranjan.net)
- GitHub: [https://github.com/a2rp](https://github.com/a2rp)
- CodePen: [https://codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [https://www.linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [https://www.facebook.com/theash.ashish/](https://www.facebook.com/theash.ashish/)
- YouTube: [https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- Support: [https://a2rp-donation-page.netlify.app/](https://a2rp-donation-page.netlify.app/)
- Buy Me A Coffee: [https://buymeacoffee.com/a2rp](https://buymeacoffee.com/a2rp)
- Patreon: [https://patreon.com/a2rp](https://patreon.com/a2rp)