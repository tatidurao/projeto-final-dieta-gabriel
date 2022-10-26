import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import FeedSemanal from "../screens/FeedSemanal";
import CreateDieta from "../screens/CreateDieta";
import firebase from "firebase";
import MenuIdeas from "../screens/MenuIdeas";

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      isUpdated: false,
    };
  }

   componentDidMount() {
    this.fetchUser();
  }

  changeUpdated = () => {
    this.setState({isUpdated: true})
  }

  removeUpdated = () => {
    this.setState({isUpdated: false})
  }

  renderFeed = (props) => {
    return <FeedSemanal setUpdateToFalse={this.removeUpdated}{...props}/>
  }

  renderStory = (props) => {
    return <CreateDieta setUpdateToTrue={this.removeUpdated}{...props}/>
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={this.state.light_theme ? styles.bottomTabStyleLight : styles.bottomTabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "FeedSemanal") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "CreateDieta") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }

             else if (route.name === "MenuIdeas") {
              iconName = focused ? "book" : "book";
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          }
        })}
        activeColor={"#ee8249"}
        inactiveColor={"black"}
      >
        <Tab.Screen name="FeedSemanal" component={this.renderFeed} options={{unmountOnBlur: true}}/>
        <Tab.Screen name="CreateDieta" component={this.renderStory} options={{unmountOnBlur: true}}/>
        <Tab.Screen name="MenuIdeas" component={MenuIdeas}/>
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "green",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});