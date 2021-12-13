window.addEventListener("load",function(){
  if (this.sessionStorage.getItem("id") == null) {
    document.location.href = "../connexion.html"
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
                    priorite: priorite.value
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
              details.innerHTML = "Voir les détails"
              newTask.appendChild(details)
              details.setAttribute('class', 'details col-6')
              details.setAttribute('id', 'details')
              if (tache.priorite == "forte") {
                newTask.style.backgroundColor='red';
                newTask.style.color = 'black  '
                details.style.backgroundColor = 'white'
                details.style.color = 'black'
              }

              if (tache.priorite == "moyenne") {
                newTask.style.backgroundColor='orange';
                newTask.style.color = 'black'
                details.style.backgroundColor = 'white'
                details.style.color = 'black'
              }
            }
            
          }
    getTaches()


          async function deleteTask(id)
        {
            let { data, error } = await supabase
            .from('taches')
            .delete()
            .eq('id', id)
        }
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