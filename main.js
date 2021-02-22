function App(){
    const root_date = document.createElement('div');
    const container = document.createElement('div');
    const mouse = document.createElement('div');
    const timer = document.createElement('div');
    const r_nv = document.createElement('div');

    root_date.setAttribute('id','root-date');
    container.setAttribute('id','container');
    mouse.setAttribute('id','mouse');
    timer.setAttribute('id', 'timer');
    r_nv.setAttribute('id', 'r_nv');

    document.body.appendChild(root_date);
    document.body.appendChild(container);
    document.body.appendChild(container).appendChild(mouse);
    document.body.appendChild(container).appendChild(timer);
    document.body.appendChild(container).appendChild(r_nv);

}


App();


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
    
    
    
    function getTime(){
            let date = new Date();
            da.innerHTML = (date.getHours() < 10 ? '0' : '') + date.getHours()
            +'.'+(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
            +'.'+(date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    
    }
    
    setInterval(function(){
        getTime();
    },1000);

})


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
    s.style.height = window.innerHeight+'px';
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
    
    document.body.appendChild(s);
});


function currencyCalculator(){
    const cur = 'GBP';
    const cur_2 = 'CZK';
    //console.log(cur);

    d.then(function(res){
        for (let i = 0; i < res.length; i++) {
            if(res[i].curr.localeCompare(cur) === 0){
                for (let j=0; j <res.length; j++) {
                    if(res[j].curr.localeCompare(cur_2) === 0){
                        return (parseFloat(res[j].rate) * parseFloat(res[i].rate));
                    }
                }
            }
        }
    })
}


function createForm(){

    const str = `
    <form>
        <div class="mgn">
            <div>
                <label for="cur_1">From:</label>
                <input type="text" name="from"/>
            </div>
            <div>
                <label for="cur_1">To:</label>
                <input type="text" name="to"/>
            </div>
        </div>
        <div class="mgn">
            <div>
                <label for="cur_2">Amount:</label>
                <input type="number" name="amount"/>
            </div>
            <div class="result"></div>
        </div>
        <div>
        <input type="submit" value="="/>
        </div>
    </form>
    `;
    const sr = document.createElement('section');
    sr.setAttribute('id', 'curr_cov');
    sr.style.height = window.innerHeight+'px';
    sr.innerHTML = str;
    document.body.appendChild(sr);
}

createForm();
currencyCalculator();