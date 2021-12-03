/* Открыть-закрыть меню */
document.querySelector('.menu-show').addEventListener("click", (e)=>{
    document.querySelector('.menu-items').classList.toggle("menu-items_show")
})

/* Переключение режимов */
document.querySelector('.menu-items').addEventListener("click",(e)=>{
    const timer = document.querySelector(".timer");
    const stopwatch = document.querySelector(".stopwatch");

    if(e.target.value === "Таймер"){
        timer.classList.remove("hide")
        stopwatch.classList.add("hide")
    }else if(e.target.value === "Секундомер"){
        stopwatch.classList.remove("hide")
        timer.classList.add("hide")
    }
})

/* let hours = 0;
let minutes = 0;
let seconds = 0; */