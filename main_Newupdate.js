let isSpinning = false;
let spinInterval;
let wordsArray = [
    "ดาวเดือน", "สังคมผู้สูงอายุ", "วัฒนธรรมไทย", "จันทรเกษม",
    "ประตูจันทร5", "โซเชียลมีเดีย", "ความเชื่อ", "ความหลากหลายทางเพศ",
    "เสรีภาพ", "ทัศนคติ", "คณะวิทยาศาสตร์", "สติ",
    "ประเทศชาติ", "ชนบท", "ความเหลื่อมล้ำ", "จิตอาสา",
    "การบูลลี่", "ภาวะโลกร้อน", "เยาวชน", "การศึกษา"
];
let availableWords = [...wordsArray]; // ก๊อปปี้รายการทั้งหมดสำหรับการสุ่ม

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        event.preventDefault(); // ป้องกันการ scroll หน้าเว็บลงเมื่อกด space bar

        if (isSpinning) {
            stopSpinning();
        } else {
            startSpinning();
        }
        isSpinning = !isSpinning; // สลับสถานะหมุนหรือหยุดหมุน
    }
});

function populateWords() {
    const wordContainer = document.getElementById("wordContainer");
    wordContainer.innerHTML = "";
    availableWords.forEach(word => {
        const span = document.createElement("span");
        span.textContent = word;
        wordContainer.appendChild(span);
    });
}

function startSpinning() {
    const words = document.getElementById("wordContainer");
    const totalWords = words.children.length;
    const wordHeight = words.children[0].offsetHeight;
    const spinSpeed = 100; // ความเร็วในการหมุน (ms)
    let currentTranslateY = 0;

    words.style.transition = "";
    words.style.transform = `translateY(0px)`;

    setTimeout(() => {
        spinInterval = setInterval(() => {
            currentTranslateY -= wordHeight;

            if (Math.abs(currentTranslateY) >= totalWords * wordHeight) {
                currentTranslateY = 0; // รีเซ็ตตำแหน่งไปยังข้อความแรกเมื่อถึงข้อความสุดท้าย
            }

            words.style.transition = "transform 0.2s ease-out";
            words.style.transform = `translateY(${currentTranslateY}px)`;
        }, spinSpeed);
    }, 100);
}

function stopSpinning() {
    clearInterval(spinInterval);

    const words = document.getElementById("wordContainer");
    const wordHeight = words.children[0].offsetHeight;
    const totalWords = words.children.length;

    if (availableWords.length === 0) {
        availableWords = [...wordsArray]; // รีเซ็ตกลับไปที่ข้อความทั้งหมด
        populateWords();
    }

    const randomStopIndex = Math.floor(Math.random() * availableWords.length);
    const stopOffset = -randomStopIndex * wordHeight;

    words.style.transition = "transform 1s ease-out";
    words.style.transform = `translateY(${stopOffset}px)`;

    setTimeout(() => {
        words.style.transition = "";
        removeWord(randomStopIndex); // ลบข้อความออกจาก availableWords
    }, 1000);
}

function removeWord(index) {
    availableWords.splice(index, 1); // ลบข้อความออกจากรายการที่สุ่ม
    populateWords(); // อัพเดตรายการข้อความบนหน้าเว็บ
}

// เรียก populateWords เพื่อเริ่มต้นแสดงข้อความ
populateWords();