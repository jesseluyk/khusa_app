import React from "react";
import Report from "../../views/screens/postAuthScreens/report_screens/Report";
import { Main } from "../screens/postAuthScreens/Main";
import { Search } from "../screens/postAuthScreens/Search";
import { ResourceCenterViewer } from "../screens/postAuthScreens/ResourceCenterViewer";
import { Downloads } from "../screens/postAuthScreens/Downloads";
import { GameNav } from "../screens/postAuthScreens/games/GameNav";
import { WinningAtHome } from "../screens/postAuthScreens/WinningAtHome";
import ContactSupport from "../screens/postAuthScreens/ContactSupport";
import { Timer } from "../screens/postAuthScreens/games/Timer";
import { Spinner } from "../screens/postAuthScreens/games/Spinner";
import { ConversationStarters } from "../screens/postAuthScreens/games/ConversationStarters";
import { WouldYouRather } from "../screens/postAuthScreens/games/WouldYouRather";
import { DanceParty } from "../screens/postAuthScreens/games/DanceParty";
import { font, khusaText, surface_a10 } from "../../Constants";
import { ResourceViewer } from "../screens/postAuthScreens/ResourceViewer";
import { PrintButton } from "../../utilities/PrintButton";
import SupportPage from "../screens/postAuthScreens/SupportPage";
import ResourceSubPage from "../screens/postAuthScreens/ResourceSubPage";
import { createStackNavigator } from "@react-navigation/stack";

const PostAuthNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator initialRouteName="Main">
      <Screen
        name="Main"
        component={Main}
        options={{
          title: "",
          headerShown: false,
          footerShown: false,
          lazy: false,
          fontFamily: font,
        }}
        screenOptions={{
          fontFamily: font,
        }}
      />
      <Screen
        name="ReportScreen"
        component={Report}
        options={{ headerShown: false }}
      />
      <Screen
        name="Search"
        component={Search}
        options={{
          title: "Search",
          headerStyle: {
            backgroundColor: surface_a10, //Set Header color
          },
          headerTintColor: khusaText, //Set Header text color
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="ResourceSubPage"
        component={ResourceSubPage}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: surface_a10, //Set Header color
          },
          headerTintColor: khusaText, //Set Header text color
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="ResourceCenterViewer"
        component={ResourceCenterViewer}
        options={{
          title: "Resource Center",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: surface_a10, //Set Header color
          },
          headerTintColor: khusaText, //Set Header text color
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="ResourceViewer"
        component={ResourceViewer}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: surface_a10, //Set Header color
          },
          headerTintColor: khusaText, //Set Header text color
          headerBackTitle: "Back",
          headerRight: () => {
            return <PrintButton textColor={khusaText} />;
          },
        }}
      />
      <Screen
        name="Support"
        component={SupportPage}
        options={{
          title: "Support",
          headerStyle: {
            backgroundColor: surface_a10,
          },
          headerTintColor: khusaText,
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="Downloads"
        component={Downloads}
        options={{
          title: "Downloads",
          headerStyle: {
            backgroundColor: surface_a10, //Set Header color
          },
          headerTintColor: khusaText, //Set Header text color
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="GameNav"
        component={GameNav}
        options={{ headerShown: false }}
      />
      <Screen
        name="WinningAtHome"
        component={WinningAtHome}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: surface_a10, //Set Header color
          },
          headerTintColor: khusaText, //Set Header text color
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="ContactSupport"
        component={ContactSupport}
        // Hiding header for Page Layout
        options={{
          title: "",
          headerStyle: {
            backgroundColor: surface_a10, //Set Header color
          },
          headerTintColor: khusaText, //Set Header text color
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="Timer"
        component={Timer}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: surface_a10, //Set Header color
          },
          headerTintColor: khusaText, //Set Header text color
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="Spinner"
        component={Spinner}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: surface_a10, //Set Header color
          },
          headerTintColor: khusaText, //Set Header text color
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="Conversation Starters"
        component={ConversationStarters}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: surface_a10, //Set Header color
          },
          headerTintColor: khusaText, //Set Header text color
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="Danee Party"
        component={DanceParty}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: surface_a10, //Set Header color
          },
          headerTintColor: khusaText, //Set Header text color
          headerBackTitle: "Back",
        }}
      />
      <Screen
        name="Would You Rather?"
        component={WouldYouRather}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: surface_a10, //Set Header color
          },
          headerTintColor: khusaText, //Set Header text color
          headerBackTitle: "Back",
        }}
      />
    </Navigator>
  );
};
export default PostAuthNavigator;
