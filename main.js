const App = () =>{
    const url = 'https://api.ratesapi.io/api/latest';

    const container = document.querySelector('.container');
    let timer = 0;
    

    // Create play Variables
    const createPlayG = () => {
        /** TODO: Shuffle the variables eg. draggable with index one should appear at index 7 at game load */
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
                    /** TODO: Handle Errors */
                   // let msg = '';

                    if(checkOrder(p.children) === true){
                        /** TODO: Compute points for this order and display the results on the webpage */
                        console.log('checkOrder passed');
                        renderScore('passed', 'asc');
                    }else{
                       //msg +=' checkOrder failed ';
                       renderScore('failed', 'asc')
                    }
                    if(checkOddFirstOrder(p.children) === true){
                        /** TODO: Compute points for this order and display the results on the webpage */
                        console.log('checkOddFirstOrder passed');
                        renderScore("passed",'oddFirst');
                    }
                    else{
                        /** TODO: Compute points for this order and display the results on the webpage */
                        console.log('checkOrderFist failed!');
                        //msg += ' checkOrderFist failed!'
                        renderScore("failed",'oddFirst');
                    }
                    if(descending(p.children) === 0){
                        console.log('descending passed');
                        renderScore('passed','desc')
                    }
                    else{
                        console.log('descending failed');
                    }
                }
                
            }
            
        }

        



        /**
         * 
         * TODO: print  message function 
         */
         function renderScore(mesg, challg){
           const div = document.createElement('div');
           
            if(mesg === 'passed'){
                const message = `
                <h1>Success!</h1>
                <p> You Passed!</p>
                <br>
                <p>Elapsed Time:  seconds</p>
                <br>
                <p>Total Points: </p>
                <h2>${Points(challg)}</h2>`;
                div.innerHTML = message;
                checkChilds(div);
            }
            if(mesg === 'failed'){
                const message = `<h1>Failed!</h1>
                <p> You Failed!</p>
                <br>
                <p>Elapsed Time: </p>
                <br>
                <p>Total Points: </p>
                <h2>${Points(challg)}</h2>`;
                div.innerHTML = message;
                checkChilds(div);
            }
            let x = document.querySelector('.hide');
           // x.className = 'message';
         }
        /**
         * 
         * In the order of 1-10 (Ascending order)
         * 
         * Challenge Level 0 ordering by ascending 0-10
         */
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
                console.log('Check Order passed');
                return true;
            }
            else{
                console.log('Check Order Failed ', count);
                return false;
            }

        }

         /** Odd First Order */
        function checkOddFirstOrder(x){

            /** Arrays to store the Odd and even counts */
            let oddCount = [];
            let evenCount = [];

            for(let i = 0; i < x.length; i++){

                if(x[i].hasChildNodes() === true){

                    let j = 0;

                    if (i < 5){

                        if((parseInt(x[i].children[0].id)%2) !== 0){

                            oddCount.push(parseInt(x[i].children[0].id));

                        }
                    }
                    else if(i >= 5 && i < 10){

                        if((parseInt(x[i].children[0].id)%2) === 0){

                            evenCount.push(parseInt(x[i].children[0].id));

                        }
                    }
                }
            }

            console.log('Sorting returns ',sorted(oddCount));
            if(oddCount.length === 5 || evenCount.length === 5){
                if(sorted(oddCount) === 0 || sorted(evenCount) === 0){
                    console.log('CheckOdd Or Even Passed');
                    return true;
                }
            }
            else{
                console.log('CheckOdd Or Even Failed');
                return false;
            }
        }

        /** TODO: Even First Order */


        /** Descending Order */
        function descending(x){
            console.log(x);

            let count = 0; 
            for(let i = 0; i < x.length; i++){
                if(parseInt(x[i].children[0].id) === (x.length - i)){
                    count = count+0;
                    
                }
                else{
                    count = count + 1;
                }  
                console.log(x.length - i); 
            }



            return count;
        }
        /** TODO: Random numbers generator */
        /** TODO: Create timeout for each challenge */
        /** TODO: Create levels forthe challenges starting from the easy one to difficulty ones */

        /** Sorting Array */
        function sorted(arr){

            let count = 0;
            for(let i = 0; i < arr.length-1; i++){
                let n = arr[i];
                let a = arr[i+1];



                if(n > a){
                    count = count + 1;
                }
                else{
                    count = count + 0;
                }
            }

            return count;
        }

        /** Checking if the class messagebox contains childrens */
        function checkChilds(div){
            if(document.querySelector('.message-box').hasChildNodes() === true){
                document.querySelector('.message-box').innerHTML = '';
                document.querySelector('.message-box').removeChild[0];
                document.querySelector('.message-box').appendChild(div);
            }
        }


        /** Hides Popup Message Box */
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


        /** 
         * TODO: Expand poirts System reward Logic 
         * */
        function Points(order){
            let score = 0;

            switch(order){
                case 'asc':
                case 'desc':
                    score = 50;
                    break;
                case 'even':
                case 'odd':
                    score = 100;
                    break;
                case 'oddFirst':
                case 'evenFirst':
                    score = 200;
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

App()

