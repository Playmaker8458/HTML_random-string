let animationInterval;
let isAnimating = false;

// function startAnimation เป็นตัวเริ่มต้นในการ random หรือ ทำงานแบบสุ่ม
function startAnimation() {
    const words = document.getElementById("wordContainer");
    const wordSpans = words.querySelectorAll('span');
    let currentWordIndex = 0;

    animationInterval = setInterval(() => {
        wordSpans.forEach((span, index) => {
            if (index === currentWordIndex) {
                span.style.display = 'block';
            } else {
                span.style.display = 'none';
            }
        });
        currentWordIndex = (currentWordIndex + 1) % wordSpans.length;
    }, 40); // เปลี่ยนทุก 50ms หรือ ก็คือเป็นตัวที่ใช้ในการเร่งความเร็วในการ random ถ้าเพิ่มตัวเลขน้อยความเร็วยิ่งเพิ่มขึ้น
}

// function stopAnimation เป็นตัวที่ใช้ในการหยุดการ random
function stopAnimation() {
    clearInterval(animationInterval);
}

// ตรวจจับการกด space bar (keyCode 32)
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        event.preventDefault(); // ป้องกันการ scroll หน้าเว็บลงเมื่อกด space bar
        if (isAnimating) {
            stopAnimation();
        } else {
            startAnimation();
        }
        isAnimating = !isAnimating; // เปลี่ยนสถานะของการสุ่ม ในกรณีที่มีการกด space bar เข้ามาทำงาน
    }
});

