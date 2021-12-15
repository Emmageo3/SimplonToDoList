window.addEventListener("load",function(){
  if (this.sessionStorage.getItem("id") == null) {
    document.location.href = "connexion.html"
  } else {
  // ==================================================Fonctionnalite gestion des taches========================================//
//============================recuperation des donnees du formulaire======
    let apiKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTA1NTkxNCwiZXhwIjoxOTU0NjMxOTE0fQ.-2XaMjoQGUNkDKV0zxC67vLkbmRO0TJBWfX1FktKxK4"
    let apiUrl ="https://hugjzyfkvsckcizjeztq.supabase.co"
    valider = document.querySelector("#submit")
    const description=document.querySelector("#Description")
    const deadline=document.querySelector("#deadline")
    const etat=document.querySelector("#etat")
    const priorite=document.querySelector("#priorite")
    const titre=document.querySelector("#titre")
    const listeTache=document.querySelector("#listeTache")
    let allTask =document.querySelector("#allTask")
    let erreurSaisie = document.getElementById('erreurSaisie')
    let connected = document.querySelector(".connected-user")
    connected.textContent = sessionStorage.getItem("prenom").toUpperCase()+" "+ sessionStorage.getItem("nom").toUpperCase() 
    // Creation du client Supabase
    supabase = supabase.createClient(apiUrl,apiKey)
    //fonction d'ajout
    function addTask(){
        supabase
            .from('taches')
            .insert([
                {
                  
                    titre: titre.value,
                    description: description.value,
                    date: deadline.value,
                    etat: etat.value,
                    priorite: priorite.value,
                    idUser:sessionStorage.getItem("id")
                },
                ]).then(function(data)
                    {
                        console.log(data)
                    })

                    if (titre.value = "" || description.value == "" || date.value == "" || etat.value == "" || priorite.value == "") {
                      erreurSaisie.innerHTML = "Les champs ne doivent pas etre vides !!"
                    }
                   
                  
    }
    //fonction de lister les taches
    async function getTaches()
          {
            let { data: taches, error } = await supabase
                                    .from('taches')
                                    .select('*')
                                    .eq("idUser",sessionStorage.getItem("id"))

                                    .order('date', { ascending: true})
            console.log(error)
            for(let tache of taches){
              newTask = document.createElement('li')
              division = document.createElement('div')
              newTask.appendChild(division)
              division.innerHTML = tache.titre
              task.appendChild(newTask)
              newTask.setAttribute('class', 'newTask row')
              division.setAttribute('class', 'division align-items-center justify-content-center col-6')
              details = document.createElement('button')
              newTask.appendChild(details)
              details.setAttribute('class', 'details col-6')
              details.setAttribute('id', tache.id)
              deatailsLink = document.createElement('a')
              deatailsLink.addEventListener("click",function(e){
                e.preventDefault()
                localStorage.setItem("idTache",tache.id)
                document.location.href= "details.html"
              })
              details.appendChild(deatailsLink)
              deatailsLink.innerHTML = "Voir les détails" 
              if (tache.priorite == "forte") {
                newTask.style.border='4px solid red';
                newTask.style.color = 'black  '
                details.style.backgroundColor = 'grey'
                details.style.color = 'white'
              }

              if (tache.priorite == "moyenne") {
                newTask.style.border='4px solid orange ';
                newTask.style.color = 'black'
                details.style.backgroundColor = 'grey'
                details.style.color = 'white'
              }
              if (tache.etat == "Termine") {
                task.removeChild(newTask)
                completedTask = document.createElement('li')
                completedItems.appendChild(completedTask)
                completedTask.innerHTML = tache.titre
                completedTask.setAttribute('class', 'completedTask')
              }

              
            }
          }
    getTaches()

    

    //     //fonction de modification d'une tache
    // async function updateTask(id)
    // {
    //     let { data, error } = await supabase
    //         .from('taches')
    //         .update({ titre:"titre modifer"})
    //         //.update({ titre: titre.value,description: description.value, date: deadline.value, etat:etat.value, priorite:priorite.value })
    //         .eq('id',id )
    // }
    submit.addEventListener('click',function(){
      addTask()
      getTaches()  
    })

    
    }
    
  })

  
