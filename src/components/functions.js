export let float_fix2 = (input) => {
    let result = parseFloat(input).toFixed(2)
    return result
}

export let find_ccy = (array, input) => {
    let result = array.find(rate => rate.ccy === input)
    return result
}