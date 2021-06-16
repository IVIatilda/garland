const garland = document.querySelector('#garland')
const colors = getColorsArray(5)
/*[
    ['#da5959', '#b30000'],
    ['#59da87', '#009c38'],
    ['#5861c3', '#000c9c'],
    ['#e0a96f', '#d46d00']
]*/

// Ширина гирлянды = ширине окна
garland.width = window.innerWidth;

// количество фонариков
const countLights = 15
let coordinatsGarland = generateLights(countLights)

if (garland.getContext) {
    let factor = 0
    drawGarland(coordinatsGarland, factor)
    setInterval(() => {
        factor = (factor === colors.length) ? 0 : ++factor
        drawGarland(coordinatsGarland, factor)
    }, 1000)
}

drawGarland(coordinatsGarland)

function generateLights(count) {
    const coord = []
    const interval = Math.trunc(garland.clientWidth / count)
    let left = Math.trunc(interval / 2)
    for (let i = 0; i < count; i++) {
        const top = getRandomNumber(20, garland.clientHeight - 20)
        coord.push([left, top])
        left = left + interval
    }
    return coord
}

function drawGarland(coordinats, f = 0) {
    const ctx = garland.getContext('2d');
    for (let i = 0; i < coordinats.length; i++) {
        // Create gradients
        var radgrad = ctx.createRadialGradient(
            coordinats[i][0]-5,
            coordinats[i][1]-5, 5,
            coordinats[i][0],
            coordinats[i][1], 15
        );
        radgrad.addColorStop(0, colors[(i + f) % colors.length][0])
        radgrad.addColorStop(0.9, colors[(i + f) % colors.length][1])
        radgrad.addColorStop(0.95, '#1c1c1c')
        radgrad.addColorStop(1, 'rgba(0,0,0,0)');

        // draw shapes
        ctx.fillStyle = radgrad;
        ctx.fillRect(0, 0, garland.clientWidth, garland.clientHeight);
    }
}

function getRandomNumber(min, max) {
    return Math.trunc(Math.random() * (max-min) + min)
}

function getColorsArray(count) {
    const colors = []
    for (let i = 0; i < count; i++) {
        const r = Math.floor(getRandomNumber(100, 255))
        const g = Math.floor(getRandomNumber(100, 255))
        const b = Math.floor(getRandomNumber(100, 255))
        colors.push([ `rgb(${r},${g},${b}`, `rgb(${r},${g - 70},${b - 50}` ])
    }
    return colors
}

function getRandomColor() {
    return colors[Math.trunc(Math.random() * colors.length)]
}