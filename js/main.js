// ReadMore for task

let selectedDot;
let importanceMenuElements;
let selectedImportance;
let notImportant;
let veryImportant;
let important;

function addImportanceMenu(){
    
    selectedDot = this.document.querySelector('.dot');
        selectedDot.innerHTML = `
            <div class="list__item__importance__menu">
                <h5 class="list__item__importance__menu__header">Velg prioritering</h5>
                <figure class="list__item__importance__menu__dot dot--green not-important"></figure>
                <p class="list__item__importance__menu__priority not-important">Ikke viktig</p>
                <figure class="list__item__importance__menu__dot dot--yellow important"></figure>
                <p class="list__item__importance__menu__priority important" onclick=>Ganske viktig</p>
                <figure class="list__item__importance__menu__dot dot--red very-important"></figure>
                <p class="list__item__importance__menu__priority very-important">Veldig viktig</p>
            </div>
        `;

    importanceMenuElements = document.getElementsByClassName('list__item__importance__menu');
    for (var i = 0; i < importanceMenuElements.length; ++i) {
        importanceMenuElements[i].classList.add('active');
        break;
    }

    overlayElement.classList.add('active');

    notImportant = document.getElementsByClassName('not-important');
    veryImportant = document.getElementsByClassName('very-important');
    important = document.getElementsByClassName('important');

    for( i = 0; i < notImportant.length; i++){
        notImportant[i].addEventListener('click', changeImportance);
    }

    for( i = 0; i < veryImportant.length; i++){
        veryImportant[i].addEventListener('click', changeImportance);
    }
    for( i = 0; i < important.length; i++){
        important[i].addEventListener('click', changeImportance);
    }
}

function changeImportance(){

        let selectedImportanceClass = event.target.classList[1];
        let selectedDotClass = selectedDot.classList[2];

        selectedDot.classList.remove(selectedDotClass);

        if (selectedImportanceClass  === "dot--green" || selectedImportanceClass  === "not-important"){
            selectedDot.classList.add('dot--green');
            console.log("green added"); 
            
        } else if (selectedImportanceClass === "dot--yellow" || selectedImportanceClass  === "important"){
            selectedDot.classList.add('dot--yellow');
            console.log("yellow added");

        } else {
            selectedDot.classList.add('dot--red');
            console.log("red added");
        }
}
