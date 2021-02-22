function App(){
    const root_date = document.createElement('div');
    const container = document.createElement('div');
    const mouse = document.createElement('div');
    const timer = document.createElement('div');
    const r_nv = document.createElement('div');
    const section = document.createElement('main');

    root_date.setAttribute('id','root-date');
    container.setAttribute('id','container');
    mouse.setAttribute('id','mouse');
    timer.setAttribute('id', 'timer');
    r_nv.setAttribute('id', 'r_nv');
    section.setAttribute('class', 'section');

    document.body.appendChild(root_date);
    document.body.appendChild(container);
    document.body.appendChild(container).appendChild(mouse);
    document.body.appendChild(container).appendChild(timer);
    document.body.appendChild(container).appendChild(r_nv);



    // TODO: Create applications from a JSON file


    document.addEventListener('DOMContentLoaded',function(){


        var date = new Date();
        const mx = document.getElementById('mouse');
        const da = document.getElementById('timer');
        const rd = document.getElementById('root-date');

        function mousePosition(mouseEvent){
            var xPos;
            var yPos;
        
            if (mouseEvent){
                xPos = mouseEvent.screenX;
                yPos = mouseEvent.screenY;
            }
        
            mx.innerHTML ="<p class=\"mmove\">"+ xPos + "  x  " + yPos+"</p>";
        }
        
        document.body.onmousemove = mousePosition;
        
        
        rd.innerHTML = '<p>'+date.getFullYear() + '/' +date.getMonth()+ '/'+date.getDate()+'<p>';
        
        
        // GET Time
        setInterval(function(){
            let date = new Date();
            da.innerHTML = (date.getHours() < 10 ? '0' : '') + date.getHours()
            +'.'+(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
            +'.'+(date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
        },1000);


        // process form dataR
        if(document.contains(document.getElementById('form_data'))){
            document.getElementById('btn').addEventListener('click', function(event){
                event.preventDefault();
               
                const from = document.getElementById('from').value.toUpperCase();
                const to = document.getElementById('to').value.toUpperCase();
                const amount = document.getElementById('amount').value;

                if(emptyCheck(from) === 0 && emptyCheck(to) === 0 && emptyCheck(amount) === 0){
                    currencyCalculator(from, to,parseInt(amount));
                }
            })
        }
        

        function emptyCheck(xz){
            var zx = 0;
            if(xz === "" || xz === 'null'){
                alert("cannot be empty or null!");
                zx = 1;
            }

            return zx;
        }
        

    })


    /*************Fetch API data************** */ 
    async function fetchData(){
        const url = 'https://api.ratesapi.io/api/latest';
    
        const response = await fetch(url);
        const data =  await response.json();
    
        const dataR = data.rates;
    
        var elems_arays = []
        
        for (let i = 0; i < Object.keys(dataR).length; i++) {
    
            elems_arays.push({
                'curr': Object.keys(dataR)[i],
                'rate': Object.values(dataR)[i]
            });
    
            
        }
        return elems_arays;
    }
    
    var d = fetchData();
    
    d.then(function(res){
    
        const s  = document.createElement('div');
        s.setAttribute('id', 'exchange');
        s.setAttribute('class', 'finance');
    
        for (let i = 0; i < res.length; i++) {
    
            const rate_con = document.createElement('div');
    
            const rate = document.createElement('p');
            const rate_r = document.createElement('p');
        
            rate_con.className = 'rate';
    
            rate.innerHTML = res[i].curr;
            rate_r.innerHTML = res[i].rate;
    
            rate_con.appendChild(rate);
            rate_con.appendChild(rate_r);
    
            s.appendChild(rate_con);
        }
        
        section.appendChild(s)
    });
    
/************* calculate currency ******************* */
    function currencyCalculator(cur, cur_2, amount){
        var res = 0;
        d.then(function(res){
            for (let i = 0; i < res.length; i++) {
                if(res[i].curr.localeCompare(cur) === 0){
                    for (let j=0; j <res.length; j++) {
                        if(res[j].curr.localeCompare(cur_2) === 0){
                            const result = document.getElementById('results');
                            res = ((parseFloat(res[j].rate)*parseFloat(amount))/parseFloat(res[i].rate));
                            //alert((Math.round((res*100))/100).toFixed(3));
                            result.innerHTML=(Math.round((res*100))/100).toFixed(3) + ' ' + cur_2;
                        }
                    }
                }
            }
        })
    
        return res;
    }
    
    
    function createForm(){
    
        const str = `
        <form id="form_data">
            <div class="elem">
                <label for="cur_1">From:</label>
                <input id="from" type="text" name="from"/>
            </div>
            <div class="elem">
                <label for="cur_1">To:</label>
                <input id="to" type="text" name="to"/>
            </div>
    
            <div class="elem">
                <label for="cur_2">Amount:</label>
                <input id="amount" type="number" name="amount"/>
            </div>
            <div class="elem">
                <input type="submit" id="btn" value="equals"/>
            </div>    
            <div class="elem">
                <label>Result:</label>
                <div id="results"></div>
            </div>

        </form>
        `;
        const sr = document.createElement('section');
        sr.setAttribute('id', 'curr_cov');
        sr.innerHTML = str;
        section.appendChild(sr);
    }
    createForm();
    section.style.height = window.innerHeight+'px';
    document.body.appendChild(section);

}


App();






