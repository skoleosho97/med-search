<Button 
title={getIngredients(relatedInfo).name}
buttonStyle={{
    backgroundColor: '#FFF',
}}
titleStyle={{
    color: '#000',
    fontWeight: 'bold',
}}
onPress={() => {
    navigation.navigate('Info', {
        name: getIngredients(relatedInfo).name,
        id: getIngredients(relatedInfo).rxcui,
    })
}}
/>

import * as React from "react";
import { Input } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default () => {
  return (
    <Input
      containerStyle={{}}
      disabledInputStyle={{ background: "#ddd" }}
      inputContainerStyle={{}}
      errorMessage="Oops! that's not correct."
      errorStyle={{}}
      errorProps={{}}
      inputStyle={{}}
      label="User Form"
      labelStyle={{}}
      labelProps={{}}
      leftIcon={<Icon name="account-outline" size={20} />}
      leftIconContainerStyle={{}}
      rightIcon={<Icon name="close" size={20} />}
      rightIconContainerStyle={{}}
      placeholder="Enter Name"
    />
  );
}