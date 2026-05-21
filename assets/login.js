const input = document.querySelector('input[type="text"]');
const loginBtn = document.querySelector('.btn-main');
const infoBox = document.querySelector('.ths-box');

// กล่องปกติ
const defaultBox = `
        <div class="ths-box -info -half">
            เข้าระบบลงทะเบียนด้วย 
            <b>เลขประจำตัวประชาชน (UID Discord) 17 - 20 หลัก</b>
            หากไม่มีกรุณาติดต่อ THEAO <b>ด่วน</b>
        </div>
    `;

// กล่อง error
const errorBox = `
        <div class="ths-box -error -half">
            <h2>ผิดพลาด</h2>
            รูปแบบเลขประจำตัวของท่านไม่ถูกต้อง 
            กรุณาตรวจสอบใหม่อีกครั้ง
        </div>
    `;

// เก็บ uid ที่ถูกต้อง
let validUIDs = [];



// โหลดข้อมูล UID
async function loadUIDs() {

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxCCQhnW_EofnLS5TBh6MQSS6mPJ_Qleph4epZMfGxwKxhHRSGIVTMG1oj76xOpDt18/exec"
        );

        const data = await response.json();

        validUIDs = data.map(item =>
            item["ID Discord (51-1)"]
        );

    } catch (error) {

        console.error("โหลด UID ไม่สำเร็จ", error);

    }

}

loadUIDs();



// input change
input.addEventListener("input", () => {

    // เก็บค่าก่อนหน้า
    const oldValue = input.dataset.oldValue || "";

    // เอาเฉพาะตัวเลข
    input.value = input.value.replace(/\D/g, "");

    const value = input.value;

    // toggle disabled
    if (value.length > 0) {
        loginBtn.classList.remove("disabled");
    } else {
        loginBtn.classList.add("disabled");
    }

    // ถ้ามีการลบตัวเลข
    if (value.length < oldValue.length) {

        document.querySelector(".ths-box").outerHTML = defaultBox;

    } else {

        // เช็คความถูกต้อง
        const validLength =
            value.length >= 17 &&
            value.length <= 20;

        const isCorrect =
            validLength &&
            validUIDs.includes(value);

        // ถ้ากรอกครบแล้วแต่ไม่ถูก
        if (value.length >= 17 && !isCorrect) {

            document.querySelector(".ths-box").outerHTML = errorBox;

        }

    }

    // เก็บค่าใหม่
    input.dataset.oldValue = value;

});



// กดเข้าสู่ระบบ
loginBtn.addEventListener("click", () => {

    const value = input.value;

    // กัน disabled
    if (loginBtn.classList.contains("disabled")) {
        return;
    }

    // เช็คอีกครั้ง
    const validLength =
            value.length >= 17 &&
            value.length <= 20;

        const isCorrect =
            validLength &&
            validUIDs.includes(value);

        if (isCorrect) {

            window.location.href =
                `form.html?value=${value}`;

        } else {

            document.querySelector(".ths-box").outerHTML = errorBox;

        }

    });