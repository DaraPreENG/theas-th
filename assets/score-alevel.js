document.addEventListener("DOMContentLoaded", async () => {

    // โหลด user จาก localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // ถ้าไม่มี user
    if (!user || !user.uid) {

        document.querySelectorAll(".xm-box")
            .forEach(el => el.remove());

        document.getElementById("subjectCount")
            .textContent = 0;

        return;
    }

    try {

        // ดึงข้อมูลจาก Google Apps Script
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyuaNLG5V0wVdL8k8hvoQsnqbpdYxt74W0nzek44jd_GG3OIUyPiEaaCxnCIhkf98Vw/exec"
        );

        const data = await response.json();

        // หา UID ที่ตรงกับ localStorage
        const userData = data.find(item =>
            String(item.UID) === String(user.uid)
        );

        // ถ้าไม่มีข้อมูล UID
        if (!userData) {

            document.querySelectorAll(".xm-box")
                .forEach(el => el.remove());

            document.getElementById("subjectCount")
                .textContent = 0;

            return;
        }

        // จำนวนวิชา
        document.getElementById("subjectCount")
            .textContent = userData.subjectCount || 0;

        // รายชื่อวิชา
        const subjects = [
            "a61",
            "a62",
            "a63",
            "a64",
            "a65",
            "a66",
            "a70",
            "a81",
            "a82"
        ];

        let runningNumber = 1;

        subjects.forEach(subject => {

            const box = document.getElementById(`${subject}-box`);
            const scoreSpan = document.getElementById(subject);

            // ไม่มีคะแนน = ลบกล่อง
            if (!(subject in userData)) {

                if (box) {
                    box.remove();
                }

            } else {

                // ใส่คะแนน
                if (scoreSpan) {
                    scoreSpan.textContent = userData[subject];
                }

                // เปลี่ยนเลขลำดับใหม่
                const numElement = box.querySelector(".num b");

                if (numElement) {
                    numElement.textContent = runningNumber;
                }

                runningNumber++;
            }

        });

    } catch (error) {

        console.error("โหลดข้อมูลคะแนนไม่สำเร็จ:", error);

        document.querySelectorAll(".xm-box")
            .forEach(el => el.remove());

        document.getElementById("subjectCount")
            .textContent = 0;

    }

});