let rows = document.getElementsByClassName("infobox vcard")[0].rows;

let profile = {};

profile["Division"] = "Makuuchi";

for (var i = 0; i<rows.length;i++){
    var r = rows[i];
    var header_HTML = r.firstChild.innerHTML;
    var header_text = r.firstChild.textContent;

    if (i == 0){
        var n = header_HTML.split("<br>");
        profile["Name"] = n[0];
        

        if (n[1] == null){
            var kanji = rows[1].innerText;
            profile["Kanji"] = rows[1].innerText;
            console.log("Name: " + n[0] + " - " + kanji);
        } else {
            profile["Kanji"] = n[1];
            console.log("Name: " + n[0] + " - " + n[1]);
        }

        var sumoKey = n[0].split(" ").join('_');
        profile["Key"] = sumoKey;
        console.log("Name key: " + sumoKey);
        

    } else if (header_text === "Born"){
        var bio = r.cells[1].innerText.split("\n");
        var birthName = bio[0];
        var birthPlace = bio[2];

        var child_nodes = r.cells[1].children;
        var birthday = child_nodes[1].innerText.trim().split('(').join('').split(')').join('');
        
        profile["Birthday"] = birthday + "T14:00:00.000+00:00";
        profile["BirthName"] = birthName;
        profile["BirthPlace"] = birthPlace;

        console.log("birthday: " + birthday);
        console.log("birth name: " + birthName);
        console.log("birth place: " + birthPlace);

    } else if (header_text === "Height"){
        var height = r.cells[1].innerHTML.split('&')[0];
        profile["Height"] = height;
        profile["ImperialHeight"] = toFeet(parseInt(height));
        console.log("Height: " + height + "cm | " + toFeet(parseInt(height)));

    } else if (header_text === "Weight"){
        var weight = r.cells[1].innerHTML.split('&')[0];
        profile["Weight"] = weight;
        profile["ImperialWeight"] = Math.round(parseInt(weight)* 2.20462).toString();
        console.log("Weight: " + weight + "kg | " + Math.round(parseInt(weight)* 2.20462).toString() + " lbs");

    } else if (header_text === "Stable"){
        var stable = r.cells[1].innerText.split(" ").pop();
        console.log(stable);

    } else if (header_text === "Debut"){
        var debut = r.cells[1].innerText;
        console.log(debut);
        profile["Debut"] = debut;

    } else if (header_text === "Championships"){
        var chips = r.cells[1].innerText.split("\n");
        let yushoDict = {};

        for (var j = 0; j < chips.length; j++){
            var params = chips[j].split(" ");
            params[1] = params[1].trim()
            var division = params[1].slice(1,params[1].length -1);

            yushoDict[division] = parseInt(params[0].trim());
            

            // if (division === "Makuuchi"){
            //     profile["Yusho1"] = parseInt(params[0].trim());
            // } else if (params[1].trim() === "(Juryo)"){
            //     profile["Yusho2"] = parseInt(params[0].trim());
            // } else if (params[1].trim() === "(Makushita)"){
            //     profile["Yusho3"] = parseInt(params[0].trim());
            // } else if (params[1].trim() === "(Sandanme)"){
            //     profile["Yusho4"] = parseInt(params[0].trim());
            // } else if (params[1].trim() === "(Jonidan)"){
            //     profile["Yusho5"] = parseInt(params[0].trim());
            // } else if (params[1].trim() === "(Jonokuchi)"){
            //     profile["Yusho6"] = parseInt(params[0].trim());
            // }

        }
        profile["Championships"] = yushoDict;
        console.log(yushoDict);

    } else if (header_text === "Special Prizes"){
        var prizes = r.cells[1].innerText.split("\n");
        var prizeDict = {} 
        for (var j = 0; j < prizes.length; j++){
            var params = prizes[j].split("(");
            prizeDict[params[0].trim()] = parseInt(params[1].trim()[0]);
        }
        console.log(prizeDict);
        profile["Prizes"] = prizeDict;
    } else if (header_text === "Gold Stars"){
        var kinboshi = parseInt(r.cells[1].innerText.split(" ")[0]);
        console.log(kinboshi);
        profile["Kinboshi"] = kinboshi;
    }
}

console.log(JSON.stringify(profile));




//https://stackoverflow.com/questions/39996125/convert-heightcentimeter-to-feetinches-using-javascript
function toFeet(n) {
    var realFeet = ((n*0.393700) / 12);
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + "'" + inches;
  }
