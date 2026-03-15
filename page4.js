

/* fresh run clear */
let params = new URLSearchParams(window.location.search);

let dept = params.get("dept");
let year = params.get("year");

document.getElementById("showDept").innerText = "Department : " + dept;
document.getElementById("showYear").innerText = "Year : " + year;


let params2 = new URLSearchParams(window.location.search);

let code = params2.get("code");
let subject = params2.get("subject");
let faculty = params2.get("faculty");

document.getElementById("showCode").innerText = "Code : " + code;
document.getElementById("showSubject").innerText = "Subject : " + subject;
document.getElementById("showFaculty").innerText = "Faculty : " + faculty;



window.onload=function(){

localStorage.removeItem("CAT1");
localStorage.removeItem("CAT2");
localStorage.removeItem("MODEL1");
localStorage.removeItem("MODEL2");

}

let currentExam="";
let examStats={passPercent:"0%",failCount:0,absentCount:0};

function openGrading(exam){

currentExam=exam;

document.getElementById("mainPage").style.display="none";
document.getElementById("backbtn").style.display="none";
document.getElementById("gradingPage").style.display="block";

document.getElementById("examTitle").innerText=exam+" - Student Grading";

let inputs=document.querySelectorAll("#marksTable input");
let results=document.querySelectorAll("#marksTable td:last-child");

inputs.forEach(i=>{
i.value="";
i.disabled=false;
});

results.forEach(r=>{
r.innerText="";
r.className="";
});

document.getElementById("passPercent").innerText="0%";
document.getElementById("failCount").innerText="0";
document.getElementById("absentCount").innerText="0";

let saved=sessionStorage.getItem(exam);

if(saved){

let data=JSON.parse(saved);

inputs.forEach((i,index)=>{

i.value=data.marks[index];

let result=results[index];

if(data.marks[index]=="AB"){
result.innerText="AB";
result.className="absent";
}
else if(data.marks[index]>=55){
result.innerText="PASS";
result.className="pass";
}
else if(data.marks[index]!=""){
result.innerText="FAIL";
result.className="fail";
}

});

document.getElementById("passPercent").innerText=data.stats.passPercent;
document.getElementById("failCount").innerText=data.stats.failCount;
document.getElementById("absentCount").innerText=data.stats.absentCount;

examStats=data.stats;

}

}

function goBack(){

document.getElementById("mainPage").style.display="flex";
document.getElementById("backbtn").style.display="flex";
document.getElementById("gradingPage").style.display="none";

}

function checkEnter(e,input){

if(
!/[0-9]/.test(e.key) &&
e.key!="Backspace" &&
e.key!="Enter" &&
e.key!="Tab"
){
e.preventDefault();
}

if(e.key==="Enter"){

let mark=input.value.trim();
let row=input.parentElement.parentElement;
let resultCell=row.cells[3];

if(mark===""){

input.value="AB";
resultCell.innerText="AB";
resultCell.className="absent";

}
else{

let num=parseInt(mark);

if(num<0 || num>100){
alert("Enter marks 0 to 100 only");
input.value="";
return;
}

if(num>=55){
resultCell.innerText="PASS";
resultCell.className="pass";
}
else{
resultCell.innerText="FAIL";
resultCell.className="fail";
}

}

updateStats();

let inputs=document.querySelectorAll("#marksTable input");
let index=[...inputs].indexOf(input);

if(index+1<inputs.length){
inputs[index+1].focus();
}

}

}

function updateStats(){

let rows=document.querySelectorAll("#marksTable tr");

let pass=0;
let fail=0;
let absent=0;
let total=rows.length-1;

for(let i=1;i<rows.length;i++){

let result=rows[i].cells[3].innerText;

if(result==="PASS") pass++;
else if(result==="FAIL") fail++;
else if(result==="AB") absent++;

}

let percent=(pass/total)*100;

document.getElementById("passPercent").innerText=percent.toFixed(1)+"%";
document.getElementById("failCount").innerText=fail;
document.getElementById("absentCount").innerText=absent;

examStats={
passPercent:percent.toFixed(1)+"%",
failCount:fail,
absentCount:absent
};

}

function saveNext(){

let inputs=document.querySelectorAll("#marksTable input");

let marks=[];

inputs.forEach(i=>{
marks.push(i.value);
i.disabled=true;
});

let data={
marks:marks,
stats:examStats
};

sessionStorage.setItem(currentExam,JSON.stringify(data));

let id=currentExam.toLowerCase()+"status";

document.getElementById(id).innerText="Finished";
document.getElementById(id).className="finished";

goBack();
}
function gobackpage3() {
            location.href = "page3.html";
        }

