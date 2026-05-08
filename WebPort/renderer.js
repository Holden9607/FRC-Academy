let userXP = 0;
let currentMode = '';
const editor = document.getElementById('code-editor');

window.launchApp = (type) => {
    currentMode = type;
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('app-interface').style.display = 'flex';
    
    // Clear the box so they don't get the answer for free
    editor.value = ""; 

    if (type === 'kraken') {
        document.getElementById('mode-text').innerText = "KRAKEN (PHOENIX 6) TRAINING";
        document.getElementById('instructions').innerHTML = `
            <h3>Mission: Command-Based Intake</h3>
            <p>Task: Use <b>DutyCycleOut(0.70)</b> for the intake and <b>set(1.0)</b> for rollers.</p>`;
    } else {
        document.getElementById('mode-text').innerText = "NEO (REV) TRAINING";
        document.getElementById('instructions').innerHTML = `
            <h3>Mission: NEO Motor Control</h3>
            <p>Task: Use <b>m_motor.set(1.0)</b> to activate the NEO.</p>`;
    }
};

window.goBack = () => {
    document.getElementById('app-interface').style.display = 'none';
    document.getElementById('home-screen').style.display = 'flex';
};

document.getElementById('check-btn').addEventListener('click', () => {
    const code = editor.value.replace(/\s/g, ''); 
    if (currentMode === 'kraken') {
        if (code.includes("DutyCycleOut(0.70)") && code.includes("m_Rollers.set(1.0)")) {
            success(150);
        } else {
            alert("❌ Logic Error: Check your Phoenix 6 syntax.");
        }
    } else {
        if (code.includes("m_motor.set(1.0)")) {
            success(100);
        } else {
            alert("❌ Logic Error: Motor speed must be 1.0.");
        }
    }
});

function success(xp) {
    userXP += xp;
    document.getElementById('xp-val').innerText = userXP;
    alert("✅ DEPLOY SUCCESSFUL");
}
