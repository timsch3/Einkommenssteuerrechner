function toggleSecondIncome() {
    if (document.getElementById("splittingCheck").checked) {
        document.getElementById("secondIncome").style.display = "flex"
    }
    else {
        document.getElementById("secondIncome").style.display = "none"
        document.getElementById("income2").value = null
    }
}

/* Quelle der Formeln:
https://www.finanz-tools.de/einkommensteuer/berechnung-formeln/2021
https://www.finanz-tools.de/einkommensteuer/berechnung-formeln/2020
https://www.finanz-tools.de/einkommensteuer/berechnung-formeln/2019 */

function calc() {
    let freibetrag = 0, zvE = 0, ESt = 0, y = 0, z = 0, grenze1 = 0, grenze2 = 0, grenze3 = 0, zahl1 = 0, zahl2 = 0, zahl3 = 0, zahl4 = 0, zahl5 = 0
    const genau1400 = 1400
    const knapp2400 = 2397
    let jahr = Number(document.getElementById("year").value)
    let splitting = document.getElementById("splittingCheck").checked ? true : false
    let einkommen1 = Number(document.getElementById("income1").value)
    let einkommen2 = Number(document.getElementById("income2").value)

    zvE = splitting ? (einkommen1 + einkommen2) / 2 : einkommen1

    switch (jahr) {
        case 2021:
            freibetrag = 9744
            grenze1 = 14753 // 2. Fall: zweiter Betrag
            grenze2 = 57918 // 3. Fall: zweiter Betrag
            grenze3 = 274612 // 4. Fall: zweiter Betrag
            zahl1 = 995.21
            zahl2 = 208.85
            zahl3 = 950.96
            zahl4 = 9136.63
            zahl5 = 17374.99
            break;
        case 2020:
            freibetrag = 9408
            grenze1 = 14532 // 2. Fall: zweiter Betrag
            grenze2 = 57051 // 3. Fall: zweiter Betrag
            grenze3 = 270500 // 4. Fall: zweiter Betrag
            zahl1 = 972.87
            zahl2 = 212.02
            zahl3 = 972.79
            zahl4 = 8963.74
            zahl5 = 17078.74
            break;
        case 2019:
            freibetrag = 9168
            grenze1 = 14254 // 2. Fall: zweiter Betrag
            grenze2 = 55960 // 3. Fall: zweiter Betrag
            grenze3 = 265326 // 4. Fall: zweiter Betrag
            zahl1 = 980.14
            zahl2 = 216.16
            zahl3 = 965.58
            zahl4 = 8780.90
            zahl5 = 16740.68
            break;
    }

    if (zvE <= freibetrag) { // 1. Fall
        ESt = 0
    }
    else if (zvE > freibetrag && zvE <= grenze1) { // 2. Fall
        y = (zvE - freibetrag) / 10000
        ESt = (zahl1 * y + genau1400) * y
    }
    else if (zvE > grenze1 && zvE <= grenze2) { // 3. Fall
        z = (zvE - grenze1) / 10000
        ESt = (zahl2 * z + knapp2400) * z + zahl3
    }
    else if (zvE > grenze2 && zvE <= grenze3) { // 4. Fall
        ESt = 0.42 * zvE - zahl4
    }
    else if (zvE < grenze3) { // 5. Fall
        ESt = 0.45 * zvE - zahl5
    }

    document.getElementById("output").innerHTML = ESt.toFixed(2) + "€"
}