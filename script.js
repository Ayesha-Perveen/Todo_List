const input = document.querySelector("#input-box");
const button = document.querySelector("#addButton");
const list = document.querySelector("#list");
const clear=document.querySelector("#btn-clear");

let luminance;
// random color is generated
const colorrandom = function () {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    luminance = (0.299 * r) + (0.587 * g) + (0.114 * b);
    return `rgb(${r},${g},${b})`;
}

const listitem = JSON.parse(localStorage.getItem("listitem")) || [];

// creating a list
function createList(text) {
    const li = document.createElement("li");

    // Add Tailwind CSS classes to the li element for styling and layout
    li.classList.add(
        "flex", "items-center", "justify-between", "my-2", "p-4",
        "relative", "rounded-lg", "shadow-md", "min-w-0", "flex-grow" , "text-lg"
    );

    // Create a container for the text and give it a class to handle wrapping
    const textSpan = document.createElement("span");
    textSpan.classList.add("break-words","font-semibold");
    textSpan.textContent = text;
    li.appendChild(textSpan);

    // Create a container for the controls (checkbox and SVG) to group them
    const controlsWrapper = document.createElement("div");
    controlsWrapper.classList.add("flex", "items-center", "gap-2"); 

    // Create the SVG icon
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    // Add necessary attributes and classes to the SVG
    svg.setAttribute("viewBox", "0 0 640 640");
    svg.classList.add("w-6", "h-6", "cursor-pointer", "delimg");
    svg.style.fill = "currentColor"; // Ensure the SVG color matches the li text color
    path.setAttribute("d", "M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z");
    svg.appendChild(path);

    // Create the checkbox
    const inbx = document.createElement("input");
    inbx.setAttribute("type", "checkbox");
    inbx.classList.add("ckbox","w-6", "h-6");

    // Append controls to the wrapper
    controlsWrapper.appendChild(inbx);
    controlsWrapper.appendChild(svg);

    // Append the text and controls wrapper to the list item
    li.appendChild(controlsWrapper);

    // Set background and text color based on luminance
    li.style.backgroundColor = colorrandom();
    if (luminance < 128) {
        li.style.color = "white";
    } else {
        li.style.color = "black";
    }
    
    // Finally, append the new list item to the list
    list.appendChild(li);
}


// Load and display all previously saved list items from localStorage
listitem.forEach(function (text) {
    createList(text);
});

// adding a click event to create the list
function addTask() {
    const text = input.value;
    if (text.trim() !== "") {
        createList(text);
        listitem.push(text);
        localStorage.setItem("listitem", JSON.stringify(listitem));
        input.value = "";
    }
}

// Event listener for the button click
button.addEventListener("click", addTask);

// Event listener for the Enter key press in the input field
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


// adding a click event to delete or to mark it as done
list.addEventListener("click", function (event) {
    // Delete button clicked
    if (event.target.classList.contains("delimg") || event.target.parentNode.classList.contains("delimg")) {
        const li = event.target.closest("li"); // Use closest() to find the parent li
        if (li) {
            const text = li.querySelector("span").textContent; // Get the text from the span
            li.remove();

            // deleting element from the Array and LocalStorage
            const index = listitem.indexOf(text);
            if (index !== -1) {
                listitem.splice(index, 1);
                localStorage.setItem("listitem", JSON.stringify(listitem));
            }
        }
    }

    // Checkbox clicked
    if (event.target.classList.contains("ckbox")) {
        const li = event.target.closest("li");
        li.classList.toggle("line-through");
    }
});
clear.addEventListener("click" , function(e)
{
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    localStorage.clear();
});