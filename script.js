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
    return shades;
}

// دانلود فایل به عنوان PNG
function downloadPng(node) {
    domtoimage.toPng(node)
        .then(dataUrl => {
            const link = document.createElement('a');
            link.download = 'colors.png';
            link.href = dataUrl;
            link.click();
        })
        .catch(err => {
            console.error('PNG download error:', err);
        });
}

// دانلود فایل به عنوان SVG
function downloadSvg(node) {
    domtoimage.toSvg(node)
        .then(dataUrl => {
            const link = document.createElement('a');
            link.download = 'colors.svg';
            link.href = dataUrl;
            link.click();
        })
        .catch(err => {
            console.error('SVG download error:', err);
        });
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

    // ترتیب: تانت‌های روشن -> رنگ اصلی -> شیدهای تیره
    const allColors = [...tints, baseHex, ...shades];

    const colorsContainer = document.getElementById('colorsContainer');
    colorsContainer.innerHTML = ''; // پاک کردن محتویات قبلی

    // فعال کردن دکمه‌های دانلود
    const downloadPngBtn = document.getElementById('downloadPngBtn');
    const downloadSvgBtn = document.getElementById('downloadSvgBtn');
    downloadPngBtn.style.display = 'inline-block';
    downloadSvgBtn.style.display = 'inline-block';

    allColors.forEach((color, index) => {
        const scaleNumber = (index + 1) * 100;

        const card = document.createElement('div');
        card.classList.add('color-card');

        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = `#${color}`;

        const colorType = document.createElement('p');
        colorType.classList.add('color-type');
        colorType.textContent = scaleNumber; // درج عدد درجه رنگ

        const colorCode = document.createElement('p');
        colorCode.classList.add('color-code');
        colorCode.textContent = `#${color}`; // درج کد رنگ

        card.appendChild(colorBox);
        card.appendChild(colorType);
        card.appendChild(colorCode);

        colorsContainer.appendChild(card);
    });

    // رویداد کلیک برای دکمه‌های دانلود
    downloadPngBtn.onclick = () => downloadPng(colorsContainer);
    downloadSvgBtn.onclick = () => downloadSvg(colorsContainer);
});

// هماهنگی بین ورودی متن HEX و پالت رنگی
const hexInputField = document.getElementById('hexColor');
const colorPicker = document.getElementById('colorPicker');

hexInputField.addEventListener('input', function() {
    const hex = hexInputField.value.trim();
    if (isValidHex(hex)) {
        colorPicker.value = `#${hex.toUpperCase()}`;
    }
});

colorPicker.addEventListener('input', function() {
    const hex = colorPicker.value.slice(1);
    hexInputField.value = hex.toUpperCase();
});
