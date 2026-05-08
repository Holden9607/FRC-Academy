let userXP = 0;
let currentMode = '';
const editor = document.getElementById('code-editor');

window.launchApp = (type) => {
    currentMode = type;
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('app-interface').style.display = 'flex';
    
    // Clear the editor so they have to type the code themselves
    editor.value = ""; 

    if (type === 'kraken') {
        document.getElementById('mode-text').innerText = "KRAKEN (PHOENIX 6) TRAINING";
        document.getElementById('instructions').innerHTML = `
            <h3>Mission: Command-Based Intake</h3>
            <p>Task: Map the intake and rollers to the <b>X Button</b>.</p>
            <ul>
                <li>Intake: 0.70 DutyCycleOut</li>
                <li>Rollers: 1.0 Speed</li>
            </ul>`;
    } else {
        document.getElementById('mode-text').innerText = "NEO (REV) TRAINING";
        document.getElementById('instructions').innerHTML = `
            <h3>Mission: NEO Motor Control</h3>
            <p>Task: Use the <b>A Button</b> to run the motor at 1.0 speed.</p>`;
    }
};

window.goBack = () => {
    document.getElementById('app-interface').style.display = 'none';
    document.getElementById('home-screen').style.display = 'flex';
};

document.getElementById('check-btn').addEventListener('click', () => {
    const code = editor.value.replace(/\s/g, ''); 
    
    if (currentMode === 'kraken') {
        // Checking for the specific Phoenix 6 DutyCycleOut syntax
        if (code.includes("DutyCycleOut(0.70)") && code.includes("m_Rollers.set(1.0)")) {
            success(150);
        } else {
            alert("❌ Code doesn't match season standards!");
        }
    } else {
        if (code.includes("m_motor.set(1.0)")) {
            success(100);
        } else {
            alert("❌ Check your motor.set values!");
        }
    }
});

function success(xp) {
    userXP += xp;
    document.getElementById('xp-val').innerText = userXP;
    alert("✅ DEPLOY SUCCESSFUL");
}
