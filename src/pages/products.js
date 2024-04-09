const adjustWidthSelectors = (selectedElement) => {
    var tempElement = document.createElement('span');

    console.log(selectedElement.options[selectedElement.selectedIndex].text)

    tempElement.innerHTML = selectedElement.options[selectedElement.selectedIndex].text;
    tempElement.style.visibility = 'hidden'; // make it invisible but still rendered
    tempElement.style.position = 'absolute'; // prevent it from affecting other elements

    document.body.appendChild(tempElement);
    console.log(tempElement.offsetWidth); // log the width
    selectedElement.style.width = tempElement.offsetWidth + 10 + 'px';
    document.body.removeChild(tempElement);
}

document.addEventListener('DOMContentLoaded', () => {
    window.onload = function () {
        var selectElement = document.getElementById('sort');
        adjustWidthSelectors(selectElement);
    } // onload, adjust the width of the select element
});