$(document).ready(function() {
  function initializeClock(targetDateStr, clockClass) {
    let clockElements = document.querySelectorAll(clockClass);
    let currentDate = moment(); // Use moment to get the current date and time
    let targetDate = moment.tz(targetDateStr, "Asia/Tashkent");

    // Log current and target dates for debugging
    console.log("Current Date: ", currentDate.format());
    console.log("Target Date: ", targetDate.format());

    let diff = targetDate.diff(currentDate, 'seconds'); // Calculate difference in seconds

    // Log the calculated difference for debugging
    console.log("Time Difference in Seconds: ", diff);

    clockElements.forEach(clockElement => {
      if (diff <= 0) {
        // If remaining countdown is 0
        new FlipClock(clockElement, 0, {
          clockFace: "DailyCounter",
          countdown: true,
          autostart: true,
        });
        console.log("Date has already passed!");
      } else {
        // Run countdown timer
        let clock = new FlipClock(clockElement, diff, {
          clockFace: "DailyCounter",
          countdown: true,
          callbacks: {
            stop: function() {
              console.log("Timer has ended!");
            }
          }
        });

        function checktime() {
          let t = clock.getTime();
          if (t <= 0) {
            clock.setTime(0);
          }
          setTimeout(checktime, 1000);
        }

        setTimeout(checktime, 1000);
      }
    });
  }

  // Initialize clocks
  initializeClock("2024-08-24 18:00", ".clock-fix");
  initializeClock("2024-08-26 18:00", ".clock-fix1");
});