const owner = "karina"; // или "sofia"

function loadRating() {
    const saved = localStorage.getItem("rating_" + owner);
    let rating = {};
    students.forEach(s => rating[s] = 0); // инициализация всех учеников
    if(saved){
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach(k => { rating[k] = parsed[k]; });
    }
    return rating;
}

function saveRating(rating){
    localStorage.setItem("rating_" + owner, JSON.stringify(rating));
}

function renderRating(editable = true){
    const container = document.getElementById("ratingList");
    const rating = loadRating();
    container.innerHTML = "";

    // Сортировка по баллам
    const sorted = Object.keys(rating).sort((a,b)=>rating[b]-rating[a]);

    sorted.forEach(name=>{
        const div = document.createElement("div");
        div.className = "student";
        div.innerHTML = `<span class="clickable" onclick="openComments('${name}')">${name}</span>
                         <span>${rating[name]}</span>`;
        if(editable){
            div.innerHTML += `<div class="buttons">
                <button onclick="changeScore('${name}',2)">+2</button>
                <button onclick="changeScore('${name}',1)">+1</button>
                <button onclick="changeScore('${name}',-1)">-1</button>
                <button onclick="changeScore('${name}',-2)">-2</button>
            </div>`;
        }
        container.appendChild(div);
    });
}

function changeScore(name, delta){
    const rating = loadRating();
    rating[name] += delta;
    saveRating(rating);
    renderRating(true);
}

function openComments(name){
    localStorage.setItem("currentCommentStudent", name);
    window.location.href = "comments.html";
}

// Запуск
renderRating(true);
