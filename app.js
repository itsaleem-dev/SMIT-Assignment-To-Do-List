const getName = prompt("Enter Your Name");

const container = document.querySelector(".container");

let editingTask = null;

document.body.style.backgroundColor = "#f4f6f9";
document.body.style.fontFamily = "sans-serif";

container.style.width = "35%";
container.style.minHeight = "300px";
container.style.backgroundColor = "#fff";
container.style.borderRadius = "20px";
container.style.margin = "50px auto";
container.style.padding = "20px";
container.style.boxShadow = "0 0 15px rgba(0,0,0,0.2)";

const heading = document.createElement("h1");
heading.innerText = "To-Do App";
heading.style.textAlign = "center";
heading.style.color = "#136fad";
container.appendChild(heading);

const inputWrapper = document.createElement("div");
inputWrapper.style.display = "flex";
inputWrapper.style.marginTop = "20px";
container.appendChild(inputWrapper);

const getInput = document.createElement("input");
getInput.placeholder = "Enter Your To-Do";
getInput.style.width = "80%";
getInput.style.padding = "15px";
getInput.style.border = "2px solid #136fad";
getInput.style.borderTopLeftRadius = "25px";
getInput.style.borderBottomLeftRadius = "25px";
getInput.style.outline = "none";
getInput.style.fontSize = "16px";
getInput.style.backgroundColor = "azure";
inputWrapper.appendChild(getInput);

const submitBtn = document.createElement("button");
submitBtn.innerText = "Add";
submitBtn.style.backgroundColor = "#136fad";
submitBtn.style.color = "#fff";
submitBtn.style.fontSize = "16px";
submitBtn.style.fontWeight = "bold";
submitBtn.style.cursor = "pointer";
submitBtn.style.padding = "15px 20px";
submitBtn.style.border = "none";
submitBtn.style.borderTopRightRadius = "25px";
submitBtn.style.borderBottomRightRadius = "25px";
inputWrapper.appendChild(submitBtn);

const errorPara = document.createElement("p");
errorPara.style.color = "red";
errorPara.style.textAlign = "center";
errorPara.style.marginTop = "10px";
container.appendChild(errorPara);

const ul = document.createElement("ul");
ul.style.listStyle = "none";
ul.style.padding = "0";
ul.style.marginTop = "30px";
container.appendChild(ul);

const clearBtn = document.createElement("button");
clearBtn.innerText = "Clear List";
clearBtn.style.backgroundColor = "black";
clearBtn.style.color = "white";
clearBtn.style.padding = "10px 15px";
clearBtn.style.border = "none";
clearBtn.style.borderRadius = "10px";
clearBtn.style.cursor = "pointer";
clearBtn.style.marginTop = "15px";
clearBtn.style.display = "none";
container.appendChild(clearBtn);

clearBtn.addEventListener("click", () => {
    ul.innerHTML = "";
    updateClearButton();
});

submitBtn.addEventListener("click", addTodo);

getInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

function updateClearButton() {
    if (ul.children.length > 1) {
        clearBtn.style.display = "block";
    } else {
        clearBtn.style.display = "none";
    }
}

function addTodo() {

    if (!getInput.value.trim()) {
        errorPara.innerText = `${getName}: Please Give Me Input`;
        return;
    }

    errorPara.innerText = "";

    if (editingTask) {
        editingTask.innerText = getInput.value;
        editingTask = null;
        submitBtn.innerText = "Add";
        getInput.value = "";
        return;
    }

    const li = document.createElement("li");

    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.backgroundColor = "#f1f5f9";
    li.style.padding = "12px";
    li.style.marginBottom = "10px";
    li.style.borderRadius = "10px";
    li.style.borderLeft = "5px solid #136fad";

    const taskText = document.createElement("span");
    taskText.innerText = getInput.value;
    taskText.style.fontSize = "18px";
    taskText.style.textTransform = "capitalize";

    const btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.gap = "10px";

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.style.backgroundColor = "#f59e0b";
    editBtn.style.color = "#fff";
    editBtn.style.border = "none";
    editBtn.style.padding = "8px 12px";
    editBtn.style.borderRadius = "5px";
    editBtn.style.cursor = "pointer";

    editBtn.addEventListener("click", () => {
        getInput.value = taskText.innerText;
        getInput.focus();
        editingTask = taskText;
        submitBtn.innerText = "Edit";
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.style.backgroundColor = "crimson";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.padding = "8px 12px";
    deleteBtn.style.borderRadius = "5px";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", () => {
        li.remove();

        if (editingTask === taskText) {
            editingTask = null;
            getInput.value = "";
            submitBtn.innerText = "Add";
        }

        updateClearButton();
    });

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(btnContainer);

    ul.appendChild(li);

    getInput.value = "";

    updateClearButton();
}