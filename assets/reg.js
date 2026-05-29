const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylSY56HP1d5Eafsn88u_-L25GGBTdxPngaVAXdyTaSEkKo91uFkrNYEVCchRzO0U2g/exec";

const uidInput = document.getElementById("uid");
const firstNameInput = document.getElementById("given-name");
const lastNameInput = document.getElementById("family-name");
const passwordInput = document.getElementById("password");

const statusBox = document.getElementById("statusBox");
const loginBtn = document.getElementById("loginBtn");

const params = new URLSearchParams(window.location.search);
const uid = params.get("value");

/* ปิดไว้ก่อน */
firstNameInput.disabled = true;
lastNameInput.disabled = true;
passwordInput.disabled = true;

if (uid) {

    fetch(`${SCRIPT_URL}?value=${uid}`)

        .then(res => res.json())

        .then(data => {

            if (data.status) {

                uidInput.value = data.uid;

                /* เปิดช่องรหัสผ่าน */
                passwordInput.disabled = false;

                /* ชื่อ */
                if (data.firstName) {

                    firstNameInput.value = data.firstName;

                    // มีข้อมูล -> ล็อก
                    firstNameInput.disabled = true;

                } else {

                    // ไม่มีข้อมูล -> ให้กรอก
                    firstNameInput.disabled = false;

                }

                /* นามสกุล */
                if (data.lastName) {

                    lastNameInput.value = data.lastName;

                    // มีข้อมูล -> ล็อก
                    lastNameInput.disabled = true;

                } else {

                    // ไม่มีข้อมูล -> ให้กรอก
                    lastNameInput.disabled = false;

                }

                statusBox.innerHTML = `
                    พบข้อมูลผู้ใช้แล้ว กรุณากรอกรหัสผ่าน
                `;

                statusBox.classList.remove("errorBox");

            } else {

                statusBox.innerHTML = `
                    ไม่พบข้อมูลผู้ใช้
                `;

                statusBox.classList.add("errorBox");

            }

        })

        .catch(err => {

            console.error(err);

            statusBox.innerHTML = `
                เกิดข้อผิดพลาดในการเชื่อมต่อ
            `;

            statusBox.classList.add("errorBox");

        });

}

loginBtn.addEventListener("click", () => {

    if (passwordInput.disabled) return;

    const password = passwordInput.value.trim();

    if (!password) {

        alert("กรุณากรอกรหัสผ่าน");
        return;

    }

    fetch(SCRIPT_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            uid: uidInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            password: password

        })

    })

    .then(res => res.json())

    .then(data => {

        if (data.status) {

            /* บันทึก localStorage */
            localStorage.setItem("user", JSON.stringify({

                uid: uidInput.value,
                firstName: firstNameInput.value,
                lastName: lastNameInput.value

            }));

            /* ไปหน้าโปรไฟล์ */
            window.location.href = "profile.html";

        } else {

            alert("เข้าสู่ระบบไม่สำเร็จ");

        }

    })

    .catch(err => {

        console.error(err);
        alert("เกิดข้อผิดพลาด");

    });

});
// const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylSY56HP1d5Eafsn88u_-L25GGBTdxPngaVAXdyTaSEkKo91uFkrNYEVCchRzO0U2g/exec";


// const uidInput = document.getElementById("uid");
// const firstNameInput = document.getElementById("given-name");
// const lastNameInput = document.getElementById("family-name");
// const passwordInput = document.getElementById("password");

// const statusBox = document.getElementById("statusBox");
// const loginBtn = document.getElementById("loginBtn");

// const params = new URLSearchParams(window.location.search);

// const uid = params.get("value");

// if (uid) {

//     fetch(`${SCRIPT_URL}?value=${uid}`)
//         .then(res => res.json())
//         .then(data => {

//             if (data.status) {

//                 uidInput.value = data.uid;
//                 firstNameInput.value = data.firstName;
//                 lastNameInput.value = data.lastName;

//                 passwordInput.disabled = false;

//                 statusBox.innerHTML = `
//                     พบข้อมูลผู้ใช้แล้ว กรุณากรอกรหัสผ่าน
//                 `;

//             } else {

//                 statusBox.innerHTML = `
//                     ไม่พบข้อมูลผู้ใช้
//                 `;

//                 statusBox.classList.add("errorBox");

//             }

//         });

// }

// loginBtn.addEventListener("click", () => {

//     if (passwordInput.disabled) return;

//     const password = passwordInput.value.trim();

//     if (!password) {

//         alert("กรุณากรอกรหัสผ่าน");
//         return;

//     }

//     fetch(SCRIPT_URL, {

//         method: "POST",

//         body: JSON.stringify({
//             uid: uidInput.value,
//             password: password
//         })

//     })

//     .then(res => res.json())
//     .then(data => {

//         if (data.status) {

//             // บันทึกข้อมูลลง localStorage
//             localStorage.setItem("user", JSON.stringify({

//                 uid: uidInput.value,
//                 firstName: firstNameInput.value,
//                 lastName: lastNameInput.value

//             }));

//             // ไปหน้า profile
//             window.location.href = "profile.html";

//         } else {

//             alert("เข้าสู่ระบบไม่สำเร็จ");

//         }

//     });

// });
