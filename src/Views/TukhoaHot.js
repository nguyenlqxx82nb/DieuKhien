import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import GLOBALS from '../DataManagers/Globals'
import ListItem from '../Components/ListItem.js';

export default class TuKhoaHot extends React.Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //console.warn(" componentWillMount HomeScreen");
    }
    render() {
        return (
            <View style={{ height: 30, justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                <Text style={styles.titleHot}>TỪ KHÓA HOT</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginLeft: 20 }}
                >
                    <View style={styles.containerItemHot}>
                        <ListItem style={styles.listItemHot}
                            onPress={() => { }}
                        >
                            <Text style={styles.titleHotItem}>Giấc mơ e chờ - Chi Dân</Text>
                        </ListItem>
                    </View>

                    <View style={styles.containerItemHot}>
                        <ListItem style={styles.listItemHot}
                            onPress={() => { }}
                        >
                            <Text style={styles.titleHotItem}>Chạy ngay đi - Sơn Tùng MTP</Text>
                        </ListItem>
                    </View>

                    <View style={styles.containerItemHot}>
                        <ListItem style={styles.listItemHot}
                            onPress={() => { }}
                        >
                            <Text style={styles.titleHotItem}>Đừng như thói quen - Saralưu</Text>
                        </ListItem>
                    </View>

                    <View style={styles.containerItemHot}>
                        <ListItem style={styles.listItemHot}
                            onPress={() => { }}
                        >
                            <Text style={styles.titleHotItem}>Đừng quên tên anh - Hoa Vinh</Text>
                        </ListItem>
                    </View>

                    <View style={styles.containerItemHot}>
                        <ListItem style={styles.listItemHot}
                            onPress={() => { }}
                        >
                            <Text style={styles.titleHotItem}>Chạm đáy nỗi đau - Nguyên LÊ</Text>
                        </ListItem>
                    </View>

                    <View style={styles.containerItemHot}>
                        <ListItem style={styles.listItemHot}
                            onPress={() => { }}
                        >
                            <Text style={styles.titleHotItem}>Giấc mơ e chờ - Chi Dân</Text>
                        </ListItem>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleHot: {
        fontFamily: GLOBALS.FONT.MEDIUM,
        fontSize: 13,
        color: "#fff",
        marginLeft: 20
    },

    containerItemHot: {
        height: 30,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10
    },

    listItemHot: {
        height: 30,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },

    titleHotItem: {
        fontFamily: GLOBALS.FONT.MEDIUM,
        fontSize: 13,
        color: "#fff",

    }
})
