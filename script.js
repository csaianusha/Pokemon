var request = new XMLHttpRequest();
request.open('GET','https://pokeapi.co/api/v2/pokemon/?offset=50&limit=50');
request.send();

var data;

request.onload=function(){
    var userdata=JSON.parse(request.response);
    data=userdata["results"];
    
    createtable(1);

}

function createtable(a){
    document.body.innerHTML="";
    let container=document.createElement("div");
    container.setAttribute("class","container");

    let row=document.createElement("div");
    row.setAttribute("class","row");

    let col=document.createElement("div");
    col.setAttribute("class","col");

    var title=document.createElement("h3");
    title.setAttribute("class","title");
    title.innerText="Hackathon Task";

    var para=document.createElement("p");
    para.setAttribute("class","para");
    para.innerHTML="<b>Note: </b>The steps regarding how to process the API data are mentioned in the bottom of the page.";

    var table=document.createElement("table");
    table.className="table";
    var thead=document.createElement("thead");
    thead.className="thead-dark";
    var tr=document.createElement("tr");
    var th1=createele("th","ID")
    var th2=createele("th","Name")
    var th3=createele("th","Ability")
    var th4=createele("th","Moves")
    var th5=createele("th","Weight")

    tr.append(th1,th2,th3,th4,th5);
    thead.append(tr);

    var tbody=document.createElement("tbody");
    
    for(var i=((a-1)*5);i<(a*5);i++)
    {
        var tr=document.createElement("tr");
        if(i%2==0){
            tr.className = "bg-light";
        }
        getData(data[i]["url"],i+1); 
        var td1=createele("td",i+1);
        var td2=createele("td",data[i]["name"]);       
        var td3=createele("td","");
        td3.setAttribute("id","td_Ability_"+(i+1)+"");  
        var td4=createele("td","");
        td4.setAttribute("id","td_Moves_"+(i+1)+"");  
        var td5=createele("td","");
        td5.setAttribute("id","td_Weight_"+(i+1)+"");
        tr.append(td1,td2,td3,td4,td5);
        tbody.append(tr);
    }
   
    table.append(thead,tbody);
    var ul=document.createElement("ul");
    // if(a!=1){
        
    //     var li=createli("previous",a);
    //     ul.append(li);
    // }
    for (var j = 0; j < (data.length/5); j++) {
        var k=j+1;
        var li=createli(""+k+"",a);
        ul.append(li);
    }
    // if(a!=20){
    //     var li=createli("next",a);
    //     ul.append(li);
    // }



    var steps=document.createElement("p");
    steps.setAttribute("class","steps");
    steps.innerHTML="<b>Steps: </b><br/>1) The first steps was to get the first 50 pokemon names. For getting that we have call an <a href='https://pokeapi.co/api/v2/pokemon/?offset=50&limit=50' target='_blank'>API</a>."
    +"<br />2) From the above API, we have got the names of the pokemon and an URL, using which we get all the related details of that specific pokemon. eg: For 'psyduck' the url was <a href='https://pokeapi.co/api/v2/pokemon/54/' target='_blank'>URL</a>, this Url contains all the related details regarding psyduck."
    +"<br />3) From the result, we have tried to take take some of the characteristics of the pokemon i.e ability, moves and weight."
    +"<br />4) In pagination, at a time only 5 pokemons will be shown to the user.";

    col.append(title,para,table,ul,steps);
    row.append(col);
    container.append(row);
    document.body.append(container);

}


function createli(srno,activeele){
    let res = document.createElement("li");
    res.setAttribute('value', srno);
    res.innerHTML=srno;
    res.addEventListener("click",setpage); 
    if(activeele==srno){
        res.className="active";  
    }
    return res;
}

function createele(elename,value){
    let res=document.createElement(elename);
    res.innerHTML=value;
    return res;
}

function setpage(){   
    var element=this;
    var a =this.value;
    // if(element.value=="next"){
    //     a=a+1
    // }
    // if(element.value=="previous"){
    //     a=a-1
    // }
    for (const li of document.querySelectorAll("li.active")) {
        li.classList.remove("active");
      }
    createtable(a);
}

async function getData(url,id){
    try{
        let res=await fetch(url);
        let res1=await res.json();
        
        let abilities = res1["abilities"];
        var AllAbilities="";
        
        for (let i = 0; i < abilities.length; i++) {
            AllAbilities += abilities[i]["ability"]["name"]+ ", ";
        }
        document.getElementById("td_Ability_"+id+"").innerHTML=AllAbilities;


        let moves = res1["moves"];
        var AllMoves="";
        
        for (let i = 0; i < moves.length; i++) {
            AllMoves += moves[i]["move"]["name"]+ ", ";
        }
        document.getElementById("td_Moves_"+id+"").innerHTML=AllMoves;

        let weight = res1["weight"];
        document.getElementById("td_Weight_"+id+"").innerHTML=weight;
    }
    catch(error){
    console.log(error);
    }
 }