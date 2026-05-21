// วันที่ปัจจุบัน
const now = new Date();

// ปี พ.ศ.
const buddhistYear = now.getFullYear() + 543;

// ปี 2 หลัก เช่น 2569 => 69
const year2Digits = buddhistYear.toString().slice(-2);

// ปี 4 หลัก เช่น 2569
const year4Digits = buddhistYear;

// เดือนปัจจุบัน + 1
let nextMonth = now.getMonth() + 2;
let nextYear2Digits = year2Digits;

// ถ้าเกินเดือน 12 → ขึ้นปีใหม่
if (nextMonth > 12) {
    nextMonth = 1;
    nextYear2Digits = (parseInt(year2Digits) + 1).toString();
}

// รูปแบบ 69.6
const year2DigitsPlus = `${nextYear2Digits} • ${nextMonth}`;

// ใส่ค่า
document.querySelectorAll("#year-2-digits").forEach(el => {
    el.textContent = year2Digits;
});

document.querySelectorAll("#year-4-digits").forEach(el => {
    el.textContent = year4Digits;
});

document.querySelectorAll("#year-2-digits_plus").forEach(el => {
    el.textContent = year2DigitsPlus;
});