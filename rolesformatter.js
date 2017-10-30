var exports = module.exports = {};

//format events
	exports.formatter = function(msgtype) {
		var formatclass = '';
		//console.log('Formatting ',msgtype);
		switch(msgtype)
		{
		//"

		case "Werewolf.GameEngine.Chatting.WerewolfNightMessageEvent, Werewolf.GameEngine":
		formatclass = "wolfmsg";
		break;

		case "Werewolf.GameEngine.Chatting.GhostMessageEvent, Werewolf.GameEngine":
		formatclass = "ghostmsg";
		break;

		case "Werewolf.GameEngine.Core.ModeratorMessageEvent, Werewolf.GameEngine":
		formatclass = "modmsg";
		break;

		case "Werewolf.GameEngine.Phases.Day.VillageNominationEvent, Werewolf.GameEngine":
		formatclass = "modmsg";
		break;

		case "Werewolf.GameEngine.Phases.Day.PlayerLynchedEvent, Werewolf.GameEngine":
		formatclass = "modmsg";
		break;

		case "Werewolf.GameEngine.Roles.Werewolves.Shapeshifter.IdentitySwappedByShapeshifterEvent, Werewolf.GameEngine":
		formatclass = "modmsg";
		break;

		case "Werewolf.GameEngine.Phases.Night.PlayerKilledEvent, Werewolf.GameEngine":
		formatclass = "modmsg";
		break;
		case "Werewolf.GameEngine.Roles.Coven.Djinn.DjinnSwappedPlayerIdentities, Werewolf.GameEngine":
		formatclass = "modmsg";
		break;

		case "Werewolf.GameEngine.Chatting.CovenNightMessageEvent, Werewolf.GameEngine":
		formatclass = "covenmsg";
		break;

		case "Werewolf.GameEngine.Roles.Demons.DemonNightMessageEvent, Werewolf.GameEngine":
		formatclass = "demonmsg";
		break;

		case "Werewolf.GameEngine.Roles.Village.Masons.MasonNightMessageEvent, Werewolf.GameEngine":
		formatclass = "masonmsg";
		break;

		case "Werewolf.GameEngine.Roles.Werewolves.Shapeshifter.ShapeshifterSwappedPlayerIdentities, Werewolf.GameEngine":
		formatclass = "modmsg";
		break;

    case "Werewolf.GameEngine.Roles.Village.Protector.ProtectorTargetChosenEvent, Werewolf.GameEngine":
		formatclass = "modmsg";
		break;

    case "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine":
		formatclass = "modmsg";
		break;

    case "Werewolf.GameEngine.Phases.Day.DayStartedEvent, Werewolf.GameEngine":
    formatclass = "modmsg";
    break;

    case "Werewolf.GameEngine.Roles.Vampires.VampireRevived, Werewolf.GameEngine":
    formatclass = "modmsg";
    break;
    case "Werewolf.GameEngine.Roles.FamiliarStalkerAssignedEvent, Werewolf.GameEngine":
    formatclass = "modmsg";
	break;
	
	case "Werewolf.GameEngine.Roles.FamiliarMilitiaAssignedEvent, Werewolf.GameEngine":
    formatclass = "modmsg";
	break;
	
	case "Werewolf.GameEngine.Roles.FamiliarGravediggerAssignedEvent, Werewolf.GameEngine":
    formatclass = "modmsg";
	break;
	
    case "Werewolf.GameEngine.Roles.Vampires.VampireNightMessageEvent, Werewolf.GameEngine":
    formatclass = "vampmsg";
	break;
	
	case "vampmsgt1":
    formatclass = "vampmsgt1";
	break;
	
	case "vampmsgt2":
    formatclass = "vampmsgt2";
    break;

		case "Werewolf.GameEngine.Chatting.PendingGameMessage, Werewolf.GameEngine":
		formatclass = "villagemsg"
		break;

		default:
		formatclass = "villagemsg"
		break;


		}
		return formatclass
	}
