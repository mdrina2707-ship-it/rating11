function loadRating(owner){
let key="rating_"+owner;
let r=JSON.parse(localStorage.getItem(key))||{};
students.forEach(n=>{if(!(n in r)) r[n]=0;});
return r;}
function saveRating(owner,r){localStorage.setItem("rating_"+owner,JSON.stringify(r));}
function renderRating(owner,editable){
const c=document.getElementById("ratingList");
const r=loadRating(owner);
c.innerHTML="";
Object.keys(r).forEach(name=>{
let d=document.createElement("div");
d.className="student";
d.innerHTML=`<span class="clickable" onclick="openComments('${name}')">${name}</span>
<span class="score">${r[name]}</span>`;
if(editable){
d.innerHTML+=`<div class="buttons">
<button onclick="changeScore('${owner}','${name}',2)">+2</button>
<button onclick="changeScore('${owner}','${name}',1)">+1</button>
<button onclick="changeScore('${owner}','${name}',-1)">-1</button>
<button onclick="changeScore('${owner}','${name}',-2)">-2</button>
</div>`;
}
c.appendChild(d);});}
function changeScore(owner,name,delta){
const r=loadRating(owner);
r[name]+=delta;
saveRating(owner,r);
renderRating(owner,true);}
function openComments(name){
location.href="comments.html?student="+encodeURIComponent(name);}