// Function to generate tints and shades
function generateColors(hex, steps) {
  // Convert HEX to RGB
  const baseColor = {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };

  const colors = [];

  // Generate Tints
  for (let i = 1; i <= steps; i++) {
    const factor = i / (steps + 1); // Prevent reaching pure white
    colors.push({
      type: "Tint",
      color: adjustTint(baseColor, factor),
    });
  }

  // Generate Shades
  for (let i = 1; i <= steps; i++) {
    const factor = i / (steps + 1); // Prevent reaching pure black
    colors.push({
      type: "Shade",
      color: adjustShade(baseColor, factor),
    });
  }

  return colors;
}

// Adjust color for tints
function adjustTint({ r, g, b }, factor) {
  const newR = Math.round(r + (255 - r) * factor);
  const newG = Math.round(g + (255 - g) * factor);
  const newB = Math.round(b + (255 - b) * factor);
  return rgbToHex(newR, newG, newB);
}

// Adjust color for shades
function adjustShade({ r, g, b }, factor) {
  const newR = Math.round(r * (1 - factor));
  const newG = Math.round(g * (1 - factor));
  const newB = Math.round(b * (1 - factor));
  return rgbToHex(newR, newG, newB);
}

// Convert RGB to HEX
function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
  );
}

// Event listener for generating colors
document.getElementById("generate").addEventListener("click", () => {
  const baseColorInput = document.getElementById("baseColor").value.trim();
  const steps = parseInt(document.getElementById("steps").value);
  const colorDisplay = document.getElementById("colorDisplay");

  // Validate base color
  if (!/^([0-9A-Fa-f]{6})$/.test(baseColorInput)) {
    alert("لطفاً یک کد رنگ معتبر (۶ رقمی) وارد کنید!");
    return;
  }

  // Clear previous colors
  colorDisplay.innerHTML = "";

  // Generate colors
  const colors = generateColors(baseColorInput, steps);

  // Display colors
  colors.forEach((item) => {
    const div = document.createElement("div");
    div.className = "color-box";
    div.style.backgroundColor = item.color;
    div.innerHTML = `<span>${item.type}: ${item.color}</span>`;
    colorDisplay.appendChild(div);
  });
});
