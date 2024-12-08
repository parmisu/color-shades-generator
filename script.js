// تابعی برای اطمینان از معتبر بودن کد HEX
function isValidHex(hex) {
    return /^[0-9A-Fa-f]{6}$/.test(hex);
}

// تبدیل HEX به RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// تبدیل RGB به HEX
function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase();
}

// تولید تانت
function generateTints(rgb, count) {
    const tints = [];
    for (let i = 1; i <= count; i++) {
        const factor = i / (count + 1);
        const r = Math.round(rgb.r + (255 - rgb.r) * factor);
        const g = Math.round(rgb.g + (255 - rgb.g) * factor);
        const b = Math.round(rgb.b + (255 - rgb.b) * factor);
        tints.push(rgbToHex(r, g, b));
    }
    return tints;
}

// تولید شید
function generateShades(rgb, count) {
    const shades = [];
    for (let i = 1; i <= count; i++) {
        const factor = i / (count + 1);
        const r = Math.round(rgb.r * (1 - factor));
        const g = Math.round(rgb.g * (1 - factor));
        const b = Math.round(rgb.b * (1 - factor));
        shades.push(rgbToHex(r, g, b));
    }
    return shades;
}

document.getElementById('colorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const hexInput = document.getElementById('hexColor').value.trim();
    const tintsCount = parseInt(document.getElementById('tints').value);
    const shadesCount = parseInt(document.getElementById('shades').value);

    if (!isValidHex(hexInput)) {
        alert('لطفاً یک کد HEX معتبر وارد کنید (6 کاراکتر از 0-9 و A-F).');
        return;
    }

    const rgb = hexToRgb(hexInput);
    const baseHex = hexInput.toUpperCase();

    const tints = generateTints(rgb, tintsCount);
    const shades = generateShades(rgb, shadesCount);

    const colorsContainer = document.getElementById('colorsContainer');
    colorsContainer.innerHTML = ''; // پاک کردن محتویات قبلی

    // نمایش تانت‌ها
    tints.forEach(tint => {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color-item');
        colorDiv.style.backgroundColor = `#${tint}`;

        const codeSpan = document.createElement('span');
        codeSpan.classList.add('color-code');
        codeSpan.textContent = `#${tint}`;

        colorDiv.appendChild(codeSpan);
        colorsContainer.appendChild(colorDiv);
    });

    // نمایش رنگ اصلی
    const baseDiv = document.createElement('div');
    baseDiv.classList.add('color-item');
    baseDiv.style.backgroundColor = `#${baseHex}`;

    const baseSpan = document.createElement('span');
    baseSpan.classList.add('color-code');
    baseSpan.textContent = `#${baseHex}`;

    baseDiv.appendChild(baseSpan);
    colorsContainer.appendChild(baseDiv);

    // نمایش شید‌ها
    shades.forEach(shade => {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color-item');
        colorDiv.style.backgroundColor = `#${shade}`;

        const codeSpan = document.createElement('span');
        codeSpan.classList.add('color-code');
        codeSpan.textContent = `#${shade}`;

        colorDiv.appendChild(codeSpan);
        colorsContainer.appendChild(colorDiv);
    });
});
