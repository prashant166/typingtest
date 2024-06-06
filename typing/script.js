const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button');

//set value
let timer;
let maxTime= 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake =0;
let isTyping = false;


function loadParagraph(){
    const paragraph= [ " Avoid daydreaming about the years to come.You are the most important person in your whole life.","Always be true to who you are, and ignore what other people have to say about you.","Always be true to who you are, and ignore what other people have to say about you.Only demonstrate your strength when it’s really required.","The sun dipped below the horizon, casting a warm, golden glow over the serene landscape.","Birds chirped their evening songs as a gentle breeze rustled through the trees.","The scent of blooming flowers filled the air, mingling with the earthy aroma of the forest.","It was a perfect moment of tranquility and natural beauty.","As the morning sun rises above the horizon, it brings with it a sense of renewed energy and endless possibilities. The world awakens to the gentle chirping of birds and the fresh scent of dew-kissed grass.","Each ray of sunlight paints the landscape with vibrant hues, illuminating the beauty that surrounds us. With every breath, we are reminded of the boundless potential that lies within us, ready to seize the day and embrace all the wonders it holds.","Today is a gift, filled with opportunities to learn, grow, and spread positivity to those around us. Let us embark on this journey with open hearts and minds, embracing each moment with gratitude and enthusiasm. Together, we can make today extraordinary and create a brighter tomorrow for ourselves and others."

];

const randomIndex = Math.floor(Math.random()*paragraph.length);
typingText.innerHTML='';
for(const char of paragraph[randomIndex]){
console.log(char);
typingText.innerHTML+= `<span>${char}</span>`;
}
typingText.querySelectorAll('span')[0].classList.add('active');
document.addEventListener('keydown',()=>input.focus());
typingText.addEventListener("click",()=>{
    input.focus()})
}

//Handle user input
function initTyping(){
    const char= typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft >0){

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping=true;
        }

        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            console.log("correct");
        }
        else{
            mistake++ ;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');

        mistakes.innerText = mistake;
        cpm.innerText = charIndex- mistake;
    }
    else{
clearInterval(timer);
input.value='';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5) /(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText= timeLeft;
    input.value='';
    charIndex = 0;
    mistake =0;
    isTyping = false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}


input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();