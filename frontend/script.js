const imageInput = document.getElementById('imageInput');
const dropZone = document.getElementById('drop-zone');
const previewImage = document.getElementById('imagePreview');
const previewText = document.getElementById('previewText');

// 1. Apne server ka address (Note: Use http, not https for local)
const SERVER_URL = "http://localhost:5000/upload";

// Drop zone pe click karne se file browser khulega
dropZone.addEventListener('click', () => imageInput.click());

imageInput.addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        // 2. Browser mein Preview dikhana
        const reader = new FileReader();
        previewText.style.display = "none";
        previewImage.style.display = "block";

        reader.onload = function() {
            previewImage.setAttribute('src', this.result);
        };
        reader.readAsDataURL(file);

        // 3. Server par upload karna
        uploadFile(file);
    }
});

async function uploadFile(file) {
    const formData = new FormData();
    formData.append("image", file); 

    try {
        console.log("Uploading to:", SERVER_URL);
        const response = await fetch(SERVER_URL, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            alert("Success: " + data.message);
            console.log("Server Response:", data);
        } else {
            alert("Server Error: " + response.status);
        }
    } catch (error) {
        console.error("Connection Error:", error);
        alert("Server se connect nahi ho pa raha. Pehle 'node server.js' chalao!");
    }
}