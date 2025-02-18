import { View, Text } from "react-native";
import React, { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

const Header = () => {
  //@ts-ignore
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <View style={{ gap: 4 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        Hello, {userDetail?.name}
      </Text>
      <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
        Let's get started
      </Text>
    </View>
  );
};

export default Header;
