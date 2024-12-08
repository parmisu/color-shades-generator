// تابعی برای اعتبارسنجی کد HEX
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

// تولید تانت (روشن‌تر کردن رنگ)
function generateTints(rgb, count) {
    const tints = [];
    for (let i = 1; i <= count; i++) {
        const factor = i / (count + 1);
        const r = Math.round(rgb.r + (255 - rgb.r) * factor);
        const g = Math.round(rgb.g + (255 - rgb.g) * factor);
        const b = Math.round(rgb.b + (255 - rgb.b) * factor);
        tints.push(rgbToHex(r, g, b));
    }
    // تانت‌ها در حالت فعلی از کم‌روشن به پر‌روشن هستند (اولی نزدیک به رنگ اصلی، آخری نزدیک به سفید)
    // برای اینکه از روشن‌ترین شروع شود، آرایه را برعکس می‌کنیم.
    return tints.reverse();
}

// تولید شید (تیره‌تر کردن رنگ)
function generateShades(rgb, count) {
    const shades = [];
    for (let i = 1; i <= count; i++) {
        const factor = i / (count + 1);
        const r = Math.round(rgb.r * (1 - factor));
        const g = Math.round(rgb.g * (1 - factor));
        const b = Math.round(rgb.b * (1 - factor));
        shades.push(rgbToHex(r, g, b));
    }
    // شیدها از نزدیک به رنگ اصلی تا تیره‌تر می‌روند، پس ترتیب‌شان مناسب است.
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

    // حالا ترتیب رنگ‌ها به این صورت است:
    // تانت‌های روشن‌تر (از روشن به تیره‌تر)، سپس رنگ اصلی، سپس شید‌های تیره‌تر (از کم تیره به پر تیره)
    const allColors = [...tints, baseHex, ...shades];

    const colorsContainer = document.getElementById('colorsContainer');
    colorsContainer.innerHTML = ''; // پاک کردن محتویات قبلی

    allColors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color-item');
        colorDiv.style.backgroundColor = `#${color}`;

        const codeSpan = document.createElement('span');
        codeSpan.classList.add('color-code');
        codeSpan.textContent = `#${color}`;

        colorDiv.appendChild(codeSpan);
        colorsContainer.appendChild(colorDiv);
    });
});
