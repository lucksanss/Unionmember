const form =
document.getElementById("applicationForm");

form.addEventListener(
"submit",
async (e)=>{

e.preventDefault();

const application = {

ic_name:
document.getElementById("ic_name").value,

discord_id:
document.getElementById("discord_id").value,

kaula_lumpur_role_ascend:
document.getElementById("kl_ascend").value === "true",

antera_role_ascend:
document.getElementById("antera_ascend").value === "true",

kaula_lumpur_ic_role:
document.getElementById("kl_ic").value === "true",

antera_ic_role:
document.getElementById("antera_ic").value === "true",

whatsapp_number:
document.getElementById("whatsapp").value,

status:"Pending"

};

const { error } =
await supabaseClient
.from("union_applications")
.insert([application]);

if(error){

alert(error.message);
return;

}

document.getElementById(
"successMessage"
).innerHTML =
"✓ Application submitted successfully. Await admin review.";

form.reset();

});// Supabase form logic here