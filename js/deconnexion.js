window.addEventListener("load",function(){
    let deconnexion = document.querySelector("#deconnexion")
    deconnexion.addEventListener("click",()=>{
        sessionStorage.clear()
        document.location.href = "connexion.html"

    })
})