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

/* let hours = 0;
let minutes = 0;
let seconds = 0; */