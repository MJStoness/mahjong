const volume = 0.1;
let btnSound = document.querySelectorAll('.btn-sound')

const clicks = [
    new Audio('audio/click1.mp3'),
    new Audio('audio/click2.mp3'),
    new Audio('audio/click3.mp3')
];

const slides = [
    new Audio('audio/slide1.mp3'),
    new Audio('audio/slide2.mp3')
];

const btnClick = new Audio('audio/btn1.mp3');
btnClick.volume = volume + 0.1;

function playClick() {
    let random = Math.floor(Math.random() * clicks.length);
    clicks[random].volume = volume;
    clicks[random].play();
}

function playSlide() {
    let random = Math.floor(Math.random() * slides.length);
    slides[random].volume = volume;
    slides[random].play();
}

function updateBtnSounds() {
    btnSound = document.querySelectorAll('.btn-sound')
    btnSound.forEach(btn => {
        btn.addEventListener('click', () => { btnClick.play() });
    });
}
updateBtnSounds();