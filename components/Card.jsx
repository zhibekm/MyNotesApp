import React from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { card } from "../globalStyle";
import { darkcard } from "../darkMode";
import { lightDark } from "./getTime";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class Card extends React.Component {
  constructor() {
    super();

    // this.state = {
    //   markAsImp: false,
    // };

    this.windowWidth = Dimensions.get("window").width;
    this.windowHeight = Dimensions.get("window").height;
    console.log(this.windowHeight, this.windowWidth);

    this.fadeAnim = new Animated.Value(0);
    this.resizeAnim = new Animated.Value(this.windowWidth + 23);
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.fadeAnim, {
        toValue: 1,
        duration: 500,
      }),
      Animated.spring(this.resizeAnim, {
        toValue: this.windowWidth - 23,
        tension: 10,
        friction: 3,
      }),
    ]).start();
  }

  fadeOut = (value) => {
    console.log("value: ", value);

    Animated.timing(this.fadeAnim, {
      toValue: 0,
      duration: 200,
    }).start();

    Animated.timing(this.resizeAnim, {
      toValue: this.windowWidth + 23,
      duration: 200,
    }).start();

    if (value === "delete") {
      setTimeout(() => {
        this.props.onDelete();
      }, 200);
    } else if (value === "toggle") {
      setTimeout(() => {
        this.props.onToggleFinished();
      }, 200);

      setTimeout(() => {
        Animated.timing(this.fadeAnim, {
          toValue: 1,
          duration: 200,
        }).start();

        Animated.timing(this.resizeAnim, {
          toValue: this.windowWidth - 23,
          duration: 200,
        }).start();
      }, 200);
    }
  };

  // openMenu = () => {
  //   this.menu.open();
  // };

  render() {
    return (
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor={lightDark() ? "#ebebeb" : "#2b2b2b"}
        onLongPress={() => this.menu.open()}
      >
        <Animated.View
          style={
            this.props.item.markAsImp
              ? lightDark()
                ? {
                    //important card and daytime
                    ...card.impCard,
                    opacity: this.fadeAnim,
                    width: this.resizeAnim,
                  }
                : {
                    //important card and nighttime
                    ...darkcard.impCard,
                    opacity: this.fadeAnim,
                    width: this.resizeAnim,
                  }
              : lightDark()
              ? {
                  //normal card and daytime
                  ...card.card,
                  opacity: this.fadeAnim,
                  width: this.resizeAnim,
                }
              : {
                  //normal card and nighttime
                  ...darkcard.card,
                  opacity: this.fadeAnim,
                  width: this.resizeAnim,
                }
          }
        >
          <View style={lightDark() ? card.cardContent : darkcard.cardContent}>
            {/* toggle finished */}
            <TouchableOpacity
              style={{ marginLeft: 0, height: 25 }}
              onPress={() => this.fadeOut("toggle")}
            >
              {this.props.item.finished === true ? (
                <AntDesign name="checkcircle" size={24} color="#fca944" />
              ) : (
                <AntDesign name="checkcircle" size={24} color="#a3a3a3" />
              )}
            </TouchableOpacity>
            {/* task content */}
            {this.props.item.finished === true ? (
              <View style={{ marginLeft: 5 }}>
                <View style={{ opacity: 0.7, flexDirection: "row" }}>
                  <AntDesign
                    style={{ marginHorizontal: 5, marginBottom: 5 }}
                    name="clockcircleo"
                    size={15}
                    color={lightDark() ? "black" : "white"}
                  />
                  <Text
                    style={
                      lightDark()
                        ? { color: "black", fontSize: 10 }
                        : { color: "white", fontSize: 10 }
                    }
                  >
                    {this.props.item.time}
                  </Text>
                </View>
                <Text
                  style={
                    lightDark()
                      ? {
                          ...card.todoItem,
                          textDecorationLine: "line-through",
                          textDecorationStyle: "solid",
                          opacity: 0.4,
                        }
                      : {
                          ...darkcard.todoItem,
                          textDecorationLine: "line-through",
                          textDecorationStyle: "solid",
                          opacity: 0.4,
                        }
                  }
                >
                  {this.props.item.name}
                </Text>
              </View>
            ) : (
              <View style={{ marginLeft: 5 }}>
                <View style={{ opacity: 0.7, flexDirection: "row" }}>
                  <AntDesign
                    style={{ marginHorizontal: 5, marginBottom: 5 }}
                    name="clockcircleo"
                    size={15}
                    color={lightDark() ? "black" : "white"}
                  />
                  <Text
                    style={
                      lightDark()
                        ? { color: "black", fontSize: 10 }
                        : { color: "white", fontSize: 10 }
                    }
                  >
                    {this.props.item.time}
                  </Text>
                </View>
                <Text style={lightDark() ? card.todoItem : darkcard.todoItem}>
                  {this.props.item.name}
                </Text>
              </View>
            )}

            {/* popup */}
            <Menu ref={(c) => (this.menu = c)}>
              <MenuTrigger
                customStyles={{
                  triggerTouchable: {
                    onLongPress: () => this.menu.open(),
                  },
                }}
              ></MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={this.props.onEdit}
                  text="Edit this task"
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: "#ffc987",
                  }}
                />
                <MenuOption
                  onSelect={this.props.onMarkAsImp}
                  text={
                    this.props.item.markAsImp
                      ? "Unmark as Important"
                      : "Mark as Important"
                  }
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: "#ffc987",
                  }}
                />
              </MenuOptions>
            </Menu>

            {/* delete task */}
            <TouchableOpacity
              style={{ marginLeft: "auto", height: 25 }}
              onPress={() => this.fadeOut("delete")}
            >
              <AntDesign name="closecircle" size={24} color="#fca944" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableHighlight>
    );
  }
}
