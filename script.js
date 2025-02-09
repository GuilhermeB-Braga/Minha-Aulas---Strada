const listaAulas = document.querySelectorAll(".aula")
let aulasStatus = JSON.parse(localStorage.getItem("aulasStatus")) || []
const concluidos = ((aulasStatus.filter(aulasStatus => aulasStatus.status)).length / aulasStatus.length) * 100
const pendentes = ((aulasStatus.filter(aulasStatus => aulasStatus.status == false)).length / aulasStatus.length) * 100


progress()

listaAulas.forEach((aula, key) => {

    let status = false

    aulasStatus.push({key: key, status: status})
    const viewStatus = aula.querySelector(".status")

    if(aulasStatus[key].status){
        aula.classList.add("checked")
        viewStatus.textContent = "Concluido"

    }

    aula.addEventListener("click", (event)=>{

        const currentTarget =  event.currentTarget
        
        if(!status){

            status = true
            currentTarget.classList.add("checked")
            viewStatus.textContent = "Concluido"

        }else{

            status = false
            currentTarget.classList.remove("checked")
            viewStatus.textContent = "Pendente"
        }

        aulasStatus = aulasStatus.slice(0, 8)
        
        aulasStatus[key].status = status

        localStorage.removeItem("aulasStatus")

        localStorage.setItem("aulasStatus", JSON.stringify(aulasStatus))
        progress()

        clickEffect()
        
    })


})

function progress(){
    const progress = document.querySelector(".progress")
    const concluidos = ((aulasStatus.filter(aulasStatus => aulasStatus.status)).length / aulasStatus.length) * 100
    const pendentes = ((aulasStatus.filter(aulasStatus => aulasStatus.status == false)).length / aulasStatus.length) * 100
    const data = document.querySelector(".data")

    data.textContent = aulasStatus.filter(aulasStatus => aulasStatus.status).length + "/" + aulasStatus.length
    
    progress.style.width = concluidos + "%"
    progress.textContent = concluidos + "%"

    if(progress.textContent == "100%"){
        congratulations()
    }
    
}

function congratulations(){
    const confetes = document.querySelector(".congratulations")
    const tada = document.querySelector("#tada")

    
    confetes.classList.remove("hidden")

    setTimeout(()=>{
        confetes.classList.add("hidden")
    }, 3000)
    
    tada.play(15)
    
}

function clickEffect(){
    navigator.vibrate(15)
}