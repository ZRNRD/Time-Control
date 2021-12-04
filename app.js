/* Открыть-закрыть меню */
document.querySelector('.menu-show').addEventListener("click", ()=>{
    document.querySelector('.menu-items').classList.toggle("menu-items_show")
})

/* Переключение режимов */
document.querySelector('.menu-items').addEventListener("click",(e)=>{
    const timeControlHeader = document.querySelector(".time-control__header");
    const timer = document.querySelector(".timer");
    const stopwatch = document.querySelector(".stopwatch");

    if(e.target.value === "Таймер"){

        timeControlHeader.innerText = "Таймер"
        timer.classList.remove("hide")
        stopwatch.classList.add("hide")

        document.querySelectorAll('.menu-item').forEach((item)=>{
            if(item.value !== e.target.value){
                item.classList.remove("menu-item_active")
            }else{
                item.classList.add("menu-item_active")
            }
        })

    }else if(e.target.value === "Секундомер"){

        timeControlHeader.innerText = "Секундомер"
        stopwatch.classList.remove("hide")
        timer.classList.add("hide")

        document.querySelectorAll('.menu-item').forEach((item)=>{
            if(item.value !== e.target.value){
                item.classList.remove("menu-item_active")
            }else{
                item.classList.add("menu-item_active")
            }
        })
    }
})
/* Взаимодействие с таймером */

let hours = 0;
let minutes = 0;
let seconds = 0;

document.querySelector(".timer__nums").addEventListener("click", (e)=>{
    if(e.target.classList.contains("num__up") && e.target.parentNode.classList.contains("timer__hours")){
        hours--;
        (hours < 0) && (hours = 59)
        e.target.nextElementSibling.innerHTML = getCorrectNum(hours)
    }else if(e.target.classList.contains("num__down") && e.target.parentNode.classList.contains("timer__hours")){
        hours++;
        (hours > 59) && (hours = 00)
        e.target.previousElementSibling.innerHTML = getCorrectNum(hours)
    }else if(e.target.classList.contains("num__up") && e.target.parentNode.classList.contains("timer__minutes")){
        minutes--;
        (minutes < 0) && (minutes = 59)
        e.target.nextElementSibling.innerHTML = getCorrectNum(minutes)
    }else if(e.target.classList.contains("num__down") && e.target.parentNode.classList.contains("timer__minutes")){
        minutes++;
        (minutes > 59) && (minutes = 00)
        e.target.previousElementSibling.innerHTML = getCorrectNum(minutes)
    }else if(e.target.classList.contains("num__up") && e.target.parentNode.classList.contains("timer__seconds")){
        seconds--;
        (seconds < 0) && (seconds = 59)
        e.target.nextElementSibling.innerHTML = getCorrectNum(seconds)
    }else if(e.target.classList.contains("num__down") && e.target.parentNode.classList.contains("timer__seconds")){
        seconds++;
        (seconds > 59) && (seconds = 00)
        e.target.previousElementSibling.innerHTML = getCorrectNum(seconds)
    }
})

function getCorrectNum(num){
    return num < 10 ? "0" + num : num;
}
