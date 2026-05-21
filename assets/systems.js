async function loadExamData() {
    try {
        const res = await fetch("https://script.google.com/macros/s/AKfycby1Suv7uyRg7N4UitTKTnSrOUhm_dBiEX8asIdYITd9wdPpRN0Rj81vp99b-USnNA/exec");
        const json = await res.json();

        if (!json.status || !Array.isArray(json.data)) return;

        json.data.forEach(item => {
            const targetId = item.ID;
            const content = item["โค้ด หรือเงื่อนไข"] || "";
            const confirm = item["ยืนยันการประกาศผล"] || "";

            // หา element จาก ID
            const targetEl = document.getElementById(targetId);

            if (!targetEl) return;

            // ===== กรณีเป็นเงื่อนไข =====
            if (content.includes("ลบ .none ออกจาก class")) {
                if (confirm === "ยืนยัน") {
                    targetEl.classList.remove("none");
                }
            }

            // ===== กรณีเป็น HTML Code =====
            else {
                targetEl.innerHTML = content;
            }
        });

    } catch (err) {
        console.error("โหลดข้อมูลไม่สำเร็จ", err);
    }
}

loadExamData();