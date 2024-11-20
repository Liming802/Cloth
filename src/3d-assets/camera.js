const subtitles = document.querySelectorAll('.subtitle');
let currentIndex = 0;
const duration = 15000; // 15 seconds


let counter = 110000;

function createNumber() {
  const number = document.createElement("div");
  number.classList.add("number");
  number.textContent = counter++;
  document.body.appendChild(number);

  // Remove the number after 5 seconds to clean up
  setTimeout(() => {
    number.remove();
  }, 5000);
}

// Generate a new number every 500ms
setInterval(createNumber, 500);

function showNextSubtitle() {
    // Hide current subtitle
    subtitles[currentIndex].classList.remove('active');
    
    // Move to the next subtitle
    currentIndex = (currentIndex + 1) % subtitles.length;
    
    // Show next subtitle
    subtitles[currentIndex].classList.add('active');
}

// Set interval to change subtitle every 15 seconds
setInterval(showNextSubtitle, duration);


function generateRandomDarkColor() {
    let h, s, l;

    // 控制颜色的亮度和饱和度以避免太鲜艳
    h = Math.floor(Math.random() * 360);    // Hue: 0 to 360
    s = Math.floor(Math.random() * 40) + 20; // Saturation: 20% to 60% (控制饱和度，避免太鲜艳)
    l = Math.floor(Math.random() * 30) + 20; // Lightness: 20% to 50% (增加亮度，避免过于黑暗)

    return `hsl(${h}, ${s}%, ${l}%)`;
}

// Function to convert HSL to RGB (optional if you need RGB values)
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;

    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return `rgb(${Math.round(255 * f(0))}, ${Math.round(255 * f(8))}, ${Math.round(255 * f(4))})`;
}

// Capture and return a random dark color
function captureAndIdentifyChestColor() {
    const darkColor = generateRandomDarkColor();
    console.log(`Random dark color: ${darkColor}`);
    return darkColor;
}

// Export functions for other files
export { captureAndIdentifyChestColor };
