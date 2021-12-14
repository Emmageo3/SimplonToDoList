window.addEventListener("load",function(){
  //============================recuperation des donnees du formulaire======
  let apiKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTA1NTkxNCwiZXhwIjoxOTU0NjMxOTE0fQ.-2XaMjoQGUNkDKV0zxC67vLkbmRO0TJBWfX1FktKxK4"
  let apiUrl ="https://hugjzyfkvsckcizjeztq.supabase.co"
      // Creation du client Supabase
  supabase = supabase.createClient(apiUrl,apiKey)
  let supprimer = document.getElementById("supprimer")
  const title=document.querySelector("#title")
  const description=document.querySelector("#desc")
  const deadline=document.querySelector("#deadline")
  const priorite=this.document.querySelector("#priorite")
  const etat=document.querySelector("#etat")
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
          
})


