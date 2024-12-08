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

// تولید رنگ‌های روشن‌تر
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

// تولید رنگ‌های تیره‌تر
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

// دانلود به عنوان PNG
function downloadPng(node) {
    htmlToImage.toPng(node, {
        style: {
            transform: 'scale(1)', // اطمینان از عدم تغییر مقیاس
            'transform-origin': 'top left',
        },
        backgroundColor: '#fff', // تنظیم پس‌زمینه سفید برای PNG
    })
    .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'colors.png';
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        console.error('PNG download error:', error);
        alert('مشکلی در دانلود PNG پیش آمد. لطفاً دوباره تلاش کنید.');
    });
}

// دانلود به عنوان SVG
function downloadSvg(node) {
    htmlToImage.toSvg(node, {
        style: {
            transform: 'scale(1)',
            'transform-origin': 'top left',
        },
    })
    .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'colors.svg';
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        console.error('SVG download error:', error);
        alert('مشکلی در دانلود SVG پیش آمد. لطفاً دوباره تلاش کنید.');
    });
}

// رویداد ارسال فرم
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

    const allColors = [...tints, baseHex, ...shades];

    const colorsContainer = document.getElementById('colorsContainer');
    colorsContainer.innerHTML = '';

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
        colorType.textContent = scaleNumber;

        const colorCode = document.createElement('p');
        colorCode.classList.add('color-code');
        colorCode.textContent = `#${color}`;

        card.appendChild(colorBox);
        card.appendChild(colorType);
        card.appendChild(colorCode);

        colorsContainer.appendChild(card);
    });

    const colorPreview = document.getElementById('colorPreview');
    colorPreview.style.backgroundColor = `#${baseHex}`;
});

// هماهنگی بین ورودی متن HEX و پالت رنگی
const hexInputField = document.getElementById('hexColor');
const colorPicker = document.getElementById('colorPicker');
const colorPreview = document.getElementById('colorPreview');

hexInputField.addEventListener('input', function() {
    const hex = hexInputField.value.trim();
    if (isValidHex(hex)) {
        colorPicker.value = `#${hex.toUpperCase()}`;
        colorPreview.style.backgroundColor = `#${hex.toUpperCase()}`;
    }
});

colorPicker.addEventListener('input', function() {
    const hex = colorPicker.value.slice(1);
    hexInputField.value = hex.toUpperCase();
    colorPreview.style.backgroundColor = `#${hex.toUpperCase()}`;
});

// اتصال دوباره رویداد کلیک برای دکمه‌های دانلود
document.getElementById('downloadPngBtn').addEventListener('click', function() {
    const colorsContainer = document.getElementById('colorsContainer');
    downloadPng(colorsContainer);
});

document.getElementById('downloadSvgBtn').addEventListener('click', function() {
    const colorsContainer = document.getElementById('colorsContainer');
    downloadSvg(colorsContainer);
});
