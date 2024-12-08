// Function to lighten or darken a color
function adjustColor(hex, factor) {
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
  
    r = Math.min(255, Math.max(0, r + factor));
    g = Math.min(255, Math.max(0, g + factor));
    b = Math.min(255, Math.max(0, b + factor));
  
    return (
      "#" +
      [r, g, b]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()
    );
  }
  
  // Generate tints and shades
  function generateColors(baseColor, steps) {
    let colors = [];
    const factor = Math.floor(255 / steps);
  
    // Generate tints
    for (let i = 1; i <= steps; i++) {
      colors.push({ type: "Tint", color: adjustColor(baseColor, factor * i) });
    }
  
    // Generate shades
    for (let i = 1; i <= steps; i++) {
      colors.push({ type: "Shade", color: adjustColor(baseColor, -factor * i) });
    }
  
    return colors;
  }
  
  // Event listener for generating colors
  document.getElementById("generate").addEventListener("click", () => {
    const baseColorInput = document.getElementById("baseColor").value.trim();
    const steps = parseInt(document.getElementById("steps").value);
    const colorDisplay = document.getElementById("colorDisplay");
  
    // Validate base color
    if (!/^([0-9A-Fa-f]{6})$/.test(baseColorInput)) {
      alert("Please enter a valid HEX color code without #");
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
  