const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

//set value
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false; 


function loadParagraph(){
    const paragraph = [
        "The process of learning a new skill can be both daunting and exhilarating, requiring persistence, patience, and a willingness to embrace failure as a stepping stone to success.",
        "In the intricate dance of life, we often find ourselves balancing our personal aspirations with the demands of our responsibilities, striving to create a harmonious existence that fulfills both our dreams and our obligations.",
        "Technology continues to evolve at a breathtaking pace, transforming industries, revolutionizing communication, and shaping the future in ways we could scarcely have imagined just a few decades ago.",
        "As we navigate the complexities of modern society, it becomes increasingly important to cultivate empathy, understanding, and respect for diverse perspectives, recognizing that our differences can be a source of strength rather than division.",
        "The beauty of nature lies in its ability to inspire awe and wonder, reminding us of the interconnectedness of all living things and the delicate balance that sustains life on our planet.",
        "Effective communication is a cornerstone of successful relationships, whether personal or professional, and it requires not only the ability to articulate one's thoughts clearly but also the willingness to listen actively and empathetically.",
        "The pursuit of knowledge is a lifelong journey that enriches our minds, broadens our horizons, and empowers us to make informed decisions that can positively impact our lives and the world around us.",
        "In an increasingly digital world, maintaining a sense of privacy and security online has become a paramount concern, necessitating the implementation of robust measures to protect our personal information from cyber threats.",
        "Creativity is a powerful force that drives innovation, fuels artistic expression, and enables us to approach problems with fresh perspectives, ultimately leading to breakthroughs that can change the course of history.",
        "The resilience of the human spirit is exemplified in our ability to overcome adversity, adapt to changing circumstances, and emerge stronger from the challenges we face, continually striving towards a brighter future."
    ];
    // const paragraph = ["Balle Balle", "Harpal Singh"];

    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML = '';

    for(const char of paragraph[randomIndex]){
        typingText.innerHTML += `<span>${char}</span>`;
    }

    typingText.querySelectorAll('span')[0].classList.add('active');   
    document.addEventListener('keydown', ()=>input.focus());
    typingText.addEventListener('click', ()=>input.focus());
}

//Handle User Input
function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    
    if (charIndex < char.length && timeLeft > 0){
        if (!isTyping){
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }
        
        // Handling backspace
        if (input.value.length < charIndex) {
            charIndex--;
            if (char[charIndex].classList.contains('correct')) {
                char[charIndex].classList.remove('correct');
            } else {
                mistake--;
                char[charIndex].classList.remove('incorrect');
            }
            char[charIndex].classList.add('active');
            if (charIndex + 1 < char.length) {
                char[charIndex + 1].classList.remove('active');
            }
        } else {
            if(char[charIndex].innerText === typedChar){
                char[charIndex].classList.add('correct');
                console.log("correct");
            } else{
                mistake++;
                char[charIndex].classList.add('incorrect');
                console.log("incorrect");
            }
            char[charIndex].classList.remove('active');
            charIndex++;
            if (charIndex < char.length) {
                char[charIndex].classList.add('active');
            } else {
                clearInterval(timer);
                input.value = '';
                console.log("Typing complete");
            }
        }
        
        mistakes.innerText = mistake;
        let margin = Math.floor(Math.random() * 10) + 5;
        cpm.innerText = Math.round(charIndex / (maxTime - timeLeft) * 60) - margin;
    } else{
        clearInterval(timer);
        input.value = '';
    }
}

function initTime(){
    if(timeLeft > 0){
        timeLeft --;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5) /(maxTime-timeLeft)*60);
        wpm.innerText = wpmVal;
    }else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    
    timeLeft = maxTime;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    time.innerText = timeLeft;
    input.value = '';
}

input.addEventListener('input', initTyping);
btn.addEventListener('click', reset);
loadParagraph();