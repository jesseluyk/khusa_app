import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { khusaText, surface_a10 } from "../../../../Constants";
import { Games } from "./Games";
import { DanceParty } from "./DanceParty";
import { Timer } from "./Timer";
import { Spinner } from "./Spinner";
import { WouldYouRather } from "./WouldYouRather";
import { ConversationStarters } from "./ConversationStarters";

//creates navigator
const { Navigator, Screen } = createStackNavigator();

//contains game screens for navigation
export const GameNav = () => {
  return (
    <Navigator initialRouteName="GamesScreen">
      <Screen
        name="GamesScreen"
        component={Games}
        options={{
          title: "Games",
          headerStyle: {
            backgroundColor: surface_a10,
          },
          headerTintColor: khusaText,
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="DancePartyScreen"
        component={DanceParty}
        options={{
          title: "Dance Party",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: surface_a10,
          },
          headerTintColor: khusaText,
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="WouldYouRatherScreen"
        component={WouldYouRather}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: surface_a10,
          },
          headerTintColor: khusaText,
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="ConversationStartersScreen"
        component={ConversationStarters}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: surface_a10,
          },
          headerTintColor: khusaText,
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="SpinnerScreen"
        component={Spinner}
        options={{
          title: "Spinner",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: surface_a10,
          },
          headerTintColor: khusaText,
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="TimerScreen"
        component={Timer}
        options={{
          title: "Timer",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: surface_a10,
          },
          headerTintColor: khusaText,
          headerBackTitle: "Back",
        }}
      />
    </Navigator>
  );
};
