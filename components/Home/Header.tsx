import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Ionicons } from "@expo/vector-icons";
const Header = () => {
  //@ts-ignore
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: 4 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
          Hello, {userDetail?.name}
        </Text>
        <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
          Let's get started
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons size={32} name="settings-outline" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
