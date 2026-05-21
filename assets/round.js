    // โหลดข้อมูลวัน
    async function loadCalendar() {

        try {

            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbxMyii9k8-Q7_P_jioyPOHS4NHuDvlf-saVtzevv5cw9BOLgsLB8YPMZX6zmKPkf61Z4Q/exec"
            );

            const data = await response.json();

            data.forEach(item => {

                const el = document.getElementById(item.ID);

                if (el) {
                    el.textContent = item["วันที่ เดือน(ย่อ) ปี พ.ศ.(YY)"];
                }

            });

        } catch (error) {

            console.error("โหลดข้อมูลไม่สำเร็จ", error);

        }

    }

    loadCalendar();



    // active round
    const rounds = document.querySelectorAll(".round");

    rounds.forEach(round => {

        round.addEventListener("click", () => {

            // กดซ้ำ = ปิด
            if (round.classList.contains("active")) {

                round.classList.remove("active");
                return;

            }

            // ปิดตัวอื่น
            rounds.forEach(item => {
                item.classList.remove("active");
            });

            // เปิดตัวที่กด
            round.classList.add("active");

        });

    });