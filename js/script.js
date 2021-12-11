window.addEventListener('load',function(){
    let apiKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTA1NTkxNCwiZXhwIjoxOTU0NjMxOTE0fQ.-2XaMjoQGUNkDKV0zxC67vLkbmRO0TJBWfX1FktKxK4"
    let apiUrl ="https://hugjzyfkvsckcizjeztq.supabase.co"
    let email = document.querySelector("#email")
    let password = document.querySelector("#mdp")
    let soumettre = document.querySelector('#addForm')
    let erreur = document.querySelector(".erreur")
    // Creation du client Supabase
    supabase = supabase.createClient(apiUrl,apiKey)
    // ==================================================Reccueil informations de connexion========================================//
    soumettre.onsubmit = function(e){
        e.preventDefault()
        // Validation des donnees
        if (password.value =="") {
            erreur.classList.add("text-danger")
            erreur.innerHTML="Le mot de passe ne doit pas être vide";   
        }else{
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
                window.location.href="index.html"
            }
        })
        }
    }
}
})
    // ==================================================Fonctionnalite Ajouter un Utilisateur========================================//
        //Reccueil des donnees entrees
        let addUserForm = document.querySelector("#addUserForm")
        let prenom =document.querySelector("#prenom")
        let nom = document.querySelector("#nom")
        let newEmail = document.querySelector("#newEmail")
        let newMdp = document.querySelector("#newMdp")
        let confirmMdp = this.document.querySelector("#confirmMdp")
        addUserForm.addEventListener("submit",(e)=>{
            e.preventDefault()
            alert("formulaire soumis")
        })
    })
