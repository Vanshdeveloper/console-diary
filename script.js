window.addEventListener('DOMContentLoaded', () => {
    const entries = JSON.parse(localStorage.getItem("consoleEntries")) || [];
    entries.forEach(entry => addToConsole(entry));
});

document.getElementById('saveEntryBtn').addEventListener('click', () => {
    const date = document.getElementById('date').value;
    const text = document.getElementById('text').value;
    const output = document.getElementById('output');

    if (text.startsWith("/")) {
        handleCommand(text);
    } else {
        if (date && text) {
            const id = Date.now();
            const entry = { id, date, text };

            const entries = JSON.parse(localStorage.getItem("consoleEntries")) || [];
            entries.push(entry);
            localStorage.setItem("consoleEntries", JSON.stringify(entries));

            addToConsole(entry);
            document.getElementById('text').value = "";
        }
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
    entryP.style.color = color || "#00ff00"; // ✅ default green


    const entrySpan = document.createElement('span');
    entrySpan.style.flex = "1";
    entrySpan.style.wordBreak = "break-word";

    const prefix = `> [${entry.date}]`;
    const indent = '    '; // 2 spaces ya jitna tu chahe
    entrySpan.innerText = `${prefix}${entry.text.split('\n').map(line => indent + line).join('\n‎ ‎ ')}`;


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
}



function handleCommand(input) {
    const lowerInput = input.toLowerCase().trim();

    if (lowerInput === "/clear") {
        document.getElementById("output").innerHTML = "";
        addToConsole({ id: Date.now(), date: "System", text: "Console cleared." }, "yellow", false);
    }

    else if (lowerInput === "/help") {
        const helpText = `
        Available commands:
        /clear - Clears the console
        /help - Show available commands
        /export - Download your diary as .json file format
        /reset - Delete all entries`

        addToConsole({ id: Date.now(), date: "System", text: helpText }, "cyan", false);
    }

    // /export baad me lagaunga abhi ke liye pending...!😤😤😤😤

    else if (lowerInput === "/reset") {
        if (confirm("Are you sure? This will delete all entries.")) {
            localStorage.removeItem("consoleEntries");
            document.getElementById("output").innerHTML = "";
            addToConsole({ id: Date.now(), date: "System", text: "All entries deleted!" }, "brown", false);
        }
    }

    else {
        addToConsole({ id: Date.now(), date: "System", text: `Unknown command: ${input}` }, "red", false);
    }
}


addToConsole({
    id: Date.now(),
    date: new Date().toISOString().split("T")[0],
    text: "Welcome to Console Diary!"
});

// function typeTextEffect(element, text, speed = 120) {
//     let index = 0;
//     element.textContent = "";
//     function type() {
//         if (index < text.length) {
//             element.textContent += text.charAt(index);
//             index++;
//             setTimeout(type, speed);
//         }
//     }
//     type();
// }
// typeTextEffect(entrySpan, `[${entry.date}] ${"Welcome to Console diary!"}`);