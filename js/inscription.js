window.addEventListener('load',function(){
    let apiKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTA1NTkxNCwiZXhwIjoxOTU0NjMxOTE0fQ.-2XaMjoQGUNkDKV0zxC67vLkbmRO0TJBWfX1FktKxK4"
    let apiUrl ="https://hugjzyfkvsckcizjeztq.supabase.co"
    // Creation du client Supabase
    supabase = supabase.createClient(apiUrl,apiKey)
    // ==================================================Fonctionnalite Ajouter un Utilisateur========================================//
        // Reccueil des donnees entrees
        let addUserForm = document.querySelector("#addUserForm")
        let prenom =document.querySelector("#prenom")
        let nom = document.querySelector("#nom")
        let email = document.querySelector("#email")
        let mdp = document.querySelector("#mdp")
        let confirmMdp = this.document.querySelector("#confirmMdp")
        let erreur = this.document.querySelector(".erreur")
        // Soumission du formulaire 
        addUserForm.addEventListener("submit",(e)=>{
            e.preventDefault()
            if (prenom.value =="") {
                erreur.textContent ="Le prénom ne doit pas être vide \n"
            }
            else if (nom.value =="") {
                erreur.textContent ="Le nom ne doit pas être vide \n"
            }
            else if (email.value =="") {
                erreur.textContent ="L'email ne doit pas être vide \n"
            }
            else if (mdp.value.length<6) {
                erreur.textContent ="Le mot de passe est trop court \n"
            }
            else if (mdp.value != confirmMdp.value) {
                erreur.textContent ="Les mots passe ne sont pas les mêmes \n"
            }
            else{
                supabase
                .from("user")
                .select()
                .eq("email",email.value.toLowerCase())
                .then((data)=>{
                    // Si l'email n'existe pas dans la base
                    if (data.body.length == 0) {
                        supabase
                        .from("user")
                        .insert({email:email.value.toLowerCase(),
                                password:mdp.value.toLowerCase(),
                                prenom:prenom.value.toLowerCase(),
                                nom:nom.value.toLowerCase()
                        })
                        .then((data)=>{
                        console.log(data.body[0].id);
                        sessionStorage.setItem("email",data.body[0].email)
                        sessionStorage.setItem("id",data.body[0].id)
                        document.location.href="../connexion.html"
                        })
                    } 
                    // si l'email existe deja
                    else {
                        erreur.textContent ="L'email existe déjà \n"
                    }
                })

            }
        })
    })