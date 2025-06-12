let countdownInterval;
let isRunning = false;
let alarmAudio = document.getElementById("alarmSound");

function startCountdown() {
  if (isRunning) return;

  clearInterval(countdownInterval);
  stopAlarm();

  const input = document.getElementById("datetime").value;
  const countdownDate = new Date(input).getTime();
  const totalDuration = countdownDate - Date.now();

  if (!input || countdownDate <= Date.now()) {
    alert("Please enter a valid future date and time.");
    return;
  }

  isRunning = true;

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("timeUpMsg").innerHTML = "⏰ Time's up!";
      document.getElementById("progressBar").style.width = "100%";
      alarmAudio.play();
      document.getElementById("stopAlarmBtn").disabled = false;
      isRunning = false;
      return;
    }

    const progressPercent = 100 - Math.floor((distance / totalDuration) * 100);
    document.getElementById("progressBar").style.width = progressPercent + "%";

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = formatNum(days);
    document.getElementById("hours").textContent = formatNum(hours);
    document.getElementById("minutes").textContent = formatNum(minutes);
    document.getElementById("seconds").textContent = formatNum(seconds);
  }, 1000);
}

function formatNum(num) {
  return num < 10 ? "0" + num : num;
}

function stopAlarm() {
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
  document.getElementById("stopAlarmBtn").disabled = true;
}

document.getElementById("themeToggleBtn").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");
  document.getElementById("themeToggleBtn").textContent = isLight
    ? "Switch to Dark Theme"
    : "Switch to Light Theme";
});

function resetCountdown() {
  clearInterval(countdownInterval);
  stopAlarm();
  isRunning = false;

  document.getElementById("days").textContent = "00";
  document.getElementById("hours").textContent = "00";
  document.getElementById("minutes").textContent = "00";
  document.getElementById("seconds").textContent = "00";
  document.getElementById("progressBar").style.width = "0%";
  document.getElementById("timeUpMsg").innerHTML = "";
  document.getElementById("datetime").value = "";
  document.getElementById("stopAlarmBtn").disabled = true;
}
