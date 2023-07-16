getTodo();

function deleteTodo(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(() => {
            location.reload();
        })
        .catch((error) => {
            console.error("Error deleting todo:", error);
        });
}

function parsedResponse(data) {
    let parentElement = document.getElementById("show-todo");

    let childElement = document.createElement("div");
    childElement.classList.add(
        "flex",
        "items-center",
        "justify-between",
        "py-2",
        "border-b"
    );
    let grandChildElement1 = document.createElement("span");
    grandChildElement1.setAttribute("id", "ml-60", "grandchild");
    grandChildElement1.classList.add("text-blue-500", "font-bold");
    grandChildElement1.innerHTML = data.title || "";

    let grandChildElement2 = document.createElement("span");
    grandChildElement2.setAttribute("id", "grandchild2");
    grandChildElement2.classList.add("text-gray-600");
    grandChildElement2.innerHTML = data.content || "";

    let grandChildElement3 = document.createElement("button");
    grandChildElement3.setAttribute("onclick", `deleteTodo(${data.id})`);
    grandChildElement3.classList.add(
        "mr-60",
        "bg-red-500",
        "text-white",
        "px-2",
        "py-1",
        "rounded"
    );
    grandChildElement3.innerHTML = "Delete";

    childElement.appendChild(grandChildElement1);
    childElement.appendChild(grandChildElement2);
    childElement.appendChild(grandChildElement3);

    parentElement.appendChild(childElement);
    location.reload(); //for refreshing the page
}

function getTheDataResponse(res) {
    res.json().then(parsedResponse);
}

function addTodo() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("description").value;

    title &&
        content &&
        fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                content: content,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(getTheDataResponse);
}

function parsedResponsefromBE(data) {
    let allTodo = data.data;

    let parentElement = document.getElementById("show-todo");
    for (let i = 0; i < allTodo.length; i++) {
        let todoId = allTodo[i].id;
        let childElement = document.createElement("div");
        childElement.classList.add(
            "flex",
            "items-center",
            "justify-between",
            "py-2",
            "border-b"
        );
        let grandChildElement1 = document.createElement("span");
        grandChildElement1.setAttribute("id", "grandchild");
        grandChildElement1.classList.add("text-blue-500", "ml-60", "font-bold");
        grandChildElement1.innerHTML = allTodo[i].title;

        let grandChildElement2 = document.createElement("span");
        grandChildElement2.setAttribute("id", "grandchild2");
        grandChildElement2.classList.add("text-gray-600");
        grandChildElement2.innerHTML = allTodo[i].content;

        let grandChildElement3 = document.createElement("button");
        grandChildElement3.setAttribute(
            "onclick",
            `deleteTodo(${allTodo[i].id})`
        );
        grandChildElement3.classList.add(
            "mr-60",
            "bg-red-500",
            "text-white",
            "px-2",
            "py-1",
            "rounded"
        );
        grandChildElement3.innerHTML = "Delete";

        childElement.appendChild(grandChildElement1);
        childElement.appendChild(grandChildElement2);
        childElement.appendChild(grandChildElement3);

        parentElement.appendChild(childElement);
    }
}

function getTheDataFromBE(res) {
    res.json().then(parsedResponsefromBE);
}

function getTodo() {
    fetch("http://localhost:3000/todos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(getTheDataFromBE);
}
