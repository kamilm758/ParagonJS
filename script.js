class Produkt{
    constructor(lp,nazwa,ilosc,cena){
        this.lp=lp;
        this.nazwa=nazwa;
        this.ilosc=ilosc;
        this.cena=cena;
        this.suma=cena*ilosc;
    }
}
var licznik=1;
var ListaProduktow =[];
ListaProduktow.push("jeden"); //aby indeksowanie od 1

function dodaj_produkt() {
    let parent = document.getElementById("parent");
    let nazwa = document.getElementById("nazwa_produktu").value;
    let ilosc =parseFloat(document.getElementById("ilosc_produktu").value);
    let cena = parseFloat(document.getElementById("cena_produktu").value);
    ListaProduktow.push(new Produkt(licznik,nazwa,ilosc,cena));
    //tworzenie węzłów
    let textLp = document.createTextNode(licznik);
    let textName = document.createTextNode(ListaProduktow[licznik].nazwa);
    let textIlosc = document.createTextNode(ListaProduktow[licznik].ilosc);
    let textCena = document.createTextNode(ListaProduktow[licznik].cena);
    let textSuma = document.createTextNode(ListaProduktow[licznik].suma);
    let tdLp = document.createElement("td");
    tdLp.setAttribute("id","Lp"+licznik);
    tdLp.appendChild(textLp);
    let tdName = document.createElement("td");
    tdName.setAttribute("id","Name"+licznik);
    tdName.setAttribute("onclick","edycjaName(this)");
    tdName.appendChild(textName);
    let tdIlosc = document.createElement("td");
    tdIlosc.setAttribute("id","Ilosc"+licznik);
    //tu zmiana
    tdIlosc.setAttribute('onclick','edycjaName(this)')
    tdIlosc.appendChild(textIlosc);
    let tdCena = document.createElement("td");
    tdCena.setAttribute("id","Cena"+licznik);
    tdCena.setAttribute('onclick','edycjaName(this)')
    tdCena.appendChild(textCena);
    let tdSuma = document.createElement("td");
    tdSuma.setAttribute("id","Suma"+licznik);
    tdSuma.appendChild(textSuma);
    let tr = document.createElement("tr");
    tr.appendChild(tdLp);
    tr.appendChild(tdName);
    tr.appendChild(tdIlosc);
    tr.appendChild(tdCena);
    tr.appendChild(tdSuma);
    tr.setAttribute('id',licznik);
    parent.appendChild(tr);
    licznik++;
    let sumaCalkowita=0
    for(let i=1;i<ListaProduktow.length;i++){
        sumaCalkowita+=parseFloat(ListaProduktow[i].suma);
    }
    document.getElementById("razem").innerHTML=sumaCalkowita+" zł";
}

function edycjaName(el) {
    let input = document.createElement("input");
    input.type = "text";
    input.style.width = "70px";
    input.value = el.textContent;
    input.setAttribute('id', el.id);
    input.setAttribute('class', 'do_zamiany');
    input.setAttribute("onkeypress","return enter(event)")
    el.parentNode.replaceChild(input, el);
}

function enter(e) {
    if (e.keyCode == 13) {
        let do_zamiany =document.getElementsByClassName("do_zamiany");
        for(let i=0;i<do_zamiany.length;i++){
            let td = document.createElement("td");
            let text = document.createTextNode(do_zamiany[i].value);
            td.appendChild(text);
            td.setAttribute('id',do_zamiany[i].id);
            td.setAttribute('onclick','edycjaName(this)');
            switch (do_zamiany[i].id) {
                case "Name"+do_zamiany[i].parentElement.id:
                    ListaProduktow[parseInt(do_zamiany[i].parentElement.id)].nazwa=do_zamiany[i].value;
                    break;
                case "Ilosc"+do_zamiany[i].parentElement.id:
                    ListaProduktow[parseInt(do_zamiany[i].parentElement.id)].ilosc=parseFloat(do_zamiany[i].value);
                    przelicz_sumy(do_zamiany[i].parentElement.id);
                    break;
                case "Cena"+do_zamiany[i].parentElement.id:
                    ListaProduktow[parseInt(do_zamiany[i].parentElement.id)].cena=parseFloat(do_zamiany[i].value);
                    przelicz_sumy(do_zamiany[i].parentElement.id);
                    break;

            }
            do_zamiany[i].parentNode.replaceChild(td,do_zamiany[i]);
        }
    }
}

function przelicz_sumy(id){
    id = parseInt(id);
    let sumaCalkowita=0;
    ListaProduktow[id].suma=ListaProduktow[id].ilosc*ListaProduktow[id].cena;
    document.getElementById("Suma"+id).innerHTML=ListaProduktow[id].suma;
    for(let i=1;i<ListaProduktow.length;i++){
        sumaCalkowita+=parseFloat(ListaProduktow[i].suma);
    }
    document.getElementById("razem").innerHTML=sumaCalkowita+" zł";
}