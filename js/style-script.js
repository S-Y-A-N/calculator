const bgButton = document.querySelector('.bg-button');
const body = document.querySelector('body')

const pinkBG = 'url(../media/purple-mountain-landscape.jpg)';
const purpleBG = 'url(../media/3d-mountain-landscape-with-purple-sunset-sky.jpg)';
const backgrounds = [pinkBG, purpleBG];
let index = 1;
bgButton.addEventListener('click', changeBackground)

function changeBackground() {
    body.style.backgroundImage = backgrounds[index];
    index = ++index % backgrounds.length;
}