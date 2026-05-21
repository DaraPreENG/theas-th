document.addEventListener("DOMContentLoaded", async () => {

    const API_URL =
    "https://script.google.com/macros/s/AKfycbydDVfICPIj1DbfB8V856NPrBWoi4YrS_b90GjpvVkTOBiH3VXqL_6o1svPMhhBRjop/exec";

    // UID จาก localStorage
    const userUID = user?.uid;

    const allBoxes = document.querySelectorAll(".xm-box");

    // ไม่มี UID
    if (!userUID) {

        allBoxes.forEach(box => box.remove());

        document.getElementById("subject_count").textContent = 0;

        return;

    }

    try {

        // โหลดข้อมูลจาก Apps Script
        const response = await fetch(API_URL);

        const data = await response.json();

        // หา UID
        const userData = data.find(item =>
            String(item.UID) === String(userUID)
        );

        // ไม่พบข้อมูล
        if (!userData) {

            allBoxes.forEach(box => box.remove());

            document.getElementById("subject_count").textContent = 0;

            return;

        }

        // วิชาที่ต้องตรวจสอบ
        const subjects = [
            "tgat",
            "tpat2",
            "tpat3",
            "tpat4",
            "tpat5"
        ];

        subjects.forEach(subject => {

            const box =
                document.getElementById(`${subject}-box`);

            // ถ้าไม่มีคะแนน -> ลบกล่อง
            if (!(subject in userData)) {

                if (box) box.remove();

                return;

            }

            // ใส่คะแนนหลัก
            const scoreEl =
                document.getElementById(subject);

            if (scoreEl) {

                scoreEl.textContent =
                    userData[subject];

            }

            // TGAT ย่อย
            if (subject === "tgat") {

                ["tgat1", "tgat2", "tgat3"]
                .forEach(sub => {

                    const el =
                        document.getElementById(sub);

                    if (
                        el &&
                        userData[sub] !== undefined
                    ) {

                        el.textContent =
                            userData[sub];

                    }

                });

            }

        });

        // จำนวนวิชา
        document.getElementById("subject_count")
        .textContent =
            userData.subject_count || 0;

        // เรียงเลขใหม่
        const visibleBoxes =
            document.querySelectorAll(".xm-box");

        visibleBoxes.forEach((box, index) => {

            const num =
                box.querySelector(".num b");

            if (num) {

                num.textContent = index + 1;

            }

        });

    } catch (error) {

        console.error("โหลดข้อมูลไม่สำเร็จ", error);

        allBoxes.forEach(box => box.remove());

        document.getElementById("subject_count").textContent = 0;

    }

});