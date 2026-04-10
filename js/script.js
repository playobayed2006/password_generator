document.addEventListener("DOMContentLoaded", () => {

    const passwordEl = document.getElementById("password");
    const generateBtn = document.getElementById("generate");
    const copyBtn = document.getElementById("copyBtn");
    const lengthEl = document.getElementById("length");
    const lengthVal = document.getElementById("lengthVal");
    const bar = document.getElementById("bar");
    const strengthText = document.getElementById("strengthText");
    const toast = document.getElementById("toast");

    // Slider update
    lengthEl.addEventListener("input", () => {
        lengthVal.textContent = lengthEl.value;
    });

    function secureRandom(max) {
        const arr = new Uint32Array(1);
        window.crypto.getRandomValues(arr);
        return arr[0] % max;
    }

    function generatePassword() {
        const length = lengthEl.value;
        const hasLower = document.getElementById("lower").checked;
        const hasUpper = document.getElementById("upper").checked;
        const hasNumber = document.getElementById("numbers").checked;
        const hasSymbol = document.getElementById("symbols").checked;

        const lower = "abcdefghijklmnopqrstuvwxyz";
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+";

        let chars = "";
        if (hasLower) chars += lower;
        if (hasUpper) chars += upper;
        if (hasNumber) chars += numbers;
        if (hasSymbol) chars += symbols;

        if (!chars) {
            passwordEl.textContent = "Select at least one option!";
            return;
        }

        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars[secureRandom(chars.length)];
        }

        passwordEl.textContent = password;
        updateStrength(password);
    }

    function updateStrength(password) {
        let score = 0;

        if (password.length >= 8) score += 25;
        if (/[A-Z]/.test(password)) score += 25;
        if (/[0-9]/.test(password)) score += 25;
        if (/[^A-Za-z0-9]/.test(password)) score += 25;

        if (score < 50) {
            strengthText.textContent = "Strength: Weak";
            bar.style.width = "30%";
            bar.style.background = "red";
        } else if (score < 75) {
            strengthText.textContent = "Strength: Medium";
            bar.style.width = "60%";
            bar.style.background = "orange";
        } else {
            strengthText.textContent = "Strength: Strong";
            bar.style.width = "100%";
            bar.style.background = "limegreen";
        }
    }

    function copyPassword() {
        const text = passwordEl.textContent;

        if (!text || text.includes("Generated") || text.includes("Select")) return;

        navigator.clipboard.writeText(text).then(() => {
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 1500);
        });
    }

    // Events
    generateBtn.addEventListener("click", generatePassword);
    copyBtn.addEventListener("click", copyPassword);

});