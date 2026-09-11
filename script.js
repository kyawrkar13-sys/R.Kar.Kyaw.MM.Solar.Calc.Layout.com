function calculate(){

    let L = Number(document.getElementById("length").value);
    let W = Number(document.getElementById("width").value);
    let SB = Number(document.getElementById("setback").value);

    let watt = Number(document.getElementById("watt").value);

    let PL = Number(document.getElementById("pl").value);
    let PW = Number(document.getElementById("pw").value);

    let RS = Number(document.getElementById("row").value);
    let WW = Number(document.getElementById("walk").value);


    let usableL = L - (SB * 2);
    let usableW = W - (SB * 2);


    let column = Math.floor(
        usableL / (PW + WW)
    );

    let row = Math.floor(
        usableW / (PL + RS)
    );


    let qty = column * row;


    let dc = qty * watt / 1000;

    let inverter = dc / 1.2;


    localStorage.setItem(
        "pvData",
        JSON.stringify({
            panelQty:qty,
            dcKW:dc,
            inverter:Math.ceil(inverter)
        })
    );


    document.getElementById("output").innerHTML = `

    <b>☀️ PV Layout Result</b><br><br>

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

    <b>Total Panel Qty :
    ${qty} pcs</b>

    <br><br>

    Panel Watt :
    ${watt} W

    <br>

    <b>Total DC :
    ${dc.toFixed(2)} kW</b>

    <br><br>

    Recommended Inverter :
    <b>${Math.ceil(inverter)} kW</b>

    `;

}



function drawLayout(){

    let L = Number(document.getElementById("length").value);
    let W = Number(document.getElementById("width").value);
    let SB = Number(document.getElementById("setback").value);

    let PL = Number(document.getElementById("pl").value);
    let PW = Number(document.getElementById("pw").value);


    let usableL = L - (SB*2);
    let usableW = W - (SB*2);


let column =
Math.floor(usableL/PW);


let row =
Math.floor(usableW/PL);


    let qty = col * row;


    let site = document.getElementById("site");

    site.innerHTML="";


    site.style.gridTemplateColumns =
    `repeat(${col},1fr)`;


    for(let i=0;i<qty;i++){

        let panel=document.createElement("div");

        panel.className="panel";

        panel.innerHTML="PV";

        site.appendChild(panel);

    }
 Total Load (kW)
let totalLoad = Number(
    document.getElementById("totalLoad").value
);

// Solar Panel Watt
let solarWatt = Number(
    document.getElementById("solarWatt").value
);

// Efficiency
let efficiency = Number(
    document.getElementById("solarEfficiency").value
);

// Check input
if(totalLoad <= 0 || solarWatt <= 0){
    document.getElementById("solarOutput").innerHTML = `
        <b>⚠️ Please enter valid values.</b>
    `;
    return;
}

// Full Load calculation
let fullLoad = totalLoad / (solarWatt / 1000) / efficiency;

// Add 30% charging margin
let chargingLoad = fullLoad * 1.30;

document.getElementById("solarOutput").innerHTML = `

    <b>☀️ Solar Rough Calculation</b>
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
    <b>${fullLoad.toFixed(2)} kW</b>

    <br><br>

    Charging Load (+30%) :
    <b>${chargingLoad.toFixed(2)} kW</b>

`;



    document.getElementById("result").innerHTML = `

    <b>📐 Layout Result</b>
    <br><br>

    Usable Area :
    ${usableL.toFixed(1)}
    m ×
    ${usableW.toFixed(1)} m

    <br><br>

    Panel Row :
    ${row}

    <br>

    Panel Column :
    ${col}

    <br><br>

    <b>Total Panel :
    ${qty} pcs</b>

    `;

}
