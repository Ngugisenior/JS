const App = () =>{
    const url = 'https://api.ratesapi.io/api/latest';

    const container = document.querySelector('.container');

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

        places.forEach(place => {
            place.addEventListener('dragover', dragOver);
        });

        places.forEach(place => {
            place.addEventListener('drop', dragDrop);
        })


        function dragStart(){
            this.classList.add('dragging');
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
                    checkOrder(p.children);
                }
                
            }
            
        }


        function checkOrder(x){

            let count = 0;
            for(let i = 0; i < x.length; i++){

                if(x[i].hasChildNodes() === true){

                    if(parseInt(x[i].children[0].id) === (i+1)){

                        count++;
                    }
                    
                    
                }
            }

            if(count === 10){
                alert('Game Over! <br> You Passed !');
            }
            else{
                alert('Game Over! <br> You Failed !');
            }
        }

    }
     /** Start By Calling the Drag Event */
    drag();



}

App();