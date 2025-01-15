function generatePyramid() {
    const levels = document.getElementById('levels').value;
    const pyramidContainer = document.getElementById('pyramid');

    if (!levels || levels <= 0) {
        pyramidContainer.textContent = "Please enter a valid number of levels.";
        return;
    }

    let pyramid = '';
    for (let i = 1; i <= levels; i++) {
        const spaces = ' '.repeat(levels - i);
        const stars = '*'.repeat(2 * i - 1);
        pyramid += spaces + stars + '\n';
    }

    pyramidContainer.textContent = pyramid;
}