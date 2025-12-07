function loadRating(owner){
    let key = "rating_" + owner;
    let r = JSON.parse(localStorage.getItem(key)) || {};
    // Инициализируем всех учеников
    students.forEach(n => {
        if (!(n in r)) r[n] = 0;
    });
    return r;
}

function saveRating(owner, r){
    localStorage.setItem("rating_" + owner, JSON.stringify(r));
}

function renderRating(owner, editable){
    const container = document.getElementById("ratingList");
    const rating = loadRating(owner);
    container.innerHTML = "";

    // Сортировка по баллам
    const sortedNames = Object.keys(rating).sort((a,b) => rating[b] - rating[a]);

    sortedNames.forEach(name => {
        const div = document.createElement("div");
        div.className = "student";

        // Имя кликабельное
        div.innerHTML = `<span class="clickable" onclick="openComments('${name}')">${name}</span>
                         <span class="score">${rating[name]}</span>`;

        if(editable){
            div.innerHTML += `<div class="buttons">
                <button onclick="changeScore('${owner}','${name}',2)">+2</button>
                <button onclick="changeScore('${owner}','${name}',1)">+1</button>
                <button onclick="changeScore('${owner}','${name}',-1)">-1</button>
                <button onclick="changeScore('${owner}','${name}',-2)">-2</button>
            </div>`;
        }

        container.appendChild(div);
    });
}

// Изменение баллов с возможностью добавить комментарий
function changeScore(owner, name, delta){
    const r = loadRating(owner);
    r[name] += delta;
    saveRating(owner, r);
    renderRating(owner, true);
}

// Переход на страницу комментариев
function openComments(name){
    localStorage.setItem("currentCommentStudent", name); // сохраняем, чтобы comments.html знала
    window.location.href = "comments.html";
}
