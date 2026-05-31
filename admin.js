if(localStorage.getItem("adminLoggedIn") !== "true"){
window.location.href = "login.html";
}

async function loadApplications(){

const { data, error } =
await supabaseClient
.from("union_applications")
.select("*")
.order("submission_date",{ascending:false});

if(error){
console.log(error);
return;
}

document.getElementById("totalApplications").innerText =
data.length;

document.getElementById("pendingApplications").innerText =
data.filter(x=>x.status==="Pending").length;

document.getElementById("approvedApplications").innerText =
data.filter(x=>x.status==="Approved").length;

document.getElementById("rejectedApplications").innerText =
data.filter(x=>x.status==="Rejected").length;

const tbody =
document.getElementById("applicationsTable");

tbody.innerHTML="";

data.forEach(app=>{

tbody.innerHTML += `

<tr>

<td>${app.ic_name}</td>

<td>${app.discord_id}</td>

<td>${app.kaula_lumpur_role_ascend ? "✅" : "❌"}</td>

<td>${app.antera_role_ascend ? "✅" : "❌"}</td>

<td>${app.kaula_lumpur_ic_role ? "✅" : "❌"}</td>

<td>${app.antera_ic_role ? "✅" : "❌"}</td>

<td>${app.whatsapp_number || "-"}</td>

<td>${app.status}</td>

<td>

<button
class="action-btn approve"
onclick="approveApplication(${app.id})">
Approve
</button>

<button
class="action-btn reject"
onclick="rejectApplication(${app.id})">
Reject
</button>

<button
class="action-btn delete"
onclick="deleteApplication(${app.id})">
Delete
</button>

</td>

</tr>

`;

});

}

async function approveApplication(id){

await supabaseClient
.from("union_applications")
.update({status:"Approved"})
.eq("id",id);

await addAuditLog(
"Approved",
id
);

loadApplications();

}

async function rejectApplication(id){

await supabaseClient
.from("union_applications")
.update({status:"Rejected"})
.eq("id",id);

await addAuditLog(
"Rejected",
id
);

loadApplications();

}

async function deleteApplication(id){

await supabaseClient
.from("union_applications")
.delete()
.eq("id",id);

await addAuditLog(
"Deleted",
id
);

loadApplications();

}

async function addAuditLog(action,id){

await supabaseClient
.from("audit_logs")
.insert([{

action:action,
target_id:id,
admin_name:"unionadmin"

}]);

}

function logout(){

localStorage.removeItem(
"adminLoggedIn"
);

window.location.href =
"login.html";

}

function exportCSV(){

let csv = [];

const rows =
document.querySelectorAll("table tr");

rows.forEach(row=>{

const cols =
row.querySelectorAll("td,th");

const rowData =
[];

cols.forEach(col=>{

rowData.push(
col.innerText
);

});

csv.push(
rowData.join(",")
);

});

const csvFile =
new Blob([csv.join("\n")],{
type:"text/csv"
});

const link =
document.createElement("a");

link.download =
"applications.csv";

link.href =
URL.createObjectURL(csvFile);

link.click();

}

loadApplications();

document
.getElementById("search")
.addEventListener(
"input",
function(){

const search =
this.value.toLowerCase();

const rows =
document.querySelectorAll(
"#applicationsTable tr"
);

rows.forEach(row=>{

row.style.display =
row.innerText
.toLowerCase()
.includes(search)
? ""
: "none";

});

}
);// Admin dashboard logic here