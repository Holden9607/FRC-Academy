let userXP = 0;
let currentMode = '';
const editor = document.getElementById('code-editor');

// The "Answer Key" - used for checking, not for showing!
const KRAKEN_ANSWER = `operatorJoystick.x().whileTrue(new RunCommand(() -> {
    m_IntakeActivate.setControl(new DutyCycleOut(0.70));
    m_Rollers.set(1.0);
})).onFalse(new InstantCommand(() -> {
    m_IntakeActivate.setControl(new DutyCycleOut(0.0));
    m_Rollers.set(0.0);
}));`;

const NEO_ANSWER = `public void teleopPeriodic() {
    if (stick.getAButton()) {
        m_motor.set(1.0);
    } else {
        m_motor.set(0.0);
    }
}`;

window.launchApp = (type) => {
    currentMode = type;
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('app-interface').style.display = 'flex';
    
    // WE RESET THE EDITOR TO EMPTY SO THEY HAVE TO TYPE
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
        const key = KRAKEN_ANSWER.replace(/\s/g, '');
        if (code === key || code.includes("DutyCycleOut(0.70)")) {
            success(150);
        } else {
            alert("❌ Code doesn't match season standards!");
        }
    } else {
        const key = NEO_ANSWER.replace(/\s/g, '');
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
