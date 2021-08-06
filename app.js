
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let constant = $('#constant')
let height = $('#height')
let frequency = $('#frequency')
let Z0 = $('#Zo')
let Elec = $('#elec')
let Width = $('#width')
let Length = $('#length')

const btn = [...$$('.btn')]
const inputElement = [...$$('input[type=text]')]


// Get Value from Input & push it into empty Array
let arrayValue = []
const getValue = () => {
    constant.addEventListener('input', () => {
        if (typeof constant.value === "undefined") {
            arrayValue[0] = "0"
        } else {
            arrayValue[0] = (constant.value)
        }
    })
    height.addEventListener('input', () => {
        if (typeof height.value === "undefined") {
            arrayValue[1] = "0"
        } else {
            arrayValue[1] = (height.value)
        }
    })
    frequency.addEventListener('input', () => {
        if (typeof frequency.value === "undefined") {
            arrayValue[2] = "0"
        } else {
            arrayValue[2] = (frequency.value)
        }
    })
    Z0.addEventListener('input', () => {
        if (typeof Z0.value === "undefined") {
            arrayValue[3] = "0"
        } else {
            arrayValue[3] = (Z0.value)
        }
    })
    Elec.addEventListener('input', () => {
        if (typeof Elec.value === "undefined") {
            arrayValue[4] = "0"
        } else {
            arrayValue[4] = (Elec.value)
        }
    })
    Width.addEventListener('input', () => {
        if (typeof Width.value === "undefined") {
            arrayValue[5] = "0"
        } else {
            arrayValue[5] = (Width.value)
        }
    })
    Length.addEventListener('input', () => {
        if (typeof Length.value === "undefined") {
            arrayValue[6] = "0"
        } else {
            arrayValue[6] = (Length.value)
        }
    })
}


// Function Math & preventDefault
const preventDefault = () => { // preventDefault
    btn.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault()
        })
    })
}

const resetValue = () => { // Reset Value of Input
    $('.reset-cal').addEventListener('click', () => {
        inputElement.map((element) => {
            element.value = ""
        })
    })
}

const synthesize = () => { // Synthesize Math
    $('#synthesize').addEventListener('click', () => {
        let Er = parseFloat(arrayValue[0]),
            h = parseFloat(arrayValue[1]),
            f = parseFloat(arrayValue[2]),
            Zo = parseFloat(arrayValue[3]),
            elec = parseFloat(arrayValue[4]),
            width = parseFloat(arrayValue[5]),
            length = parseFloat(arrayValue[6])

        let A = (Zo/60) * Math.sqrt((Er + 1)/2) + ((Er - 1)/(Er + 1)) * (0.23 + 0.11/Er)
        let B = (377*Math.PI)/(2*Zo*Math.sqrt(Er))
        
        let widthPerH = (8*Math.pow(2.72, A)) / ((Math.pow(2.72, 2*A)) - 2)
        if (widthPerH < 2) {
            width = widthPerH*h
            setTimeout(() => {
                Width.value = width
            },500)
        } else {
            widthPerH = (2/Math.PI) * (B - 1 - Math.log(2*B - 1) + ((Er - 1)/ (2*Er)) * (Math.log(B - 1) + 0.39 - 0.61/Er))
            width = widthPerH*h
            setTimeout(() => {
                Width.value = width
            },500)
        }
        let Ee = (Er + 1)/2 + ((Er - 1)/2) * (1/(Math.sqrt(1 + 12*h/width)))
        let Ko = 2 * Math.PI * f * Math.pow(10, 9) / (3 * Math.pow(10, 8))
        length = (elec * Math.PI / 180) / (Math.sqrt(Ee) * Ko) * 1000
        setTimeout(() => {
            Length.value = length 
        },500)
    })
}


const analyze = () => { // Analyze Math
    $('#analyze').addEventListener('click', () => {
        let Er = parseFloat(arrayValue[0]),
            h = parseFloat(arrayValue[1]),
            f = parseFloat(arrayValue[2]),
            Zo = parseFloat(arrayValue[3]),
            elec = parseFloat(arrayValue[4]),
            width = parseFloat(arrayValue[5]),
            length = parseFloat(arrayValue[6])

        let Ee = (Er + 1)/2 + ((Er - 1)/2) * (1/(Math.sqrt(1 + 12*h/width)))

        if ( width/h <= 1) {
            Zo = (60/Ee) * Math.log(8*h/width + width/(4*h))
        } else {
            Zo = (120*Math.PI) / (Math.sqrt(Ee) * (width/h + 1.393 + 0.667*Math.log(width/h + 1.444)))
        }
        setTimeout(() => {
            Z0.value = Zo
        },500)
        elec = length*Math.sqrt(Ee)*360*f*Math.pow(10, 9)/(3*Math.pow(10, 11))
        setTimeout(() => {
            Elec.value = elec
        }, 500)
    })
}


// Callback
const callBack = () => {
    getValue()
    preventDefault()
    resetValue()
    synthesize()
    analyze() 
}

callBack()




