let keyBlocked = null, keyBlocked2 = null
let image = {
    player: {
        one: new Image(),
        two: new Image()
    },
    ball: {
        blue: new Image(),
        orange: new Image(),
        red: new Image(),
        black: new Image()
    },
    harpoon: new Image(),
    level: {
        one: {
            cloud: {
                one: new Image(),
                two: new Image(),
                three: new Image()
            },
            layer: {
                one: new Image(),
                two: new Image(),
                three: new Image(),
                four: new Image(),
                five: new Image(),
                six: new Image()
            }
        },
        two: {
            cloud: {
                one: new Image(),
                two: new Image()
            },
            layer: {
                one: new Image(),
                two: new Image(),
                three: new Image(),
                four: new Image()
            }
        },
        three: {
            cloud: {
                one: new Image(),
                two: new Image(),
                three: new Image(),
                four: new Image()
            },
            layer: {
                one: new Image(),
                two: new Image(),
                three: new Image(),
                four: new Image()
            }
        }
    },
    life: new Image()
}
image.player.one.src = "img/players/one.png"
image.player.two.src = "img/players/two.png"

image.ball.blue.src = "img/balls/blue.png"
image.ball.orange.src = "img/balls/orange.png"
image.ball.red.src = "img/balls/red.png"
image.ball.black.src = "img/balls/black.png"

image.harpoon.src = "img/harpoon.png"

// level 1
image.level.one.cloud.one.src = "img/lvl/1/clouds_1.png"
image.level.one.cloud.two.src = "img/lvl/1/clouds_2.png"
image.level.one.cloud.three.src = "img/lvl/1/clouds_3.png"

image.level.one.layer.one.src = "img/lvl/1/sky.png"
image.level.one.layer.two.src = "img/lvl/1/rocks_3.png"
image.level.one.layer.three.src = "img/lvl/1/rocks_2.png"
image.level.one.layer.four.src = "img/lvl/1/rocks_1.png"
image.level.one.layer.five.src = "img/lvl/1/pines.png"
image.level.one.layer.six.src = "img/lvl/1/ground.png"

// level 2
image.level.two.cloud.one.src = "img/lvl/2/clouds_2.png"
image.level.two.cloud.two.src = "img/lvl/2/clouds_1.png"

image.level.two.layer.one.src = "img/lvl/2/sky.png"
image.level.two.layer.two.src = "img/lvl/2/rocks.png"
image.level.two.layer.three.src = "img/lvl/2/ground.png"
image.level.two.layer.four.src = "img/lvl/1/ground.png"

// level 3
image.level.three.cloud.one.src = "img/lvl/3/clouds_1.png"
image.level.three.cloud.two.src = "img/lvl/3/clouds_2.png"
image.level.three.cloud.three.src = "img/lvl/3/clouds_3.png"
image.level.three.cloud.four.src = "img/lvl/3/clouds_4.png"

image.level.three.layer.one.src = "img/lvl/3/sky.png"
image.level.three.layer.two.src = "img/lvl/3/rocks_1.png"
image.level.three.layer.three.src = "img/lvl/3/rocks_2.png"
image.level.three.layer.four.src = "img/lvl/1/ground.png"


image.life.src = "img/heart.png"

class Player {
    constructor(x, y, number) {
        this.x = x
        this.y = y
        this.spriteSheet = {
            img: number === "one" ? image.player.one : image.player.two,
            frameSize: {
                x: 400,
                y: 400
            },
            frameAmount: 5
        }
        this.frameSize = {
            x: 200,
            y: 200
        }
        this.v0 = 10
        this.vx = 0
        this.frame = 0
        this.currAnimation = "idleRight"
        this.harpoonsFired = 0
        this.hurt = {
            state: false,
            frame: 0,
            gameFrame: 0
        }
        this.dead = false
        this.lives = 3
        this.limits = [
            {
                animation: ["idleRight", "walkRight"],
                shapes: [
                    { type: "arc", cx: 100, cy: 100, radius: 40 },
                    { type: "arc", cx: 155, cy: 60, radius: 8 },
                    { type: "rect", x: 100, y: 20, w: 8, h: 50 }
                ]
            },
            {
                animation: ["idleLeft", "walkLeft"],
                shapes: [
                    { type: "arc", cx: 100, cy: 100, radius: 40 },
                    { type: "arc", cx: 45, cy: 60, radius: 8 },
                    { type: "rect", x: 90, y: 15, w: 8, h: 50 }
                ]
            },
            {
                animation: ["castRight"],
                shapes: [
                    { type: "arc", cx: 100, cy: 100, radius: 40 },
                    { type: "rect", x: 100, y: 8, w: 8, h: 50 }
                ]
            },
            {
                animation: ["castLeft"],
                shapes: [
                    { type: "arc", cx: 100, cy: 100, radius: 40 },
                    { type: "rect", x: 90, y: 8, w: 8, h: 50 }
                ]
            }
        ]
    }

    drawLimits() {
        this.limits.forEach(limit => {
            if (limit.animation.some(animation => animation === this.currAnimation)) {
                limit.shapes.forEach(shape => {
                    if (shape.type === "arc") {
                        context.beginPath()
                        context.arc(this.x + shape.cx, this.y + shape.cy, shape.radius, 0, 2 * Math.PI)
                        context.fill()
                    }
                    if (shape.type === "rect") {
                        context.fillRect(this.x + shape.x, this.y + shape.y, shape.w, shape.h)
                    }
                })
            }
        })
    }

    draw() {
        // this.drawLimits()
        if (!this.dead) {
            if (!this.hurt.state) {
                switch (this.currAnimation) {
                    case "idleRight":
                        this.vx = 0
                        context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, 0, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                        break
                    case "idleLeft":
                        this.vx = 0
                        context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                        break
                    case "walkRight":
                        this.vx = this.v0
                        context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 2, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                        break
                    case "walkLeft":
                        this.vx = -this.v0
                        context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 3, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                        break
                    case "hurtRight":
                        context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 4, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                        break
                    case "castRight":
                        context.drawImage(this.spriteSheet.img, 2 * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 8, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y - 20, this.frameSize.x, this.frameSize.y)
                        break
                    case "castLeft":
                        context.drawImage(this.spriteSheet.img, 3 * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 8, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y - 20, this.frameSize.x, this.frameSize.y)
                        break
                }
            } else {
                context.save()
                context.globalAlpha = 0.5

                if (this.currAnimation === "idleRight" || this.currAnimation === "walkRight" || this.currAnimation === "castRight") {
                    context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 4, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                }
                if (this.currAnimation === "idleLeft" || this.currAnimation === "walkLeft" || this.currAnimation === "castLeft") {
                    context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 5, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                }
                context.restore()
                this.hurt.frame++
            }

            if (keyPressed.down) {
                if (!harpoons[0]) {
                    harpoons[0] = new Harpoon(players[0].x)
                }
            }

            if (keyPressed.s) {
                if (!harpoons[1]) {
                    harpoons[1] = new Harpoon(players[1].x)
                }
            }

            if (this.hurt.frame >= 5) {
                this.hurt.state = false
                this.hurt.frame = 0
                if (lifeFrameLoss === 0) {
                    lifeFrameLoss = frames
                }
            }
            if (frames % 3 === 0) {
                this.frame++
            }
            this.frame = this.frame % this.spriteSheet.frameAmount
        } else {
            if (this.currAnimation === "idleRight" ||
                this.currAnimation === "walkRight" ||
                this.currAnimation === "castRight"
            ) {
                context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 6, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
            } else {
                context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 7, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
            }
            if (frames % 5 === 0 && this.frame < this.spriteSheet.frameAmount - 1) {
                this.frame++
            }
        }


    }
    walk() {
        this.x += this.vx
    }
    collide() {
        this.limits.forEach(limit => {
            if (limit.animation.some(animation => animation === this.currAnimation)) {
                limit.shapes.forEach(shape => {
                    if (shape.type === "arc") {
                        // collide with left and right edges
                        if (this.x + shape.cx - shape.radius <= -10) {
                            this.x = -25
                            if (this.number === "one") {
                                keyBlocked = "left"
                            } else {
                                keyBlocked2 = "a"
                            }
                            this.currAnimation = "idleLeft"
                        }
                        if (this.x + shape.cx + shape.radius >= canvas.width) {
                            this.x = 1110
                            if (this.number === "one") {
                                keyBlocked = "right"
                            } else {
                                keyBlocked2 = "d"
                            }
                            this.currAnimation = "idleRight"
                        }

                        // collide with balls
                        balls.forEach(ball => {
                            if (getDistanceBetweenPoints(this.x + shape.cx, this.y + shape.cy, ball.x, ball.y) <= shape.radius + ball.radius) {
                                this.hurt.state = true
                            }
                        })
                    }
                    if (shape.type === "rect") {
                        // collide with wizard's hat
                        balls.forEach(ball => {
                            if (getDistanceBetweenPoints(this.x + shape.x, this.y + shape.y, ball.x, ball.y) <= ball.radius ||
                                getDistanceBetweenPoints(this.x + shape.w, this.y + shape.y, ball.x, ball.y) <= ball.radius
                            ) {
                                this.hurt.state = true
                            }
                        })
                    }
                })
            }
        })
    }
}

class Cloud {
    constructor(x, dx, image) {
        this.x = x
        this.dx = dx
        this.image = image
    }
    draw() {
        context.drawImage(this.image, this.x, 0, canvas.width, canvas.height)
    }
    move() {
        this.x += this.dx
    }
    isActive() {
        return !(this.x > canvas.width)
    }
}

class Harpoon {
    constructor(x, index) {
        this.x = x + 95
        this.index = index
        this.y = -80
        this.frame = 0
        this.currFrame = 0
        this.stage = 0
        this.active = true
        this.spriteSheet = {
            frameSize: {
                x: 17,
                y: 196
            },
            frameAmount: 23
        }
        this.frameSize = {
            x: 200,
            y: 200
        }
        this.size = {
            x: 30,
            y: 775
        }
        this.shape = {
            height: 55,
            width: 20
        }
    }
    draw() {
        if (this.frame <= 23 && this.spriteSheet.frameAmount === 23) {
            context.drawImage(image.harpoon, this.frame * this.spriteSheet.frameSize.x - 1, 0, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.size.x, this.size.y)
            if (this.frame >= 23) {
                this.stage++
                this.spriteSheet.frameAmount = 24
                this.frame = 0
            }
        } else {
            context.drawImage(image.harpoon, this.frame * this.spriteSheet.frameSize.x - 1, this.spriteSheet.frameSize.y * this.stage, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.size.x, this.size.y)
            if (this.frame === 24 && this.stage !== 2) {
                this.frame = 0
                this.stage++
            } else if (this.frame === 24) {
                this.active = false
            }
        }
        this.frame++
        switch (this.stage) {
            case 0: this.shape.height += 83 / 34 + 10; break
            case 1: this.shape.height += 137 / 86 + 5; break
            case 2: this.shape.height += 189 / 140 + 8; break
        }
    }
    collideWithBalls() {
        /*
        context.save()
        context.rotate(Math.PI)
        switch (this.stage) {
            case 0:
                context.fillRect(-this.x - 20, -695, this.shape.width, this.shape.height)
                break
            case 1:
                context.fillRect(-this.x - 20, -695, this.shape.width, this.shape.height)
                break
            case 2:
                context.fillRect(-this.x - 20, -695, this.shape.width, this.shape.height)
                break
        }
        context.restore()
        */
        balls.forEach(ball => {
            let distanceTopLeftCornerAndBallCenter = getDistanceBetweenPoints(this.x, canvas.height - this.shape.height, ball.x, ball.y)
            let distanceTopRightCornerAndBallCenter = getDistanceBetweenPoints(this.x + this.shape.width, canvas.height - this.shape.height, ball.x, ball.y)
            if (distanceTopLeftCornerAndBallCenter <= ball.radius || // top left corner colliding with ball
                distanceTopRightCornerAndBallCenter <= ball.radius || // top right corner colliding with ball
                (
                    (ball.x + ball.radius >= this.x && ball.x - ball.radius <= this.x + this.shape.width) &&
                    ball.y + ball.radius >= canvas.height - this.shape.height
                )
            ) {
                ball.active = false
                this.active = false
                ball.color = "blue"
            } else {
                ball.color = "red"
            }
        })
    }
}

class Ball {
    constructor(x, y, radius, a, vx) {
        this.x = x
        this.y = y
        this.color = "red"
        this.radius = radius
        this.a = a
        this.v = {
            x: vx,
            y: -10
        }
        this.active = true
    }
    draw() {
        switch (this.radius) {
            case 160:
                context.drawImage(image.ball.blue, 0, 0, image.ball.blue.width, image.ball.blue.height, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
                break
            case 80:
                context.drawImage(image.ball.orange, 0, 0, image.ball.orange.width, image.ball.orange.height, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
                break
            case 40:
                context.drawImage(image.ball.red, 0, 0, image.ball.red.width, image.ball.red.height, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
                break
            case 20:
                context.drawImage(image.ball.black, 0, 0, image.ball.black.width, image.ball.black.height, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
                break
        }
    }
    move() {
        this.x += this.v.x
        this.y += this.v.y
    }
    collideWithEdges() {
        // left
        if (this.x - this.radius <= 0) {
            this.v.x = -this.v.x
            this.x = this.radius
        }
        // right
        if (this.x + this.radius >= canvas.width) {
            this.v.x = - this.v.x
            this.x = canvas.width - this.radius
        }
        // up
        if (this.y - this.radius <= 0) {
            this.v.y = -this.v.y
            this.y = this.radius
        }
        // down
        if (this.y + this.radius + 30 >= canvas.height) {
            this.v.y = -this.v.y
            this.y = canvas.height - this.radius - 30
        } else if (this.v.y < 20) {
            this.v.y += this.a
        }
    }
    collideWithPlayers() {
        players.forEach(player => {
            player.limits.forEach(limit => {
                if (limit.animation.some(animation => animation === player.currAnimation)) {
                    limit.shapes.forEach(shape => {
                        if (shape.type === "arc") {
                            if (getDistanceBetweenPoints(this.x, this.y, player.x + shape.cx, player.y + shape.cy) <= this.radius + shape.radius) {
                                this.v.x = -this.v.x
                                this.v.y = -this.v.y
                            }
                        }
                        /*
                        if (shape.type === "rect") {
                            context.fillRect(this.x + shape.x, this.y + shape.y, shape.w, shape.h)
                        }
                        */
                    })
                }
            })
        })

    }
}

class Life {
    constructor(number) {
        this.number = number
        this.x = canvas.width - number * 55 - 75
        this.y = 25
        this.animate = false
        this.hurt = false
        this.frames = 0
        this.frameSize = {
            height: 128,
            width: 128
        }
    }
    draw() {
        if (!this.hurt && !this.animate) {
            context.drawImage(image.life, 0, 0, this.frameSize.width, this.frameSize.height, this.x, this.y, 50, 50)
        } else if (this.hurt && this.animate) {
            context.drawImage(image.life, this.frameSize.width * this.frames, 0, 128, image.life.height, this.x, this.y, 50, 50)
            if (frames % 3 === 0) this.frames++
            if (this.frames === 10) this.animate = false
        } else {
            context.drawImage(image.life, this.frameSize.width * 8, 0, this.frameSize.width, this.frameSize.height, this.x, this.y, 50, 50)
        }
    }
}

let canvas, context, currentLvl = 1, frames = 0, harpoons = [], players = [],
    clouds = [], balls = [], startGame = false, start = false, lives = [],
    lifeFrameLoss = 0, lifeLoss = false, controlsView = false, gameOver = false

let mouse = {
    x: 0,
    y: 0
}

let keyPressed = {
    right: false,
    left: false,
    down: false,
    a: false,
    s: false,
    d: false
}

let buttonPressed = {
    singlePlayer: false,
    twoPlayers: false,
    controls: false
}

window.onload = () => {
    canvas = document.getElementById("myCanvas")
    context = canvas.getContext("2d")
    canvas.height = 720
    canvas.width = 1280

    for (let i = 0; i < 5; i++) {
        lives.push(new Life(i))
    }

    menuBalls()

    if (currentLvl === 1) {
        clouds.push(new Cloud(-canvas.width, 1.5, image.level.one.cloud.three))
        clouds.push(new Cloud(-canvas.width * 2, 1.5, image.level.one.cloud.three))
        clouds.push(new Cloud(0, 1.5, image.level.one.cloud.three))

        clouds.push(new Cloud(-canvas.width, 1, image.level.one.cloud.two))
        clouds.push(new Cloud(-canvas.width * 2, 1, image.level.one.cloud.two))
        clouds.push(new Cloud(0, 1, image.level.one.cloud.two))

        clouds.push(new Cloud(-canvas.width, 0.5, image.level.one.cloud.one))
        clouds.push(new Cloud(-canvas.width * 2, 0.5, image.level.one.cloud.one))
        clouds.push(new Cloud(0, 0.5, image.level.one.cloud.one))
    }

    window.addEventListener("keydown", keyDown)
    window.addEventListener("keyup", keyUp)
    canvas.addEventListener("mousemove", getMousePosition)
    canvas.addEventListener("click", buttonClicked)
    Animate()
}

function Animate() {
    if (!startGame) {
        context.fillStyle = "black"
        context.fillRect(0, 0, canvas.width, canvas.height)
        if (!controlsView) {
            balls.forEach(ball => {
                ball.draw()
                ball.move()
                ball.collideWithEdges()
            })

            context.font = "150px Comic Sans Ms"
            context.textAlign = "center"
            context.fillStyle = "red"
            context.fillText("PANG 0.5", canvas.width / 2, 250)
            context.font = "50px Comic Sans Ms"
            if (mouse.x >= 496 && mouse.x <= 802 && mouse.y >= 322 && mouse.y <= 384) {
                context.fillText("Single-player", canvas.width / 2, canvas.height / 2)
            } else {
                context.fillStyle = "white"
                context.fillText("Single-player", canvas.width / 2, canvas.height / 2)
            }

            if (mouse.x >= 514 && mouse.x <= 786 && mouse.y >= 396 && mouse.y <= 458) {
                context.fillStyle = "red"
                context.fillText("Two players", canvas.width / 2, canvas.height / 2 + 75)
            } else {
                context.fillStyle = "white"
                context.fillText("Two players", canvas.width / 2, canvas.height / 2 + 75)
            }

            if (mouse.x >= 551 && mouse.x <= 746 && mouse.y >= 476 && mouse.y <= 520) {
                context.fillStyle = "red"
                context.fillText("Controls", canvas.width / 2, canvas.height / 2 + 150)
            } else {
                context.fillStyle = "white"
                context.fillText("Controls", canvas.width / 2, canvas.height / 2 + 150)
            }
        } else {
            context.fillStyle = "red"
            context.fillText("Player 1:", canvas.width / 2, 100)
            context.fillStyle = "white"
            context.fillText("LEFT ARROW - walk left", canvas.width / 2, 170)
            context.fillText("RIGHT ARROW - walk right", canvas.width / 2, 240)
            context.fillText("DOWN ARROW - cast harpoon", canvas.width / 2, 310)

            context.fillStyle = "red"
            context.fillText("Player 2:", canvas.width / 2, 400)
            context.fillStyle = "white"
            context.fillText("A - walk left", canvas.width / 2, 470)
            context.fillText("D - walk right", canvas.width / 2, 540)
            context.fillText("S - cast harpoon", canvas.width / 2, 610)


            if (mouse.x >= 27 && mouse.x <= 135 && mouse.y >= 21 && mouse.y <= 61) {
                context.fillStyle = "red"
                context.fillText("Back", 70, 50)
            } else {
                context.fillStyle = "white"
                context.fillText("Back", 70, 50)
            }
        }

    } else {
        if (currentLvl === 1) {
            for (let i in image.level.one.layer) {
                context.drawImage(image.level.one.layer[i], 0, 0, canvas.width, canvas.height)
            }

            resolveClouds()

            // backwards so balls can be spliced without affecting others
            if (balls.length) {
                for (let i = balls.length - 1; i >= 0; i--) {
                    if (balls[i].active) {
                        balls[i].draw()
                        if (start) {
                            balls[i].move()
                            balls[i].collideWithEdges()
                        }
                    } else {
                        let radius = balls[i].radius / 2
                        if (radius >= 20) {
                            balls.push(new Ball(balls[i].x - radius, balls[i].y, radius, balls[i].a, -balls[i].v.x))
                            balls.push(new Ball(balls[i].x + radius, balls[i].y, radius, balls[i].a, balls[i].v.x))
                        }
                        balls.splice(i, 1)
                    }
                }
            } else {
                currentLvl = 2
                clouds = []

                clouds.push(new Cloud(-canvas.width, 1, image.level.two.cloud.one))
                clouds.push(new Cloud(-canvas.width * 2, 1, image.level.two.cloud.one))
                clouds.push(new Cloud(0, 1, image.level.two.cloud.one))

                clouds.push(new Cloud(-canvas.width, 0.5, image.level.two.cloud.two))
                clouds.push(new Cloud(-canvas.width * 2, 0.5, image.level.two.cloud.two))
                clouds.push(new Cloud(0, 0.5, image.level.two.cloud.two))

                start = false
                balls = []
                balls.push(new Ball(canvas.width / 2 - 160, canvas.height / 2 - 100, 160, 0.1, 1))
                balls.push(new Ball(canvas.width / 2 + 160, canvas.height / 2 - 100, 160, 0.1, 1))
            }

        }

        if (currentLvl === 2) {
            for (let i in image.level.two.layer) {
                context.drawImage(image.level.two.layer[i], 0, 0, canvas.width, canvas.height)
            }

            resolveClouds()

            if (balls.length) {
                for (let i = balls.length - 1; i >= 0; i--) {
                    if (balls[i].active) {
                        balls[i].draw()
                        if (start) {
                            balls[i].move()
                            balls[i].collideWithEdges()
                        }
                    } else {
                        let radius = balls[i].radius / 2
                        if (radius >= 20) {
                            balls.push(new Ball(balls[i].x - radius, balls[i].y, radius, balls[i].a, -balls[i].v.x))
                            balls.push(new Ball(balls[i].x + radius, balls[i].y, radius, balls[i].a, balls[i].v.x))
                        }
                        balls.splice(i, 1)
                    }
                }
            } else {
                currentLvl = 3
                clouds = []

                clouds.push(new Cloud(-canvas.width, 1.5, image.level.one.cloud.three))
                clouds.push(new Cloud(-canvas.width * 2, 1.5, image.level.one.cloud.three))
                clouds.push(new Cloud(0, 1.5, image.level.one.cloud.three))

                clouds.push(new Cloud(-canvas.width, 1, image.level.one.cloud.two))
                clouds.push(new Cloud(-canvas.width * 2, 1, image.level.one.cloud.two))
                clouds.push(new Cloud(0, 1, image.level.one.cloud.two))

                clouds.push(new Cloud(-canvas.width, 0.5, image.level.one.cloud.one))
                clouds.push(new Cloud(-canvas.width * 2, 0.5, image.level.one.cloud.one))
                clouds.push(new Cloud(0, 0.5, image.level.one.cloud.one))

                start = false
                balls = []
                balls.push(new Ball(canvas.width / 3 - 160, canvas.height / 2 - 100, 160, 0.05, 1))
                balls.push(new Ball(canvas.width / 3 * 2 - 160, canvas.height / 2 - 100, 160, 0.05, 1))
                balls.push(new Ball(canvas.width / 3 * 3 - 160, canvas.height / 2 - 100, 160, 0.05, 1))

            }
        }

        if (currentLvl === 3) {
            for (let i in image.level.three.layer) {
                context.drawImage(image.level.three.layer[i], 0, 0, canvas.width, canvas.height)
            }

            resolveClouds()

            if (balls.length) {
                for (let i = balls.length - 1; i >= 0; i--) {
                    if (balls[i].active) {
                        balls[i].draw()
                        if (start) {
                            balls[i].move()
                            balls[i].collideWithEdges()
                        }
                    } else {
                        let radius = balls[i].radius / 2
                        if (radius >= 20) {
                            balls.push(new Ball(balls[i].x - radius, balls[i].y, radius, balls[i].a, -balls[i].v.x))
                            balls.push(new Ball(balls[i].x + radius, balls[i].y, radius, balls[i].a, balls[i].v.x))
                        }
                        balls.splice(i, 1)
                    }
                }
            } else if(!lives.every(life => life.hurt)) {
                context.font = "150px Comic Sans Ms"
                context.fillStyle = "red"
                context.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2)
                context.fillStyle = "white"
                context.font = "50px Comic Sans Ms"
                context.fillText("Press ESC to play again", canvas.width / 2, canvas.height / 2 + 70)
                gameOver = true
                start = false
            }
        }

        harpoons.forEach((harpoon, index) => {
            if (harpoon !== null) {
                if (harpoon.active) {
                    harpoon.collideWithBalls()
                    harpoon.draw()
                } else {
                    harpoons[index] = null
                }
            }
        })


        players.forEach(player => {
            player.collide()
            player.draw()
            player.walk()
        })

        lives.forEach(life => {
            if (lifeFrameLoss !== 0 && !life.hurt && !lifeLoss) {
                life.hurt = true
                life.animate = true
                lifeLoss = true
            }
            life.draw()
        })

        if (frames - lifeFrameLoss >= 30 && lifeLoss) {
            lifeFrameLoss = 0
            lifeLoss = false
        }
        context.font = "50px Comic Sans Ms"
        context.fillText(`Level ${currentLvl}`, 100, 65)

        if (lives.every(life => life.hurt)) {
            balls = []
            players.forEach(player => {
                player.dead = true
                player.vx = 0
            })
            context.font = "150px Comic Sans Ms"
            context.fillStyle = "red"
            context.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2)
            context.fillStyle = "white"
            context.font = "50px Comic Sans Ms"
            context.fillText("Press ESC to play again", canvas.width / 2, canvas.height / 2 + 70)
            gameOver = true
            start = false
        }
    }

    frames++
    window.requestAnimationFrame(Animate)
}

function menuBalls() {
    balls = []
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 80, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 80, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 40, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 40, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 40, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 40, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 40, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 40, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 20, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 20, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 20, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 20, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 20, 0, randomBetweenInterval(-5, 5)))
    balls.push(new Ball(randomBetweenInterval(0, canvas.width), randomBetweenInterval(0, canvas.height), 20, 0, randomBetweenInterval(-5, 5)))
}

function keyDown(e) {
    switch (e.keyCode) {
        case 39:
            if (keyBlocked !== "right" && !players[0].dead) {
                keyPressed.right = true
                players[0].currAnimation = "walkRight"
                if (keyBlocked === "left") {
                    keyBlocked = null
                }
            }
            break
        case 37:
            if (keyBlocked !== "left" && !players[0].dead) {
                keyPressed.left = true
                players[0].currAnimation = "walkLeft"
                if (keyBlocked === "right") {
                    keyBlocked = null
                }
            }
            break
        case 40:
            if (!players[0].dead) {
                keyPressed.down = true
                start = true
                if (players[0].currAnimation === "idleRight") {
                    players[0].currAnimation = "castRight"
                }
                if (players[0].currAnimation === "idleLeft") {
                    players[0].currAnimation = "castLeft"
                }
            }
            break
        case 65:
            if (players[1]) {
                if (keyBlocked2 !== "a" && !players[1].dead) {
                    keyPressed.a = true
                    players[1].currAnimation = "walkLeft"
                    if (keyBlocked2 === "a") {
                        keyBlocked2 = null
                    }
                }
            }
            break
        case 68:
            if (players[1]) {
                if (keyBlocked2 !== "d" && !players[1].dead) {
                    keyPressed.d = true
                    players[1].currAnimation = "walkRight"
                    if (keyBlocked2 === "d") {
                        keyBlocked2 = null
                    }
                }
            }
            break
        case 83:
            if (players[1]) {
                if (!players[1].dead) {
                    keyPressed.s = true
                    start = true
                    if (players[1].currAnimation === "idleRight") {
                        players[1].currAnimation = "castRight"
                    }
                    if (players[1].currAnimation === "idleLeft") {
                        players[1].currAnimation = "castLeft"
                    }
                }
            }
            break
        case 27:
            if (gameOver) {
                startGame = false
                currentLvl = 1
                gameOver = false
                menuBalls()
                lives = []
                for (let i = 0; i < 5; i++) {
                    lives.push(new Life(i))
                }
            }
            break
    }
}

function keyUp(e) {
    switch (e.keyCode) {
        case 39:
            if (keyPressed.right) {
                keyPressed.right = false
                players[0].currAnimation = "idleRight"
            }
            break
        case 37:
            if (keyPressed.left) {
                keyPressed.left = false
                players[0].currAnimation = "idleLeft"
            }
            break
        case 40:
            keyPressed.down = false
            if (players[0].currAnimation === "castRight") {
                players[0].currAnimation = "idleRight"
            }
            if (players[0].currAnimation === "castLeft") {
                players[0].currAnimation = "idleLeft"
            }
            break
        case 65:
            if (players[1]) {
                if (keyPressed.a) {
                    keyPressed.a = false
                    players[1].currAnimation = "idleLeft"
                }
            }
            break
        case 68:
            if (players[1]) {
                if (keyPressed.d) {
                    keyPressed.d = false
                    players[1].currAnimation = "idleRight"
                }
            }
            break
        case 83:
            if (players[1]) {
                keyPressed.s = false
                if (players[1].currAnimation === "castRight") {
                    players[1].currAnimation = "idleRight"
                }
                if (players[1].currAnimation === "castLeft") {
                    players[1].currAnimation = "idleLeft"
                }
            }
            break
    }
}

function getDistanceBetweenPoints(x1, y1, x2, y2) {
    let xDistance = x2 - x1
    let yDistance = y2 - y1
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance)
}

function randomBetweenInterval(min, max) {
    return Math.random() * (max - min) + min
}

function getMousePosition(e) {
    mouse.x = e.pageX - canvas.offsetLeft
    mouse.y = e.pageY - canvas.offsetTop
}

function buttonClicked() {
    if (!startGame) {
        if (!controlsView) {
            if (mouse.x >= 496 && mouse.x <= 802) {
                if (mouse.y >= 322 && mouse.y <= 384) {
                    startGame = true
                    balls = []
                    balls.push(new Ball(canvas.width / 2, canvas.height / 2 - 100, 160, 0.01, 1))
                    players = []
                    players[0] = new Player(1280 / 2 - 100, 720 - 180, "one")
                }

                if (mouse.y >= 396 && mouse.y <= 458) {
                    startGame = true
                    balls = []
                    balls.push(new Ball(canvas.width / 2, canvas.height / 2 - 100, 160, 0.05, 1))
                    players = []
                    players[0] = new Player(1280 / 2 + 120, 720 - 180, "one")
                    players[1] = new Player(1280 / 2 - 350, 720 - 180, "two")
                }
            }
            if (mouse.x >= 551 && mouse.x <= 746 && mouse.y >= 476 && mouse.y <= 520) {
                controlsView = true
            }
        } else {
            if (mouse.x >= 27 && mouse.x <= 135 && mouse.y >= 21 && mouse.y <= 61) {
                controlsView = false
            }
        }
    }
}

function resolveClouds() {
    // backwards so clouds can be spliced without affecting others
    for (let i = clouds.length - 1; i >= 0; i--) {
        if (clouds[i].isActive()) {
            clouds[i].draw()
            clouds[i].move()
        } else {
            clouds.push(new Cloud(-canvas.width, clouds[i].dx, clouds[i].image))
            clouds.splice(i, 1)
        }
    }
}