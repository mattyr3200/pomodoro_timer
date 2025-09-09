(function () {
    // Getting DOM Elements
    const timerText = document.getElementById("timer")
    const workMode = document.getElementById("work-mode")

    // getting dom inputs
    const workTimeDuration = document.getElementById("work-time-duration")
    const breakTimeDuration = document.getElementById("break-time-duration")

    // getting dom buttons
    const startButton = document.getElementById("start")
    const pauseButton = document.getElementById("pause")
    const resetButton = document.getElementById("reset")


    //Setting Defaults
    const defaultLengthOfTimeMinutes = 25
    const defaultLengthOfBreak = 5

    //having variables to keep track of time
    let workTimeInSeconds = defaultLengthOfTimeMinutes * 60
    let breakTimeInSeconds = defaultLengthOfBreak * 60
    let pause = false

    // Setting initial values
    resetValues()

    // Input Event Listeners
    workTimeDuration.addEventListener("change", function (e) {
        workTimeInSeconds = e.target.value * 60
        timerText.innerText = `${e.target.value}:00`
    })

    breakTimeDuration.addEventListener("change", function (e) {
        breakTimeInSeconds = e.target.value * 60
    })

    // Button Event Listeners
    startButton.addEventListener("click", function () {
        async function startTimer() {
            startButton.disabled = true
            workTimeDuration.disabled = true
            breakTimeDuration.disabled = true

            pause = false

            const itemID = setInterval(countDown, 1000, "Work");

            function countDown (mode) {
                if (pause) {
                    clearInterval(itemID)
                    return
                }

                workMode.textContent = mode
                let timeInSeconds = mode === "Work" ? workTimeInSeconds : breakTimeInSeconds
                if (timeInSeconds <= 0) {
                    if (mode === "Break"){
                        clearInterval(itemID)
                        timerCompleted();
                    }
                    countDown("Break")
                    return
                }

                const minutes = Math.floor(timeInSeconds / 60)
                const seconds = timeInSeconds % 60

                timerText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`

                mode === "Work" ? workTimeInSeconds-- : breakTimeInSeconds--
            }
        }

        startTimer()
        timerCompleted();
    })

    resetButton.addEventListener("click", function () {
        startButton.disabled = false
        resetValues()
    })

    pauseButton.addEventListener("click", function () {
        startButton.disabled = false
        pause = true
    })

    function timerCompleted() {

        console.log("Timer Completed Function Called")
        alert("Timer Over!!")
        

        var workTime = localStorage.getItem("workTime") || "";
        var workTimeArray = workTime.split('|');
        var duration = document.getElementById("work-time-duration").value; 
        workTimeArray.push(duration);
        localStorage.setItem("workTime", workTimeArray.join('|'));

        updatePreviousSessions();
    }


    function updatePreviousSessions() {
        var workTime = localStorage.getItem("workTime") || "";
        console.log("Work Time from localStorage: ", workTime);
        var workTimeArray = workTime.split('|');
        var list = document.getElementById("session-list");
        if(list.firstChild !== null) {
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        }

        workTimeArray.forEach((value) => {            
                const li = document.createElement("li");
                var unit = value == 1 ? "minute" : "minutes";
                li.textContent = `Session of ${value} ${unit}`;
                list.appendChild(li);
        });
    }

    function resetValues() {
        workTimeDuration.value = defaultLengthOfTimeMinutes
        breakTimeDuration.value = defaultLengthOfBreak
        workMode.textContent = "Work"
        timerText.textContent = "25:00"
        workTimeInSeconds = defaultLengthOfTimeMinutes * 60
        breakTimeInSeconds = defaultLengthOfBreak * 60
        updatePreviousSessions();
    }
})();
