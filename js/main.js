var xls = {};
var bbdd = {};

base = 9

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
        bbdd[id]["comments"]     = xls[i+8]["content"]["$t"];
        i+=base;
    }

    generateCards(bbdd);

});

function generateCards(bbdd){

  grid = document.getElementById("vendedores");

  for(seller in bbdd){

    wrapper = document.createElement("div");
    wrapper.className = "col-lg-4 col-md-6 col-sm-12"

    cardWrapper = document.createElement("div");
    cardWrapper.className = "card";

    sellerName = document.createElement("div");
    sellerName.className = "card-header";
    sellerName.innerHTML = bbdd[seller]["name"];

    cardBody = document.createElement("div");
    cardBody.className = "card-body";

    profilePicture = document.createElement("img");
    profileUrl = bbdd[seller]["profile"].replace("https://www.facebook.com/", "").replace("profile.php?id=", "");
    profileUrl = "http://graph.facebook.com/"+profileUrl+"/picture?type=large";
    profilePicture.setAttribute("src", profileUrl);
    profilePicture.className = "img-vendedor"

    reputation = document.createElement("div")

    confirmed = document.createElement("p")
    confirmed.innerHTML = "<b>Ventas confirmadas:</b> "+bbdd[id]["confirmed"];
    positive = document.createElement("p")
    positive.innerHTML = "<b>Positivas:</b> "+bbdd[id]["positive"];
    negative = document.createElement("p")
    negative.innerHTML = "<b>Negativas:</b> "+bbdd[id]["negative"];

    reputation.appendChild(confirmed)
    reputation.appendChild(positive)
    reputation.appendChild(negative)

    cardBody.appendChild(profilePicture);
    cardBody.appendChild(reputation);

    cardWrapper.appendChild(sellerName);
    cardWrapper.appendChild(cardBody);

    wrapper.appendChild(cardWrapper);

    grid.appendChild(wrapper);

  }

}