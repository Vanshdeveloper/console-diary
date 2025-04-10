window.addEventListener('DOMContentLoaded', () => {
    const entries = JSON.parse(localStorage.getItem("consoleEntries")) || [];
    entries.forEach(entry => addToConsole(entry));
});

document.getElementById('saveEntryBtn').addEventListener('click', () => {
    const date = document.getElementById('date').value;
    const text = document.getElementById('text').value;
    const output = document.getElementById('output');

    if (date && text) {
        const id = Date.now();
        const entry = { id, date, text };

        const entries = JSON.parse(localStorage.getItem("consoleEntries")) || [];
        entries.push(entry);
        localStorage.setItem("consoleEntries", JSON.stringify(entries));
        
        addToConsole(entry);
        document.getElementById('text').value = "";
    }
});

function addToConsole(entry, color, showDelete = true) {
    const display = document.getElementById('output');

    const entryP = document.createElement('p');
    entryP.dataset.id = entry.id;
    entryP.style.display = "flex";
    entryP.style.justifyContent = "space-between";
    entryP.style.alignItems = "flex-start";
    entryP.style.flexWrap = "wrap";
    entryP.style.gap = "12px";
    // entryP.style.color = color;
    entryP.style.color = color || "#00ff00"; // ✅ default green

    const entrySpan = document.createElement('span');
    entrySpan.style.flex = "1";
    entrySpan.style.wordBreak = "break-word";
    entrySpan.innerText = `> [${entry.date}] ${entry.text}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "[ x ]";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.color = "#50e03d";
    deleteBtn.style.color = "#ff0000";
    deleteBtn.style.border = "none";
    deleteBtn.style.fontSize = "18px";
    deleteBtn.style.fontWeight = "bold";
    deleteBtn.onclick = () => deleteEntryByDate(entry.id);

    display.appendChild(entryP);
    entryP.appendChild(entrySpan);
    entryP.appendChild(deleteBtn);
}

function deleteEntryByDate(id) {
    let entries = JSON.parse(localStorage.getItem('consoleEntries')) || [];
    const newEntries = entries.filter(entry => entry.id !== id);

    if (entries.length === newEntries.length) {
        addToConsole("System", `No entry found to delete`, "red", false);
    }
    else {
        localStorage.setItem('consoleEntries', JSON.stringify(newEntries));

        const display = document.getElementById("output");
        const toRemove = display.querySelector(`p[data-id="${id}"]`);
        if (toRemove) toRemove.remove();

        addToConsole({ id: Date.now(), date: "System", text: "Entry deleted successfully" }, "purple", false);
    }
    // console.log(entries);
}

addToConsole({ id: Date.now(), date: new Date().toISOString().split("T")[0], text: "Welcome to Console Diary!" });
