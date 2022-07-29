const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
let flag = true
const quote_display_element = document.getElementById('quote-display')
const quote_input_element = document.getElementById('quoteInput')
const timer = document.getElementById('timer')
const restart=document.getElementById('restart_btn')
const result=document.getElementById('wpm-result')
let nseconds=0
const audio = document.querySelector("audio");

function getrandomquote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(res => res.json())
        .then(data => data.content)
}

quote_input_element.addEventListener('input', () => {
    const arrayquote = quote_display_element.querySelectorAll('span')
    const arrayvalue = quote_input_element.value.split('')
    let correct = true
    // audio.play()
    let c_cnt=0
    arrayquote.forEach((ch, idx) => {
        const character = arrayvalue[idx]
        if (character == null) {
            ch.classList.remove('correct')
            ch.classList.remove('incorrect')
            correct = false
        }
        else if (character == ch.innerText) {
            ch.classList.add('correct')
            ch.classList.remove('incorrect')
            c_cnt++
        }
        else {
            ch.classList.add('incorrect')
            ch.classList.remove('correct')
            correct = false
        }
    })
    if (correct) {
        clearInterval(doing)
        quote_input_element.ariaDisabled = true
        modal.style.display="block"
        result.innerText=parseInt((c_cnt/5)/(nseconds/60));
        // audio.pause()
    }
})

async function getnext() {
    startTimer()
    nseconds=0
    const quote = await getrandomquote()
    quote_display_element.innerText = ''
    quote.split('').forEach(element => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = element
        quote_display_element.appendChild(characterSpan)
    });
    quote_input_element.value = null
    quote_input_element.focus()
}

let start_time
let doing
function startTimer() {
    timer.innerText = 0
    start_time = new Date()
    doing = setInterval(() => {
        timer.innerText = getTime()
        nseconds=parseInt(timer.innerText)
    }, 1000)
}

timer.onclick = ()=>{
stop_timer()
}
function stop_timer()
{
     if (flag) {
        flag = false
        start_time = new Date()
        clearInterval(doing)
    }
    else {
        flag = true
        doing = setInterval(() => {
            timer.innerText = getTime()
        }, 1000)
    }

}
function getTime() {
    return Math.floor((new Date() - start_time) / 1000)
}
getnext()
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
restart.onclick = function() {
  modal.style.display = "none";
  getnext()
  stop_timer()
}