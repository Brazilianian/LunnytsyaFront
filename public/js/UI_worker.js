
export function changeButtonClass (id, from, to) {
    let button = document.getElementById(id);
    button.className = button.className.replace(from, to);
}

export function clearValidation (elementsClassNames) {
    elementsClassNames.forEach(elementClassName => {
        let element = document.getElementById(elementClassName);
        element.className = element.className.replace('has-invalid', '');
    })
}