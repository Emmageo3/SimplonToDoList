window.addEventListener("load",function(){
    //============================recuperation des donnees du formulaire======
    let apiKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTA1NTkxNCwiZXhwIjoxOTU0NjMxOTE0fQ.-2XaMjoQGUNkDKV0zxC67vLkbmRO0TJBWfX1FktKxK4"
    let apiUrl ="https://hugjzyfkvsckcizjeztq.supabase.co"
        // Creation du client Supabase
    supabase = supabase.createClient(apiUrl,apiKey)

    let supprimer = document.getElementById("supprimer")
    //recuperation des donnees pour afficher le detail de la tache
    const title=document.querySelector("#title")
    const description=document.querySelector("#desc")
    const deadline=document.querySelector("#deadline")
    const priorite=this.document.querySelector("#priorite")
    const etat=document.querySelector("#etat")
    //recuperation des donnees pour la modification
    const btnValidModif=document.querySelector("#submit")
    const btnmodifier=document.querySelector(".modifier")
    const modifTitre=document.querySelector("#titre")
    const modifDescription=document.querySelector("#Description")
    const modifDeadline=document.querySelector("#modifdeadline")
    const modifEtat=document.querySelector("#modifetat")
    const modifPriorite =document.querySelector("#modifpriorite")

    
    const taskFinish =document.querySelector("#finish")

    
        // Handle delete btn
        supprimer.addEventListener("click",(e)=>{
            e.preventDefault()
            deleteTask(localStorage.getItem("idTache"))
          })
           function deleteTask(id)
              {
                 confirmDelete = window.confirm("Voulez vous vraiment supprimer?")
                 if (confirmDelete == true) {
                  supabase
                  .from('taches')
                  .delete()
                  .eq('id', id)
                  .then(()=>{
                    document.location.href= "index.html"
                  })
                 } else {
                   alert("Ok")
                 }
              }
              //affichage des details d'une tache
              async function detailstask(id)
              {
                let { data: tache, error } = await supabase
                  .from('taches')
                  .select()
                  .eq("id",id)
                  console.log(tache)
                  title.innerHTML=tache[0].titre
                  description.innerHTML=tache[0].description
                  deadline.innerHTML=tache[0].date
                  priorite.innerHTML=tache[0].priorite
                  etat.innerHTML=tache[0].etat
              }
              detailstask(localStorage.getItem("idTache"))
              console.log(localStorage.getItem("idTache"))
              console.log(detailstask(localStorage.getItem("idTache")));


              //chargement des donnees pour la modification

            async  function remplichageFormModification(id)
            {
                let { data: tache, error } = await supabase
                  .from('taches')
                  .select()
                  .eq("id",id)
                  console.log(tache)
                  modifTitre.value=tache[0].titre
                  modifDescription.value=tache[0].description
                  modifDeadline.innerHTML=tache[0].date
                  console.log(modifDeadline.value)
                  // console.log( modifDescription.textContent);
              }

              btnmodifier.addEventListener("click",function(){
                remplichageFormModification(localStorage.getItem("idTache"))
              })
              async function updateTask(id)
              {
                  let { data, error } = await supabase
                      .from('taches')
                      .update({ titre: modifTitre.value,description: modifDescription.value, date: modifDeadline.value, etat:modifEtat.value, priorite: modifPriorite.value})
                      .eq('id',id )
              }

              async function finishTask(id)
              
              {
                  let { data, error } = await supabase
                      .from('taches')
                      .update({etat:"Termine"})
                      .eq('id',id )
              }

              btnValidModif.addEventListener("click",function(){
                updateTask(localStorage.getItem("idTache"))
               
              })
              
              taskFinish.addEventListener("click",function(){
                finishTask(localStorage.getItem("idTache"))
              })




            
})

