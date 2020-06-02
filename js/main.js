var xls = {};
var bbdd = {};

base = 9

function onlyRecommended(){
    sellers = document.getElementById("vendedores").getElementsByTagName("div");
    for( i = 0; i<sellers.length; i+=7){
        console.log(sellers[i].getAttribute("filters"));
        if(sellers[i].getAttribute("filters") != "recomendado"){
            sellers[i].style.display = "none";
        }
    }
}

function showAll(){
    sellers = document.getElementById("vendedores").getElementsByTagName("div");;
    for( i = 0; i<sellers.length; i+=7){
        sellers[i].style.display = "";
    }   
}

$.getJSON( "https://spreadsheets.google.com/feeds/cells/1e3bj7TWLGciJm8A1z_x8qormEEX8XthI6urzw_xt070/1/public/full?alt=json", function( data ) {
    $.each( data, function( key, val ) {
        xls[key] = val;
    });
    xls = xls["feed"]["entry"];

    i = base
    while(xls[i]){
        id = xls[i]["content"]["$t"]
        bbdd[id] = {}
        bbdd[id]["name"]         = xls[i+1]["content"]["$t"];
        bbdd[id]["profile"]      = xls[i+2]["content"]["$t"];
        bbdd[id]["confirmed"]    = xls[i+3]["content"]["$t"];
        bbdd[id]["positive"]     = xls[i+4]["content"]["$t"];
        bbdd[id]["negative"]     = xls[i+5]["content"]["$t"];
        bbdd[id]["evidence"]     = xls[i+6]["content"]["$t"];
        bbdd[id]["work"]         = xls[i+7]["content"]["$t"];
        bbdd[id]["medal"]        = xls[i+8]["content"]["$t"];
        i+=base;
    }

    generateCards(bbdd);

});

function generateCards(bbdd){

  grid = document.getElementById("vendedores");

  for(seller in bbdd){

    wrapper = document.createElement("div");
    wrapper.className = "col-lg-4 col-md-6 col-sm-12"
    wrapper.setAttribute("filters", bbdd[seller]["medal"])

    cardWrapper = document.createElement("div");
    cardWrapper.className = "card";

    sellerName = document.createElement("div");
    sellerName.className = "card-header";
    sellerName.innerHTML = bbdd[seller]["name"];

    cardBody = document.createElement("div");
    cardBody.className = "card-body";

    pictureContainer = document.createElement("div");

    profilePicture = document.createElement("img");
    profilePicture.setAttribute("src", "media/"+seller+".png");
    profilePicture.className = "img-vendedor"

    reputation = document.createElement("div")
    reputation.className = "reputation"

    totalRep = document.createElement("p")
    totalRep.className = "seller-rep";
    rep = bbdd[seller]["positive"]*100/bbdd[seller]["confirmed"]

    totalRep.innerHTML = "<b>Reputación:</b> "+rep+"%";  

    repDesc = document.createElement("span")
    repDesc.innerHTML = "De "+bbdd[seller]["confirmed"]+" ventas, "+bbdd[seller]["positive"]+" han sido positivas y "+bbdd[seller]["negative"]+" negativas.";
    repDesc.className = "text-muted rep-desc"

    links = document.createElement("div");
    links.className = "row text-center seller-links"

    if(bbdd[seller]["work"] != "null"){
        offset = "";
    }else{
        offset = " offset-2";
    }

    facebook = document.createElement("a");
    facebook.className = "col-4"+offset;
    facebook.setAttribute("href", bbdd[seller]["profile"])
    facebook.innerHTML = "<i class='link-icon material-icons'>account_circle</i><br/><span class='link-name'>Facebook</span>";

    links.appendChild(facebook);

    if(bbdd[seller]["work"] != "null"){
        work = document.createElement("a");
        work.className = "col-4";
        work.setAttribute("href", bbdd[seller]["work"]);
        work.innerHTML = "<i class='link-icon material-icons'>camera_alt</i><br/><span class='link-name'>Galería</span>";
        links.appendChild(work);
    }

    evidence = document.createElement("a");
    evidence.className = "col-4";
    evidence.setAttribute("href", bbdd[seller]["evidence"]);
    evidence.innerHTML = "<i class='link-icon material-icons'>archive</i><br/><span class='link-name'>Evidencias</span>";
    
    links.appendChild(evidence);

    reputation.appendChild(totalRep);
    reputation.appendChild(repDesc);

    pictureContainer.appendChild(profilePicture)


    if(bbdd[seller]["medal"] == "recomendado"){
        medal = document.createElement("img");
        medal.setAttribute("src", "media/badge.svg");
        medal.setAttribute("data-toggle", "tooltip");
        medal.setAttribute("data-placement", "left");
        medal.setAttribute("title", "Este es un vendedor recomendado. Está respaldado por los admins y moderadores del grupo.");
        medal.className = "medalla";
        pictureContainer.appendChild(medal);
    }

    cardBody.appendChild(pictureContainer);
    cardBody.appendChild(reputation);
    cardBody.appendChild(links);

    cardWrapper.appendChild(sellerName);
    cardWrapper.appendChild(cardBody);

    wrapper.appendChild(cardWrapper);

    grid.appendChild(wrapper);

    }
    $(function() {
      $('[data-toggle="tooltip"]').tooltip({
        html: true
      });
    });


}