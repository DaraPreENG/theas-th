async function loadUniversities() {

    const ul = document.getElementById("universities");

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxDj5jD-Y1Kaml_0dug1UGH2vf441Uis7BeJbmYN5AVSCkXb2bx5wxQOggOxpVj7E-O/exec"
        );

        const data = await response.json();

        // ลบ loader
        ul.innerHTML = "";

        const usedUniversities = new Set();

        data.forEach(item => {

            const universityName = item["ชื่อสถาบัน"];

            // ถ้าซ้ำ
            if (usedUniversities.has(universityName)) {
                return;
            }

            usedUniversities.add(universityName);

            const logo =
                item["ตราสถาบัน"] ||
                "./assets/images/default-university.png";

            const li = document.createElement("li");

            li.innerHTML = `
                    <a href="#${item.ID_programs}">
                        <div class="brand">
                            <img 
                                src="${logo}" 
                                alt="${universityName}"
                                width="60"
                                loading="lazy"
                            >

                            <span>${universityName}</span>
                        </div>
                    </a>
                `;

            ul.appendChild(li);

        });

    } catch (error) {

        ul.innerHTML = `
                <p class="error">
                    ไม่สามารถโหลดข้อมูลได้
                </p>
            `;

        console.error(error);

    }

}

loadUniversities();