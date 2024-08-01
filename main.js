let total = 0
let buffer = '0'
let pre_op;

const screen = document.querySelector(".screen")

function button_click(value) {
    if (isNaN(value))
        handle_symbol(value)

    else
        handle_number(value)

    screen.innerText = buffer
}

function handle_symbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0'
            total = 0
            break

        case '=':
            if (pre_op === null)
                return

            flush_op(parseInt(buffer))
            pre_op = null
            // buffer = total
            buffer = total.toString();
            total = 0
            break

        case '←':
            if (buffer.length === 1)
                buffer = '0'

            else
                buffer = buffer.substring(0, buffer.length - 1)

            break

        case '+':
        case '−':
        case '×':
        case '÷':
            handle_math(symbol)
            break
    }
}

function handle_math(symbol) {
    if (buffer === '0')
        return

    const int_buffer = parseInt(buffer)

    if (total === 0)
        total = int_buffer

    else
        flush_op(int_buffer)

    pre_op = symbol
    buffer = '0'
}

function flush_op(int_buffer) {
    switch (pre_op) {
        case '+':
            total += int_buffer;
            break;

        case '−':
            total -= int_buffer;
            break;

        case '×':
            total *= int_buffer;
            break;

        case '÷':
            total /= int_buffer;
            break;
    }
}

function handle_number(number_string) {
    if (buffer === "0")
        buffer = number_string

    else
        buffer += number_string
}

function init() {
    document.querySelector(".calc-btns").addEventListener('click', function (e) {
        button_click(e.target.innerText)
    })
}

init();