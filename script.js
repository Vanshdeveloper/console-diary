window.addEventListener('DOMContentLoaded', () => {
    const entries = JSON.parse(localStorage.getItem("consoleEntries")) || [];
    entries.forEach(entry => addToConsole(entry.date, entry.text));
})

document.getElementById('saveEntryBtn').addEventListener('click', () => {
    const date = document.getElementById('date').value;
    const text = document.getElementById('text').value;
    const output = document.getElementById('output');

    if (date && text) {
        addToConsole(date, text);

        const entries = JSON.parse(localStorage.getItem("consoleEntries")) || [];
        entries.push({ date, text });
        localStorage.setItem("consoleEntries", JSON.stringify(entries));

        document.getElementById('text').value = "";
    }
});

function addToConsole(date, text) {
    const display = document.getElementById('output');
    const entry = document.createElement('p');
    entry.innerText = `> [${date}] ${text}`;
    display.appendChild(entry);
}

addToConsole(Date.now(), "Welcome to Console Diary!");