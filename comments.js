const student = localStorage.getItem("currentCommentStudent");
document.getElementById("studentName").innerText = student;

function loadComments(){
    return JSON.parse(localStorage.getItem("comments_" + student)) || [];
}

function saveComments(data){
    localStorage.setItem("comments_" + student, JSON.stringify(data));
}

function renderComments(){
    const list = document.getElementById("commentsList");
    const comments = loadComments();
    list.innerHTML = "";
    comments.forEach((c,i)=>{
        const div = document.createElement("div");
        div.className = "comment";
        div.innerHTML = `<div class="text">${c.text}</div>
                         <div class="time">${c.time}</div>
                         <button onclick="deleteComment(${i})">Удалить</button>`;
        list.appendChild(div);
    });
}

function sendComment(){
    const text = document.getElementById("commentInput").value.trim();
    if(!text) return;
    const comments = loadComments();
    comments.push({text, time: new Date().toLocaleString("ru-RU")});
    saveComments(comments);
    renderComments();
    document.getElementById("commentInput").value = "";
}

function deleteComment(i){
    const comments = loadComments();
    comments.splice(i,1);
    saveComments(comments);
    renderComments();
}

renderComments();