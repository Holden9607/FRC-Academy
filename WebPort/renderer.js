let userXP = 0;
let currentMode = '';
const editor = document.getElementById('code-editor');

window.launchApp = (type) => {
    currentMode = type;
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('app-interface').style.display = 'flex';
    
    if (type === 'kraken') {
        document.getElementById('mode-text').innerText = "KRAKEN (PHOENIX 6) TRAINING";
        editor.value = `operatorJoystick.x().whileTrue(new RunCommand(() -> {
    m_IntakeActivate.setControl(new DutyCycleOut(0.70));
    m_Rollers.set(1.0);
})).onFalse(new InstantCommand(() -> {
    m_IntakeActivate.setControl(new DutyCycleOut(0.0));
    m_Rollers.set(0.0);
}));`;
        
        document.getElementById('instructions').innerHTML = `
            <h3>Mission: Command-Based Intake</h3>
            <p>Season code style: <b>Phoenix 6</b>.</p>
            <ul>
                <li><b>Trigger:</b> X Button</li>
                <li><b>While True:</b> Intake 0.70, Rollers 1.0</li>
                <li><b>On False:</b> Stop all</li>
            </ul>`;
    } else {
        document.getElementById('mode-text').innerText = "NEO (REV) TRAINING";
        editor.value = `public void teleopPeriodic() {
    if (stick.getAButton()) {
        m_motor.set(1.0);
    } else {
        m_motor.set(0.0);
    }
}`;
        document.getElementById('instructions').innerHTML = `
            <h3>Mission: NEO Motor Control</h3>
            <p>REV logic inside <b>teleopPeriodic</b>.</p>
            <ul>
                <li><b>Trigger:</b> A Button</li>
                <li><b>Action:</b> m_motor.set(1.0)</li>
            </ul>`;
    }
};

window.goBack = () => {
    document.getElementById('app-interface').style.display = 'none';
    document.getElementById('home-screen').style.display = 'flex';
};

document.getElementById('check-btn').addEventListener('click', () => {
    const code = editor.value.replace(/\s/g, ''); 
    if (currentMode === 'kraken') {
        const check = code.includes("whileTrue(newRunCommand(()->{m_IntakeActivate.setControl(newDutyCycleOut(0.70));m_Rollers.set(1.0);})).onFalse(newInstantCommand(()->{m_IntakeActivate.setControl(newDutyCycleOut(0.0));m_Rollers.set(0.0);}));");
        if (check) { success(150); } else { alert("❌ Error: Check Phoenix 6 syntax!"); }
    } else {
        const check = code.includes("if(stick.getAButton()){m_motor.set(1.0);}else{m_motor.set(0");
        if (check) { success(100); } else { alert("❌ Error: Check if/else logic!"); }
    }
});

function success(xp) {
    userXP += xp;
    document.getElementById('xp-val').innerText = userXP;
    alert("✅ DEPLOY SUCCESSFUL");
}