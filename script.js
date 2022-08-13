const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 1024;
const canvasHeight = 576;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const collisionsMap = []
console.log(collisionsMap)
for (let i = 0; i < collisons.length; i += 70) {
    
    collisionsMap.push(collisons.slice(i, 70 + i))
}

const boundaries = []

const offset = {
    x: -494,
    y: -710
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 977)
        boundaries.push(new Boundary({
            position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
            }
        }))
    })
})

const image = new Image();
image.src = './images/pokemonStyleGameMap.png';

const playerImageDown = new Image();
playerImageDown.src = './images/playerDown.PNG';

const playerImageUp = new Image();
playerImageUp.src = './images/playerUp.PNG';

const playerImageLeft = new Image();
playerImageLeft.src = './images/playerLeft.PNG';

const playerImageRight = new Image();
playerImageRight.src = './images/playerRight.PNG';

// canvasWidth / 2 - (this.image.width / 4) / 2,
// canvasHeight / 2 - this.image.height / 2,

const player = new Sprite({
    position: {
        x: canvasWidth / 2 - 192 / 4 / 2,
        y: canvasHeight / 2 - 68 / 2,
    },
    image: playerImageDown,
    frames: {
        max: 4
    },
    sprites: {
        up: playerImageUp,
        down: playerImageDown,
        left: playerImageLeft,
        right: playerImageRight
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
});

const keys = {
    a: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    s: {
        pressed: false,
    }
}

const testBoundary = new Boundary ({
    position: {
        x: 400,
        y: 400,
    }
})
const movables = [background, ...boundaries]

function rectangularCollision({rect1, rect2}) {
    return (rect1.position.x + rect1.width >= rect2.position.x && rect1.position.x <= rect2.position.x + rect2.width && rect1.position.y + rect1.
        height >= rect2.position.y && rect1.position.y <= rect2.position.y + rect2.
        height) 
}

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'white';
    ctx.imageSmoothingEnabled = false;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

   background.draw();
   boundaries.forEach(boundary => {
       boundary.draw()
   })

    player.draw();

   let moving = true;

   player.moving = false

    if (keys.w.pressed && lastKey === 'w') {
        player.image = player.sprites.up
        player.moving = true
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            
            if (
                rectangularCollision({
                    rect1: player,
                    rect2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3,
                    }}
                })
            ) {
               console.log('hit') 
               moving = false;
               break;
           }
        }
        if (moving)
        movables.forEach(movable => {
            movable.position.y += 3;
        })
    } else if (keys.a.pressed && lastKey === 'a') {
        player.image = player.sprites.left
        player.moving = true
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rect1: player,
                    rect2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y,
                    }}
                })
            ) {
               console.log('hit') 
               moving = false;
               break;
           }
        }
        if (moving)
        movables.forEach(movable => {
            movable.position.x += 3;
        });
    } else if (keys.d.pressed && lastKey === 'd') {
        player.image = player.sprites.right
        player.moving = true
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rect1: player,
                    rect2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y ,
                    }}
                })
            ) {
               console.log('hit') 
               moving = false;
               break;
           }
        }
        if (moving)
        movables.forEach(movable => {
            movable.position.x -= 3;
        })
    } else if (keys.s.pressed && lastKey === 's') {
        player.image = player.sprites.down
        player.moving = true
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rect1: player,
                    rect2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3,
                    }}
                })
            ) {
               console.log('hit') 
               moving = false;
               break;
           }
        }
        if (moving)
        movables.forEach(movable => {
            movable.position.y -= 3;
        })
    }


    
   

}

animate();

let lastKey = '';
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;

        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;

        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;

        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
    }
})

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'a':
            keys.a.pressed = false;
            break;

        case 'w':
            keys.w.pressed = false;
            break;

        case 'd':
            keys.d.pressed = false;
            break;

        case 's':
            keys.s.pressed = false;
            break;
    }
})