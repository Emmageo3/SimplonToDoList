window.addEventListener('load',function(){
let apiKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTA1NTkxNCwiZXhwIjoxOTU0NjMxOTE0fQ.-2XaMjoQGUNkDKV0zxC67vLkbmRO0TJBWfX1FktKxK4"
let apiUrl ="https://hugjzyfkvsckcizjeztq.supabase.co"
let email = document.querySelector("#email")
let password = document.querySelector("#mdp")
let soumettre = document.querySelector('#addForm')
let erreur = document.querySelector(".erreur")
// Creation du client Supabase
supabase = supabase.createClient(apiUrl,apiKey)
// Reccueil informations de connexion
soumettre.onsubmit = function(e){
    e.preventDefault()
    // Validation des donnees
    if (password.value =="") {
        erreur.classList.add("text-danger")
        erreur.innerHTML="Le mot de passe ne doit pas être vide";   
    }
    // traitement de la requete
    supabase
    .from("user")
    .select()
    .eq("email",email.value.toLowerCase())
    .eq("password",password.value)
    .then((data)=>{
        // email ou mot de passe invalide
        if (data.body.length == 0) {
            erreur.classList.add("text-danger")
            erreur.innerHTML="Login ou mot de passe incorrect";
        } 
        // Redirection vers la page des taches
        else {
            console.log(data.body[0].id);
            sessionStorage.setItem("email",data.body[0].email)
            sessionStorage.setItem("id",data.body[0].id)
            document.location.href="../index.html"
        }
    })


}
































































































































































const btnValider=document.querySelector('#submit')
const description=document.querySelector("#Description")
const deadline=document.querySelector("#deadline")
const etat=document.querySelector("#etat")
const priorite=document.querySelector("#priorite")
const titre=document.querySelector("#item")
const listeTache=document.querySelector("#listeTache")

//function qui permet de lister les taches
async function getTaches()
      {
        let { data: taches, error } = await supabase
                                .from('taches')
                                .select('*')
        console.log(error)
        let liste="<ul>"
        for(let tache of taches)
        {
          liste+=`<li> ${tache.id} titre: ${tache.titre} description: ${tache.description} deadline: ${tache.date} priorite: ${tache.priorite}</li>`
        }
        liste+="</ul>"
        listeTache.innerHTML+=liste
        console.log(taches)
      }

function addTask(){
    let selectValue=priorite.options[priorite.selectedIndex].value
    supabase
        .from('taches')
        .insert([
            {
               
                titre: titre.value,
                description: description.value,
                date: deadline.value,
                etat: etat.value,
                priorite: selectValue
            },
            ]).then(function(data)
                {
                    console.log(data)
                })
                alert.log("bonjour")
               
}
//fonction de suppression
async function deleteTask(id)
{
    let { data, error } = await supabase
    .from('taches')
    .delete()
    .eq('id', id)
}
async function updateTask(id)
{
    let { data, error } = await supabase
        .from('taches')
        .update({ titre:"titre modifer"})
        //.update({ titre: titre.value,description: description.value, date: deadline.value, etat:etat.value, priorite:priorite.value })
        .eq('id',id )
}
btnValider.addEventListener('click',function(e)
{
    e.preventDefault()
    addTask()
})
updateTask(1)
deleteTask(6)
getTaches()

})
