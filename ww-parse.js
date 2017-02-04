var exports = module.exports = {};
var fs = require('fs');
var roles = require('./rolesformatter.js');
var parsedgame = [];
var players = [];
var origplayers = [];
var shiftername = '';

//Add zeros to dates under 10
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


exports.creategame = function (mongame, resolveCallback, rejectCallback) {
    //empty exisiting game
    parsedgame = [];
    players = [];
    origplayers = players;
    resulttable = '';
    protectortarget = '';
    daycount = 1;


    //console.log(origplayers);

        for (var elem of mongame) {

          //constructor function
          function NewElement(id,origname,charname,message,format,time){
              this.id       = id
              this.origname = origname
              this.charname = charname
              this.message  = message
              this.format   = format
              this.time     = time

          }

            var weekday = '';
            var date = new Date(parseInt(elem.TimeStamp.substr(6)));
            stunden = addZero(date.getHours());
            minuten = addZero(date.getMinutes());
            sekunden = addZero(date.getSeconds());
            day = date.getDay();
            switch (day) {
                case "0":
                    weekday = "Mon";
                    break;
                case "1":
                    weekday = "Tue";
                    break;
                case "2":
                    weekday = "Wed";
                    break;
                case "3":
                    weekday = "Thu";
                    break;
                case "4":
                    weekday = "Fri";
                    break;
                case "5":
                    weekday = "Sat";
                    break;
                case "6":
                    weekday = "Sun";
                    break;
            }

            if (elem.__type == "Werewolf.GameEngine.Core.NewIdentityAssignedEvent, Werewolf.GameEngine") {
                players[elem.OriginalName] = elem.NewName;
            }

            //Create player list
            if (elem.__type == "Werewolf.GameEngine.Core.NewIdentityAssignedEvent, Werewolf.GameEngine") {
                players[elem.OriginalName] = elem.NewName;
            }

            //account for legacy shapeshifts
            if (elem.__type == "Werewolf.GameEngine.Roles.Werewolves.Shapeshifter.IdentitySwappedByShapeshifterEvent, Werewolf.GameEngine") {
                if (players[elem.OriginalName] != players[elem.NewName]) {
                    var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.OriginalName] + ' shifted into ' + players[elem.NewName],roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
                    parsedgame.push(insertelement);

                    console.log('Found Shapeshift');
                    //swapping names
                    console.log('Swap ' + players[elem.OriginalName] + ' with ' + players[elem.NewName]);
                    shiftername = players[elem.OriginalName]
                    players[elem.OriginalName] = players[elem.NewName];

                }
                else {
                    console.log('Swap ' + players[elem.OriginalName] + ' with ' + shiftername);
                    players[elem.OriginalName] = shiftername;
                    shiftername = '';
                }
            }
            //account for shapeshifts
            if (elem.__type == "Werewolf.GameEngine.Roles.Werewolves.Shapeshifter.ShapeshifterSwappedPlayerIdentities, Werewolf.GameEngine") {
                var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.FirstPlayer] + ' was shapeshifted by  ' + players[elem.SecondPlayer],roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
                parsedgame.push(insertelement);
                console.log('Found Shapeshift');
                //swapping names
                console.log('Swap ' + players[elem.FirstPlayer] + ' with ' + players[elem.SecondPlayer]);
                wswapname1 = players[elem.FirstPlayer];
                wswapname2 = players[elem.SecondPlayer];
                console.log(wswapname1 + ' is now ' + wswapname2);
                players[elem.FirstPlayer] = players[elem.SecondPlayer];
                console.log(wswapname2 + ' is now ' + wswapname1);
                players[elem.SecondPlayer] = wswapname1;
                wswapname1 = '';
                wswapname2 = '';
            }
            //account for djinn swaps
            if (elem.__type == "Werewolf.GameEngine.Roles.Coven.Djinn.DjinnSwappedPlayerIdentities, Werewolf.GameEngine") {
              console.log('Found Djinn Swap');
               var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.FirstPlayer] + ' was swapped with ' + players[elem.SecondPlayer],roles.formatter(elem.__type, 0),stunden + ':' + minuten + ':' + sekunden);
               parsedgame.push(insertelement);
                //swapping names
                console.log('Swap ' + players[elem.FirstPlayer] + ' with ' + players[elem.SecondPlayer]);
                swapname1 = players[elem.FirstPlayer];
                swapname2 = players[elem.SecondPlayer];
                //console.log('swapname1 = '+swapname1);
                console.log(swapname1 + ' is now ' + swapname2);
                players[elem.FirstPlayer] = players[elem.SecondPlayer];
                console.log(swapname2 + ' is now ' + swapname1);
                players[elem.SecondPlayer] = swapname1;
                swapname1 = '';
                swapname2 = '';
            }
            //account for familiar sacrifice
            if (elem.__type == "Werewolf.GameEngine.Roles.Vampires.VampireRevived, Werewolf.GameEngine") {

                var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.FirstPlayer] + ' sacrificied himself for his Vampire lord ' + players[elem.SecondPlayer],roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
                parsedgame.push(insertelement);
                console.log('Found Vampire revive');
                //swapping names
                console.log('Swap ' + players[elem.FirstPlayer] + ' with ' + players[elem.SecondPlayer]);
                swapname1 = players[elem.FirstPlayer];
                swapname2 = players[elem.SecondPlayer];
                console.log(swapname1 + ' is now ' + swapname2);
                players[elem.FirstPlayer] = players[elem.SecondPlayer];
                console.log(swapname2 + ' is now ' + swapname1);
                players[elem.SecondPlayer] = swapname1;
                swapname1 = '';
                swapname2 = '';

            }
            //Find familiar recruitment
            if (elem.__type == "Werewolf.GameEngine.Roles.FamiliarStalkerAssignedEvent, Werewolf.GameEngine") {
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.PlayerName]+' was recruited by the Vampire',roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
                console.log('Found familiar recruitment');
            }
            //pre-game chat
            if (elem.__type == "Werewolf.GameEngine.Chatting.PendingGameMessage, Werewolf.GameEngine") {
              var insertelement = new NewElement(elem._id,elem.PlayerName,elem.PlayerName,elem.Message,roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
            }
            //find Daybreak
            if (elem.__type == "Werewolf.GameEngine.Phases.Day.DayStartedEvent, Werewolf.GameEngine") {
                protectortarget = "";
                daycount++;
                //resulttable +='<a href=#day'+daycount+'>Day '+daycount+'</a> | ';
                var insertelement = new NewElement(elem._id,'Daybreak','Daybreak','Day'+daycount,roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
                parsedgame.push(insertelement);
                console.log('Daybreak');
            }

            //Find players killed during the night
            if (elem.__type == "Werewolf.GameEngine.Phases.Night.PlayerKilledEvent, Werewolf.GameEngine") {
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.PlayerName]+' was killed during the night',roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
            }
            //Find players put on trial events
            if (elem.__type == "Werewolf.GameEngine.Phases.Day.VillageNominationEvent, Werewolf.GameEngine") {
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.PlayerName]+' votes to put '+players[elem.Target]+' on trial',roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
            }
            //Find lynch events
            if (elem.__type == "Werewolf.GameEngine.Phases.Day.PlayerLynchedEvent, Werewolf.GameEngine") {
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.PlayerName]+' was lynched by the village',roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
                console.log('Lynch Event');
            }

            //Find protector events
            if (elem.__type == "Werewolf.GameEngine.Roles.Village.Protector.ProtectorTargetChosenEvent, Werewolf.GameEngine" && protectortarget != elem.Target) {
                protectortarget = elem.Target;
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.ProtectorName]+' chose to protect '+players[elem.Target],roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
                console.log('Old Protector Event');
            }
            //Find NEW protector events... THX mark!
            if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Protector" && protectortarget != elem.Target) {
                protectortarget = elem.Target;
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.PlayerWithRole]+' chose to protect '+players[elem.Target],roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
                console.log('Protector Event');
            }

            //Find NEW stalker events... THX mark!
            if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Stalker") {
                protectortarget = elem.Target;
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.PlayerWithRole]+' chose to stalk '+players[elem.Target],roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
                console.log('Stalker Event');
            }

            //Find NEW Gravedigger events... THX mark!
            if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Gravedigger") {
                protectortarget = elem.Target;
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.PlayerWithRole]+' chose to dig up '+players[elem.Target],roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
                console.log('Gravedigger Event');
            }

            //Find NEW Bloodhound events... THX mark!
            if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Bloodhound") {
                protectortarget = elem.Target;
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.PlayerWithRole]+' the Bloodhound chose to check '+players[elem.Target],roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
                console.log('Bloodhound Event');
            }

            if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Seer") {
                protectortarget = elem.Target;
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.PlayerWithRole]+' the Seer chose to check '+players[elem.Target],roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
                console.log('Seer Event');
            }

            if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Harlot") {
                protectortarget = elem.Target;
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.PlayerWithRole]+' the harlot chose to visit '+players[elem.Target],roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
                console.log('Harlot Event');
            }

            if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Militia") {
                protectortarget = elem.Target;
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',players[elem.PlayerWithRole]+' the militia chose to shoot '+players[elem.Target],roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
                console.log('Harlot Event');
            }
            if (elem.__type == "Werewolf.GameEngine.Core.ModeratorMessageEvent, Werewolf.GameEngine") {
              var insertelement = new NewElement(elem._id,'Modertor','Moderator',elem.Message,roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
            }
            if (elem.PlayerName != null && elem.Message != null && elem.__type != "Werewolf.GameEngine.Chatting.PendingGameMessage, Werewolf.GameEngine") {

              var insertelement = new NewElement(elem._id,elem.PlayerName,players[elem.PlayerName],elem.Message,roles.formatter(elem.__type),stunden + ':' + minuten + ':' + sekunden);
              parsedgame.push(insertelement);
            }
        }

        console.log(parsedgame.length);

        return resolveCallback(parsedgame);



}
