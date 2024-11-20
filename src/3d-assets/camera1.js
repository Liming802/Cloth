let bodySegmentation;
let video;
let segmentation;
let options = {
  maskType: "parts",
};

function preload() {
  bodySegmentation = ml5.bodySegmentation("BodyPix", options);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodySegmentation.detectStart(video, gotResults);
}

function draw() {
  background(255);
  image(video, 0, 0);
  
  if (segmentation) {
    image(segmentation.mask, 0, 0, width, height);
    // Get color from clothing segment
    let clothingColor = getClothingColor(segmentation);
    fill(0);
    textSize(16);
    text(`Clothing Color: ${clothingColor}`, 10, height - 10);
  }
}

// callback function for body segmentation
function gotResults(result) {
  segmentation = result;
}

// Function to get clothing color
function getClothingColor(segmentation) {
  const mask = segmentation.mask;
  const img = video.get(); // Get the current frame from video
  const clothingPixels = [];

  // Iterate over the segmentation mask
  for (let y = 0; y < mask.height; y++) {
    for (let x = 0; x < mask.width; x++) {
      // Check if the pixel is part of the clothing segment (usually defined by specific labels)
      if (mask.pixels[(x + y * mask.width) * 4 + 0] === 0) { // Change '0' to your specific body part index
        const idx = (x + y * img.width) * 4;
        clothingPixels.push([img.pixels[idx], img.pixels[idx + 1], img.pixels[idx + 2]]); // R, G, B
      }
    }
  }

  // Calculate average color
  if (clothingPixels.length === 0) return "No clothing detected";
  
  let r = 0, g = 0, b = 0;
  for (let i = 0; i < clothingPixels.length; i++) {
    r += clothingPixels[i][0];
    g += clothingPixels[i][1];
    b += clothingPixels[i][2];
  }
  r = Math.floor(r / clothingPixels.length);
  g = Math.floor(g / clothingPixels.length);
  b = Math.floor(b / clothingPixels.length);

  // Convert RGB to HEX for better readability
  return rgbToHex(r, g, b);
}

// Helper function to convert RGB to HEX
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
