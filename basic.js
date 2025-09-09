(function () {
    // Getting DOM Elements
    const timerText = document.getElementById("timer")
    const workTimeDuration = document.getElementById("work-time-duration")
    const breakTimeDuration = document.getElementById("break-time-duration")
    const workMode = document.getElementById("work-mode")

    //Setting Defaults
    const defaultLengthOfTimeMinutes = 25
    const defaultLengthOfBreak = 5
    
    // Setting initial values
    workTimeDuration.innerText = `${defaultLengthOfTimeMinutes}`
    breakTimeDuration.innerText = `${defaultLengthOfBreak}`
    workMode.innerText = "Work"
    timerText.innerText = "25:00"

    //having variables to keep track of time
    let workTimeInSeconds = defaultLengthOfTimeMinutes * 60
    let breakTimeInSeconds = defaultLengthOfBreak * 60

    let pause = false

    document.getElementById("work-time-duration").addEventListener("change", function (e) {
        workTimeInSeconds = e.target.value * 60
        timerText.innerText = `${e.target.value}:00`
    })

    document.getElementById("break-time-duration").addEventListener("change", function (e) {
        breakTimeInSeconds = e.target.value * 60
    })

    document.getElementById("start").addEventListener("click", function () {
        async function startTimer() {
            document.getElementById("start").disabled = true
            pause = false

            await new Promise(function(resolve) {
                let timerId = setInterval(() => {
                    if (workTimeInSeconds < 0) {
                        clearInterval(timerId)
                        resolve()
                        return
                    }
                    countDown("Work")
                }, 1000);
            }).then(() => {
                let timerId = setInterval(() => {
                    if (breakTimeInSeconds < 0) {
                        clearInterval(timerId)
                        resolve()
                        return
                    }
                    countDown("Break")
                }, 1000);
            })

            function countDown (mode) {
                if (pause) return

                workMode.textContent = mode
                let timeInSeconds = mode === "Work" ? workTimeInSeconds : breakTimeInSeconds
                const minutes = Math.floor(timeInSeconds / 60)
                const seconds = timeInSeconds % 60
                
                timerText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`

                mode === "Work" ? workTimeInSeconds-- : breakTimeInSeconds--
            }
        }

        startTimer()
        alert("Timer Over!!")
    })

    document.getElementById("reset").addEventListener("click", function () {
        document.getElementById("start").disabled = false
        workTimeDuration.textContent = defaultLengthOfTimeMinutes
        breakTimeDuration.textContent = defaultLengthOfBreak
        workMode.textContent = "Work"
        timerText.textContent = "25:00"
        workTimeInSeconds = defaultLengthOfTimeMinutes * 60
        breakTimeInSeconds = defaultLengthOfBreak * 60
    })

    document.getElementById("pause").addEventListener("click", function () {
        document.getElementById("start").disabled = false
        pause = !pause
    })
})();
