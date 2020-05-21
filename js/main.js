//Denne funksjonen sjekker om formen sin display er "display:none",
function showTaskForm(formDiv) {
    //Hvis displayet er skjult, så sett verdien av displayet til block
    if (formDiv.style.display == "") {
        formDiv.style.display = "block";
        //Hvis displayet er synlig, gjør det det til display none igjen
    } else {
        formDiv.style.display = "";
    }
}

//Ikke ferdig
function assignTask(event) {
    event.preventDefault();
   
    //Lager en assignedList i localStorage
    let assignedList = JSON.parse(localStorage.getItem("assignedList")) || [];
    //Henter HTML input fieldene
    let taskValue = document.getElementById("assign__member__form--task");
    let memberValue = document.getElementById("assign__member__form--member");

    //Definerer en variabel for "riktig oppgave", brukt senere for å linke input fieldet med en oppgave skrevet i en liste.
    let correctTask = document.getElementsByClassName("list__item__text--task");


    //Henter ut list item, der oppgaven er og der medlemmet skal tildeles
    let listDiv = document.getElementsByClassName("list__item");
    
    //Henter direkte verdier fra input fields
    let taskVal = taskValue.value;
    let memVal = memberValue.value;

    
    

    let divInfo = document.createElement('div');
    divInfo.className = "list__item__text";

    //Looper gjennom alle oppgavene, og sjekker om teksten inni matcher verdien i input fieldet
    for(let i = 0; i < correctTask.length; i++){
        //Hvis innholdet i listen er likt som verdien i input fieldet
        if(correctTask[i].innerText == taskVal){
            //Hvis det stemmer, push verdiene til localstorage arrayet
            assignedList.push({taskVal, memVal});
            //Sett assignedList til localStorage(oversikt over hvem som gjør hva)
            localStorage.setItem("assignedList", JSON.stringify(assignedList));
    
            //Hvis den spesifikke div'en i listen har verdien av taskVal, skriv deretter ut diven
            for(let i2 = 0; i2 < listDiv.length; i2++){
                if(listDiv[i2].innerText.includes(taskVal)){
                    divInfo.innerHTML += `
                    <p class="list__item__text--task">Assigned to: ${memVal}</p>`;
                    listDiv[i2].appendChild(divInfo);
                }
            }
        }
    }
}

//Funksjon for å legge til medlemmer
function addMember(event) {
    event.preventDefault();
    //Hente ut input-verdier
    let memberInput = document.getElementById("add__member__form--text");
    //Memberinputet sin verdi (navnet)
    let memberName = memberInput.value;
    //Lager en member liste i local storage
    let memberList = JSON.parse(localStorage.getItem("memberList")) || [];

    //Pusher input-verdien (altså medlemnavn) til localstorage
    memberList.push({ memberName });
    //Resetter valuen
    memberInput.value = "";
    //Setter det i memberList inne i localStorage
    localStorage.setItem("memberList", JSON.stringify(memberList));
    //Kaller på renderMembers funksjonen for å få printet ut navnet
    renderMembers();
}

function renderOptions(){
    //Henter ut localStorage
    let memberList = JSON.parse(localStorage.getItem("memberList"));
    let taskList = JSON.parse(localStorage.getItem("tasks"));
    //Henter ut select-tagsa
    let assignTaskSelect = document.getElementById("assign__member__form--task");
    let assignMemberSelect = document.getElementById("assign__member__form--member");

    for(let i = 0; i < memberList.length; i++){
        assignMemberSelect.innerHTML += `
            <option>${memberList[i].memberName}</option>
        `;
    }
    for(let i2 = 0; i2 < taskList.length; i2++){
        assignTaskSelect.innerHTML += `
            <option>${taskList[i2].task}</option>
        `;
    }
}

//Funksjon for å vise medlemmer
function renderMembers(){
    //Henter ut member list fra localstorage
    let memberList = JSON.parse(localStorage.getItem("memberList")) || [];
    //Henter outputdiv for å skrive ut verdien som blir hentet fra localstorage
    let toolbarMemberOutput = document.getElementById("toolbar__members--output");
    toolbarMemberOutput.innerHTML = "Medlemmer: ";
    //Looper gjennom å skriver ut alle member-navn som er lagret i localstorage
    for(let i = 0; i < memberList.length; i++){
        //Printer det ut
        toolbarMemberOutput.innerHTML += `${memberList[i].memberName}`;
        //Hvis telleren vår er en mindre enn lengden på hele arrayet, legg til et komma for å separere navnene
        if(i< memberList.length-1){
            toolbarMemberOutput.innerHTML += ", "
        }
    }
}

//Funksjon for å dynamisk lage nye lister
function createList(event) {
    event.preventDefault();
    //Henter ut lists fra localstorage
    let listStorage = JSON.parse(localStorage.getItem("lists")) || [];

    //Input fra bruker
    let listName = document.getElementById("add__list__form--text");


    //Pusher verdien av listenavnet til localstorage
    listStorage.push(listName.value);
    //Resetter input-verdien
    listName.value = "";
    //Legger det i localStorage
    localStorage.setItem("lists", JSON.stringify(listStorage));
    //Kaller på main funksjonen, som har en onsubmit som lagrer listen
    main();
}

//Funksjon for å legge til tasks, tar imot hvilken oppgave og en liste
function addTask(task, list) {
    let storage = JSON.parse(localStorage.getItem("tasks")) || []
    //Pusher oppgaven OG hvilken liste
    storage.push({ task: task, list: list })

    localStorage.setItem("tasks", JSON.stringify(storage))
    //Kaller på render lists funksjonen, som også tar seg av å legge til oppgaver
    renderLists();
}

function renderTasks(outputDiv, listName) {
    let storage = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let task of storage) {
        if (task.list == listName) {
            //Hoveddiv
            let newDiv = document.createElement("div");
            newDiv.className = "list__item"
            newDiv.innerHTML += '<figure class="list__item__importance dot dot--yellow"></figure>'

            //Task basert info i div
            let divInfo = document.createElement("div");
            divInfo.className = "list__item__text"
            divInfo.innerHTML += `<p class="list__item__text--date">15. mai // 08:00</p>`
            divInfo.innerHTML += `<p class="list__item__text--task">${task.task}</p>`
            
            newDiv.appendChild(divInfo)

            outputDiv.appendChild(newDiv);
        }
    }
}

function renderLists() {
    //Henter ut lists fra localstorage
    let listStorage = JSON.parse(localStorage.getItem("lists"));
    let output = document.getElementById("listOutput");
    output.innerHTML = "";

    //For hver liste i localstorage, lag nye lister
    for (let list of listStorage) {
        let newDiv = document.createElement("div")
        newDiv.className = "list";

        //lager header
        let listHeader = document.createElement("div");
        listHeader.className = "list__header";
        listHeader.innerHTML += '<img src="img/icons/album.svg" alt="an icon" class="icon"></img>'
        listHeader.innerHTML += `<h3>${list}</h3>`;
        newDiv.appendChild(listHeader);


        //Form for input av ny task, har display="none" som default.
        let inputFormDiv = document.createElement("div");
        inputFormDiv.className = "task__input__form";
        let form = document.createElement("form");
        let taskInput = document.createElement("input")
        taskInput.type = "text";
        form.appendChild(taskInput);
        let addTaskButton = document.createElement("input");
        addTaskButton.type = "submit";
        addTaskButton.value = "Add task";
        //Her kjører vi addTask funksjonen med oppgave og liste som input
        addTaskButton.onclick = function (event) {
            event.preventDefault();
            addTask(taskInput.value, list)
        }
        form.appendChild(addTaskButton)
        inputFormDiv.appendChild(form)
        newDiv.appendChild(inputFormDiv)

        //Knapp for å vise input
        let addTaskButton2 = document.createElement("button");
        addTaskButton2.onclick = function () {
            showTaskForm(inputFormDiv)
        }
        addTaskButton2.className = "list__action-btn btn btn--round btn--add"
        newDiv.appendChild(addTaskButton2);

        output.appendChild(newDiv)

        //Input av alle tasks som ligger tilknyttet til denne.
        renderTasks(newDiv, list);
    }

}



function main() {

    //Setter opp default lister
    if (!JSON.parse(localStorage.getItem("lists"))) {
        localStorage.setItem("lists", JSON.stringify(
            ["Må gjøres", "Pågår", "Ferdig"]
        ))
    }
    //Henter ut submitknappen
    let listNameSubmit = document.getElementById("add__list__form--submit");
    //Lager listen ved å kalle på createList funksjonen
    listNameSubmit.onclick = createList;
    //Denne funksjonen rendrer listene uten å måtte refreshe
    renderLists();
    //Denne funksjonen rendrer medlemmene uten å måtte refreshe
    renderMembers();

    renderOptions();
}

main();