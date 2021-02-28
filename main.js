const App = () =>{
    const url = 'https://api.ratesapi.io/api/latest';

    const container = document.querySelector('.container');
    let timer = 0;
    

    // Create play Variables
    const createPlayG = () => {
        const d = document.createElement('div');
        d.setAttribute('class', 'inner_container');
        for (let i = 1; i < 11; i++) {
            let dv = document.createElement('div');
            dv.setAttribute('class', 'holder');
            let x = document.createElement('div');
            let t = document.createTextNode(i);
            x.className = 'number';
            x.setAttribute('id', i);
            x.setAttribute('draggable', 'true');
            x.appendChild(t);
            dv.appendChild(x)
            d.appendChild(dv)
        }

        container.appendChild(d);
    }
    //create place holder after drag
    const createPlayPlace = () => {
        const div = document.createElement('div');
        div.setAttribute('class', 'play_container');

        for (let i = 1; i < 11; i++) {
            let x = document.createElement('div');
            x.setAttribute('class', 'place');
            div.appendChild(x);
        }

        container.appendChild(div);
        const btn = document.createElement('button');
        const t = document.createTextNode('Reset');
        btn.setAttribute('class', 'reset');

        btn.appendChild(t);
        btn.addEventListener('click', resetGame);
        container.appendChild(btn);
    }

    //drag function
    const drag = () => {
        createPlayG();
        createPlayPlace();


        const numbers = document.querySelectorAll('.number');
        const places = document.querySelectorAll('.place');

        numbers.forEach(number => {
            number.addEventListener('dragstart', dragStart);
        });

        numbers.forEach(number => {
            number.addEventListener('dragend', dragEnd);
        });

        numbers.forEach(number => {
            number.addEventListener('dragover', dragOver);
        });

        places.forEach(place => {
            place.addEventListener('dragover', dragOver);
        });

        places.forEach(place => {
            place.addEventListener('drop', dragDrop);
        })


        function dragStart(){
            this.classList.add('dragging');
            timer = new Date();
        };


        function dragEnd(){
            this.classList.remove('dragging');
        }

        function dragOver(e){
            e.preventDefault();
        }

        function dragDrop(){

            let counter = 0;

            const x = document.querySelector('.inner_container');
            const p = document.querySelector('.play_container');

            if(this.hasChildNodes() === true){

                for(let r = 0 ; r < x.children.length; r++){
                    if(x.children[r].hasChildNodes() === false){

                       x.children[r].appendChild(this.childNodes[0]);
                       break;
                        
                    }
                }

                this.appendChild(document.querySelector('.dragging'));
            }
            else{
                this.appendChild(document.querySelector('.dragging'));
            }

            for(let j = 0; j <x.children.length; j++){

                if(x.children[j].hasChildNodes() === false){
                    counter=counter;
                }
            }


            if(counter === 0){
                let count = 0;
                for(let i = 0; i < p.children.length; i++){
                    if(p.children[i].hasChildNodes() === true){
                        count++;
                    }
                }

                if(count === 10){
                    const dat = parseInt(Math.abs(new Date() - new Date(timer))/60);
                    console.log(parseInt(dat));
                    checkOrder(p.children,dat);
                }
                
            }
            
        }

        

        function checkOrder(x, tm){

            let count = 0;
            for(let i = 0; i < x.length; i++){

                if(x[i].hasChildNodes() === true){

                    if(parseInt(x[i].children[0].id) === (i+1)){

                        count++;
                    }
                    
                }
            }

            const div = document.createElement('div');
            if(count === 10){
                const message = `
                <h1>Success!</h1>
                <p> You Passed!</p>
                <br>
                <p>Elapsed Time: ${tm} seconds</p>
                <br>
                <p>Total Points: </p>
                <h2>${Points("even")}</h2>`;
                div.innerHTML = message;
                checkChilds(div);
            }
            else{
                const message = `<h1>Failed!</h1>
                <p> You Failed!</p>
                <br>
                <p>Elapsed Time: ${tm}</p>
                <br>
                <p>Total Points: </p>
                <h2>${Points("even")}</h2>`;
                div.innerHTML = message;
                checkChilds(div);
            }
            document.querySelector('.hide').className = 'message';
        }

        /** Checking if the class messagebox contains childrens */
        function checkChilds(div){
            if(document.querySelector('.message-box').hasChildNodes() === true){
                document.querySelector('.message-box').innerHTML = '';
                document.querySelector('.message-box').removeChild[0];
                document.querySelector('.message-box').appendChild(div);
            }
        }


        (function hidePopup(){
            const x = document.querySelector('.btn');

            x.addEventListener('click', (e) => {
                e.preventDefault();
                if(document.querySelector('.message') !== undefined && document.querySelector('.message') !== null){
                    const y = document.querySelector('.message');
                    y.className = 'hide';
                }
               
            })
        })();


        function Points(order){
            let score = 0;

            switch(order){
                case 'even':
                case 'odd':
                    score = 100;
                    break;

                case 'fail':
                    score = 0;
                default:;
            }

            return score;

        }



    } 

    //ResetGame
    const resetGame = () =>{
            const play_g = document.querySelector('.container');
            play_g.innerHTML = '';
            drag();
    }
     /** Start By Calling the Drag Event */
    drag();
   



}

function startTimer(duration){
    //var duration = 60 *5;
    const rd = document.querySelector('.timer');
    var timer = duration, minutes, seconds, p;
    setInterval(() =>{
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

       
        rd.innerHTML =  minutes + ":" + seconds;

        if(--timer < 0){    
            timer = duration;
        }
    }, 1000);

}

