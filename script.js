var produkty = localStorage.getItem("produkty")
if (produkty === null) {
    produkty = []
}else{
produkty = JSON.parse(produkty)
}
console.log(typeof produkty)
if(document.getElementById("mejn") != null){
fetch('baza.json')
.then((response) => response.json())
.then((json) => {
for(let i = 0; i < json.length; i++){
    let div = document.createElement("div")
    let obraz = document.createElement("img")
    let nazwa = document.createElement("p")
    console.log(json[i].src)
    obraz.src = json[i].src
    div.appendChild(obraz)
    div.className = "produkt"
    nazwa.innerHTML = json[i].nazwa + "<br><br>" + json[i].cena + "<br><br>" + json[i].opis + "<br><br>" + json[i].id 
    div.appendChild(nazwa)
    let guzik = document.createElement("button")
    guzik.className = "guzik"
    guzik.innerHTML = "POLUB!"
    guzik.onclick = function(){
        console.log(typeof produkty)
        produkty.push(json[i].id)
        console.log(produkty)
        localStorage.setItem("produkty", JSON.stringify(produkty))
    }
    div.appendChild(guzik)
    document.getElementById("mejn").appendChild(div)
}

});
}
function reset(){
    produkty = []
    localStorage.setItem("produkty", JSON.stringify(produkty))
    window.location.reload()
}
function listakoszykowa(){
    let wskaznik = 0
    let total = 0
    fetch('baza.json')
.then((response) => response.json())
.then((json) => {
    produkty = localStorage.getItem("produkty")
    produkty = JSON.parse(produkty)
for(let i = 0; i < produkty.length; i++){
    for(let j = 0; j < json.length; j++){
        if(json[j].id == produkty[i]){
            wskaznik = j
        }
    }
    let div = document.createElement("div")
    let nazwa = document.createElement("p")
    let guzior = document.createElement("button")
    div.className = "produkt"
    guzior.innerHTML = "Usuń"
    guzior.className = "usuwacz"
    nazwa.innerHTML = json[wskaznik].nazwa + "<br><br>" + json[wskaznik].cena + "<br><br>" + json[wskaznik].id
    guzior.onclick = function(){
        let test = this.parentElement.childNodes[0].outerText.split("\n")
        let zamieniacz = []
        console.log(produkty)
        console.log(test[4])
        console.log(produkty.indexOf(test[4]))
        delete produkty[produkty.indexOf(test[4])]
        console.log(produkty)
        for(k = 0; k < produkty.length; k++){
            if(produkty[k]){
                zamieniacz.push(produkty[k])
            }
        }
        console.log(zamieniacz)
        localStorage.setItem("produkty", JSON.stringify(zamieniacz))
        window.location.reload()
    }
    div.appendChild(nazwa)
    div.appendChild(guzior)
    document.body.appendChild(div)
}
})

}