import React from "react";
import {AppRegistry, Image, StatusBar} from "react-native";
import {
    Button,
    Text,
    Container,
    List,
    ListItem,
    Content,
    Icon
} from "native-base";

const rountes = ["Home","Test"];
export default class SideBar extends React.Component{
    render(){
        return(
            <Container>
                <Image 
                    source = {{
                        uri : "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
                    }}

                    style = {{
                        height :120,
                        width : "100%",
                        alignSelf :"stretch",
                        position : "absolute"
                    }}
                />

                <Image 
                    square
                    source = {{
                        uri : "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png"
                    }}

                    style = {{
                        height :80,
                        width : 70,
                        alignSelf :"center",
                        position : "absolute",
                        top : 20
                    }}
                />

                <List
                    dataArray = {rountes}
                    contentContainerStyle = {{ marginTop: 120 }}
                    renderRow={data => {
                        return(
                            <ListItem
                                button
                                onPress = {
                                    () => this.props.navigation.navigate(data)
                                }
                            >
                                <Text>{data}</Text>
                            </ListItem>
                        );
                    }}
                />
            </Container>
        );
    }
} 