const display = document.getElementById("display")
let calcRealized = false
let error = false

const history = []

function input(value) {

    if (value.match(/[^÷x+-]/g && calcRealized) || error) {
        reset()
    }

    if (value.match(/[÷x+]/g) && !display.value) return

    if (display.value) {
        if (display.value[display.value.length - 1].match(/[÷x]/g) && value.match(/[÷x]/g)) {
            backspace()
        }
    }

    if (display.value) {
        if (display.value[display.value.length - 1].match(/[-+]/g) && value.match(/[-+x÷]/g)) {
            backspace()
        }
    }

    if (value === ".") {
        const splittedExpression = display.value.split(/[÷x+-]/g)

        if (splittedExpression[splittedExpression.length - 1].indexOf(".") !== -1) return
    }

    calcRealized = false
    error = false
    
    display.value += value

}

function reset() {
    display.value = null
}

function backspace() {
    display.value = display.value.substring(0, display.value.length - 1)
}

function calc() {
    try {
        const expression = display.value.replace(/[÷x]/g, char => ({"÷": "/", "x": "*"})[char])
        const result = parseFloat(eval(expression).toFixed(9))
        if (!Number.isFinite(result) || Number.isNaN(result)) {
            throw new Error("Error")
        }
        display.value = result
        calcRealized = true

        history.push(expression)

    } catch (err) {
        error = true
        console.log(err)
        display.value = "ERROR"
    }
}

function toggleHistory() {
    const modalOverlay = document.getElementById("modal-overlay")
    modalOverlay.classList.toggle('hidden')

    const historyModal = document.getElementById("history")

    if (history.length) {
        historyModal.innerHTML = null
        history.map((item) => {
            historyModal.innerHTML += `<p>${item}</p>`
        })
    } else {
        historyModal.innerHTML = `<h1 id="no-history">Histórico Vazio</h1>`
    }

}