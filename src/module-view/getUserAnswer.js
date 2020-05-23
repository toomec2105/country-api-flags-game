export function getUserAnswer(buttons) {
    let userAnswer = "";
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].checked) {
            userAnswer = buttons[i].value;
        }
    }
    return userAnswer;
}
