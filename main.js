

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