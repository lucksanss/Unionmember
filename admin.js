async function loadApplications(){

const { data } =
await supabaseClient
.from("union_applications")
.select("*")
.order("submission_date",{ascending:false});

document.getElementById("total").innerText =
data.length;

document.getElementById("pending").innerText =
data.filter(x=>x.status==="Pending").length;

document.getElementById("approved").innerText =
data.filter(x=>x.status==="Approved").length;

document.getElementById("rejected").innerText =
data.filter(x=>x.status==="Rejected").length;

const tbody =
document.getElementById("applications");

tbody.innerHTML="";

data.forEach(app=>{

tbody.innerHTML += `
<tr>

<td>${app.ic_name}</td>

<td>${app.discord_id}</td>

<td>${app.kaula_lumpur_role_ascend ? "✅ Yes" : "❌ No"}</td>

<td>${app.antera_role_ascend ? "✅ Yes" : "❌ No"}</td>

<td>${app.kaula_lumpur_ic_role ? "✅ Yes" : "❌ No"}</td>

<td>${app.antera_ic_role ? "✅ Yes" : "❌ No"}</td>

<td>${app.whatsapp_number || "-"}</td>

<td>${app.status}</td>

<td>
<button onclick="approve(${app.id})">Approve</button>
<button onclick="reject(${app.id})">Reject</button>
<button onclick="removeApp(${app.id})">Delete</button>
</td>

</tr>
`;

});
}

async function approve(id){

await supabaseClient
.from("union_applications")
.update({status:"Approved"})
.eq("id",id);

loadApplications();
}

async function reject(id){

await supabaseClient
.from("union_applications")
.update({status:"Rejected"})
.eq("id",id);

loadApplications();
}

async function removeApp(id){

await supabaseClient
.from("union_applications")
.delete()
.eq("id",id);

loadApplications();
}

loadApplications();

supabaseClient
.channel("applications")
.on(
"postgres_changes",
{
event:"*",
schema:"public",
table:"union_applications"
},
loadApplications
)
.subscribe();