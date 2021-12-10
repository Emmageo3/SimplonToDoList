window.addEventListener('load',function(){
let apiKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTA1NTkxNCwiZXhwIjoxOTU0NjMxOTE0fQ.-2XaMjoQGUNkDKV0zxC67vLkbmRO0TJBWfX1FktKxK4"
let apiUrl ="https://hugjzyfkvsckcizjeztq.supabase.co"
let email = document.querySelector("#email")
let password = document.querySelector("#mdp")
let soumettre = document.querySelector('#addForm')
// Creation du client Supabase
supabase = supabase.createClient(apiUrl,apiKey)
// Reccueil informations de connexion
soumettre.onsubmit = function(e){
    e.preventDefault()
    supabase
    .from("user")
    .select()
    .eq("email",email.value)
    .eq("password",password.value)
    .then((data)=>{
        if (data.body.length == 0) {
            console.log("Login ou mot de passe incorrect");
        } else {
            console.log(data.body);
        }
    })

}
// var supabase = supabase.createClient(apiUrl,apiKey)
// supabase.auth.signIn({

// }) 
// supabase
// .from("users")
// .select()
// .then(data=>{
//     console.log(data);
// })
})