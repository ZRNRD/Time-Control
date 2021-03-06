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

/* Изменение чисел в таймере */
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

/* Запуск, пауза и выключение таймера */
const timerStart = document.querySelector(".timer__start");
const timerCancel = document.querySelector(".timer__cancel");
const timerPause = document.querySelector(".timer__pause");
const timerAlarmStop = document.querySelector(".timer-alarm__stop");
const timerAlarmIcon = document.querySelector(".timer-alarm__icon")

timerStart.addEventListener("click", (e)=>{
    e.currentTarget.classList.add("hide")

    timerCancel.classList.remove("hide")
    timerPause.classList.remove("hide")

    blockButtons([".timer__cancel", ".timer__pause", ".timer-alarm__stop"])
    startTimer()

})

timerCancel.addEventListener("click", (e)=>{
    e.currentTarget.classList.add("hide")
    timerPause.classList.add("hide")

    timerStart.classList.remove("hide")
    cancelTimer()
    unblockButtons()

})

timerPause.addEventListener("click", (e)=>{
    

    if(e.currentTarget.value === "ПАУЗА"){
        pauseTimer()
        unblockButtons()
        e.currentTarget.value = "ДАЛЕЕ"
        
    }else if(e.currentTarget.value === "ДАЛЕЕ"){
        startTimer()
        blockButtons([".timer__cancel", ".timer__pause", ".timer-alarm__stop"])
        e.currentTarget.value = "ПАУЗА"
        
    }

    
})

timerAlarmStop.addEventListener("click", ()=>{
    cancelTimer();
    document.querySelector(".timer-alarm").classList.remove("timer-alarm_show")

})

/* Взаимодействие с секундомером */

const stopwatchStart = document.querySelector(".stopwatch-start");
const stopwatchCancel = document.querySelector(".stopwatch-cancel");
const stopwatchInterval = document.querySelector(".stopwatch-interval");

const stopwatchIntervalsList = document.querySelector(".stopwatch-intervals-list");
const stopwatchTime = document.querySelector(".stopwatch-time")

stopwatchStart.addEventListener("click", startStopwatch);

stopwatchCancel.addEventListener("click", cancelStopwatch)

stopwatchInterval.addEventListener("click", addStopwatchInterval)


/* Все функции */

/* Функции для таймера */
function getCorrectNum(num){
    return num < 10 ? "0" + num : num;
}

function blockButtons(exeptions){
    document.querySelectorAll('input[type=button]').forEach((btn)=>{
        btn.disabled = true;
    })

    exeptions.forEach((ex)=>{
        document.querySelector(ex).disabled = false
    })
}

function unblockButtons(){
    document.querySelectorAll('input[type=button]').forEach((btn)=>{
        btn.disabled = false;
    })
}

    
let interval = null;
let ringingBellInterval = null;

let bell = new Audio("./sound/bell.mp3");

function ringingBell(){
    bell.pause();
    bell.play();
    
    ringingBellInterval = setInterval(()=>{
        bell.pause();
        bell.play();
    }, 1000)
}

function stopRinging(){
    bell.pause();
    window.clearInterval(ringingBellInterval);
    ringingBellInterval = null;
}

function startTimer(){
    
    if(hours === 0 && minutes === 0 && seconds === 0){
        ringingBell();
        cancelTimer()
        return;
    }

    timerAlarmIcon.classList.add("ringing-bell")

    interval = setInterval(()=>{
        seconds--;
        if(seconds < 0){
            seconds = helper(seconds);
            minutes--;
        }
        if(minutes < 0){
            minutes = helper(minutes);
            hours--;
        }

        document.querySelector(".timer__hours").querySelector(".num").innerText = getCorrectNum(hours)
        document.querySelector(".timer__minutes").querySelector(".num").innerText = getCorrectNum(minutes)
        document.querySelector(".timer__seconds").querySelector(".num").innerText = getCorrectNum(seconds)

        if(hours === 0 && minutes === 0 && seconds === 0){
            ringingBell()
            timerAlarmIcon.classList.add("ringing-bell")
            document.querySelector(".timer-alarm").classList.add("timer-alarm_show")
        }
        
    },1000)
}

function helper(num){
    if(num < 0){
        return 59;
    }else if(num > 59){
        return 0
    }else{
        return num
    }
}

function cancelTimer(){
    pauseTimer()
    stopRinging()

    hours = 0;
    minutes = 0;
    seconds = 0;

    document.querySelector(".timer__hours").querySelector(".num").innerText = getCorrectNum(hours)
    document.querySelector(".timer__minutes").querySelector(".num").innerText = getCorrectNum(minutes)
    document.querySelector(".timer__seconds").querySelector(".num").innerText = getCorrectNum(seconds)

    timerStart.classList.remove("hide")
    timerCancel.classList.add("hide")
    timerPause.classList.add("hide")

    timerAlarmIcon.classList.remove("ringing-bell")

    
}

function pauseTimer(){
    window.clearInterval(interval);
    interval = null;
    timerPause.value = "ПАУЗА"
    unblockButtons()
}

/* Функции для секундомера */
let stopwatchMinutes = 0;
let stopwatchSeconds = 0;
let stopwatchTenMilliseconds = 0;

let stopwatchIntervalForTime = null;

function startStopwatch(){
    document.querySelector(".stopwatch-arrow").classList.add("spin-arrow");
    stopwatchIntervalsList.innerHTML = "";

    stopwatchStart.classList.add("hide");
    stopwatchCancel.classList.remove("hide");
    stopwatchInterval.classList.remove("hide");

    blockButtons([".stopwatch-cancel", ".stopwatch-interval"])

    stopwatchIntervalForTime = setInterval(()=>{
        stopwatchTenMilliseconds++;
        if(stopwatchTenMilliseconds > 99){
            stopwatchTenMilliseconds = 0;
            stopwatchSeconds++;
        }
        if(stopwatchSeconds > 59){
            stopwatchSeconds = 0;
            stopwatchMinutes++;
        }

        stopwatchTime.innerText = `${getCorrectNum(stopwatchMinutes)}:${getCorrectNum(stopwatchSeconds)}:${getCorrectNum(stopwatchTenMilliseconds)}`
        
    },10)
}

function cancelStopwatch(){
    document.querySelector(".stopwatch-arrow").classList.remove("spin-arrow");

    stopwatchStart.classList.remove("hide");
    stopwatchCancel.classList.add("hide");
    stopwatchInterval.classList.add("hide");

    unblockButtons()

    window.clearInterval(stopwatchIntervalForTime);
    stopwatchIntervalForTime = null;

    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchTenMilliseconds = 0;

    stopwatchTime.innerText = `${getCorrectNum(stopwatchMinutes)}:${getCorrectNum(stopwatchSeconds)}:${getCorrectNum(stopwatchTenMilliseconds)}` 
}

function addStopwatchInterval(){
    stopwatchIntervalsList.innerHTML =`<li> ${stopwatchTime.innerText} </li>` + stopwatchIntervalsList.innerHTML
}