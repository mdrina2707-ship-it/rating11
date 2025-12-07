const p=new URLSearchParams(location.search);
const student=p.get("student");
document.getElementById("studentName").innerText=student;
function loadComments(){return JSON.parse(localStorage.getItem("comments_"+student))||[];}
function saveComments(c){localStorage.setItem("comments_"+student,JSON.stringify(c));}
function renderComments(){
let l=document.getElementById("commentsList");
let c=loadComments();
l.innerHTML="";
c.forEach((cm,i)=>{
let d=document.createElement("div");
d.className="comment";
d.innerHTML=`<div class="text">${cm.text}</div>
<div class="time">${cm.time}</div>
<button onclick="deleteComment(${i})">Удалить</button>`;
l.appendChild(d);});}
function sendComment(){
let t=document.getElementById("commentInput").value.trim();
if(!t) return;
let c=loadComments();
c.push({text:t,time:new Date().toLocaleString("ru-RU")});
saveComments(c);
renderComments();
document.getElementById("commentInput").value="";}
function deleteComment(i){
let c=loadComments();
c.splice(i,1);
saveComments(c);
renderComments();}
renderComments();