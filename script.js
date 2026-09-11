 // ===============================
// 📐 PV LAYOUT CALCULATOR
// ===============================
function calculate() {
    let L = Number(document.getElementById("length").value);
    let W = Number(document.getElementById("width").value);
    let SB = Number(document.getElementById("setback").value) || 0;
    let watt = Number(document.getElementById("watt").value);
    let PL = Number(document.getElementById("pl").value);
    let PW = Number(document.getElementById("pw").value);
    let RS = Number(document.getElementById("row").value) || 0;
    let CS = Number(document.getElementById("column").value) || 0;
    let output = document.getElementById("output");
    // Check input
    if (L <= 0 || W <= 0 || PL <= 0 || PW <= 0) {
        output.innerHTML = `
            <b>⚠️ Please enter valid Site and Panel dimensions.</b>
        `;
        return;
    }
    // Usable area
    let usableL = L - (SB * 2);
    let usableW = W - (SB * 2);
    if (usableL <= 0 || usableW <= 0) {
        output.innerHTML = `
            <b>⚠️ Setback is too large.</b>
        `;
        return;
    }
    // Panel calculation
    let column = Math.floor(
        usableL / (PW + CS)
    );
    let row = Math.floor(
        usableW / (PL + RS)
    );
    let qty = column * row;
    // DC calculation
    let dc = qty * watt / 1000;
    // Recommended inverter
    let inverter = dc / 1.2;
    // Save data
    localStorage.setItem(
        "pvData",
        JSON.stringify({
            panelQty: qty,
            dcKW: dc,
            inverter: Math.ceil(inverter)
        })
    );
    // Show result
    output.innerHTML = `
        <b>☀️ PV Layout Result</b>
        <br><br>
        Usable Length :
        ${usableL.toFixed(2)} m
        <br>
        Usable Width :
        ${usableW.toFixed(2)} m
        <br><br>
        Panel Column :
        ${column}
        <br>
        Panel Row :
        ${row}
        <br><br>
        <b>
        Total Panel Qty :
        ${qty} pcs
        </b>
        <br><br>
        Panel Watt :
        ${watt} W
        <br>
        <b>
        Total DC :
        ${dc.toFixed(2)} kW
        </b>
        <br><br>
        Recommended Inverter :
        <b>${Math.ceil(inverter)} kW</b>
    `;
    // Draw panel layout
    drawLayout(
        column,
        row,
        qty
    );
}
// ===============================
// 📐 DRAW PV LAYOUT
// ===============================
function drawLayout(column, row, qty) {
    let site = document.getElementById("site");
    if (!site) {
        return;
    }
    site.innerHTML = "";
    if (column <= 0 || row <= 0) {
        return;
    }
    site.style.gridTemplateColumns =
        `repeat(${column}, 1fr)`;
    for (let i = 0; i < qty; i++) {
        let panel =
            document.createElement("div");
        panel.className = "panel";
        panel.innerHTML = "PV";
        site.appendChild(panel);
    }
}
// ===============================
// ☀️ SOLAR ROUGH CALCULATION
// ===============================
function solarRoughCalculate() {
    let totalLoad =
        Number(
            document.getElementById("totalLoad").value
        );
    let solarWatt =
        Number(
            document.getElementById("solarWatt").value
        );
    let efficiency =
        Number(
            document.getElementById("solarEfficiency").value
        );
    let output =
        document.getElementById("solarOutput");
    // Check input
    if (!totalLoad || totalLoad <= 0) {
        output.innerHTML = `
            <b>⚠️ Please enter Total Load.</b>
        `;
        return;
    }
    // Solar Watt → kW
    let solarKW =
        solarWatt / 1000;
    // Full Load
    let fullLoad =
        totalLoad / solarKW / efficiency;
    // Add 30%
    let chargingLoad =
        fullLoad * 1.30;
    // Show result
    output.innerHTML = `
        <b>☀️ Solar Rough Result</b>
        <br><br>
        Total Load :
        <b>${totalLoad.toFixed(2)} kW</b>
        <br>
        Solar Watt :
        <b>${solarWatt} W</b>
        <br>
        Efficiency :
        <b>${(efficiency * 100).toFixed(0)}%</b>
        <br><br>
        Full Load :
        <b>${fullLoad.toFixed(2)}</b>
        <br><br>
        Charging Load (+30%) :
        <b>${chargingLoad.toFixed(2)}</b>
    `;
}
// ===============================
// ☀️ SOLAR BUTTON
// ===============================
// If button exists, connect it
document.addEventListener("DOMContentLoaded", function () {
    let solarButton =
        document.getElementById("solarCalculateBtn");
    if (solarButton) {
        solarButton.addEventListener(
            "click",
            solarRoughCalculate
        );
    }
});
