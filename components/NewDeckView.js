import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";
import { gray, purple, orange, white } from "../utils/colors";
import { connect } from "react-redux";
import { saveDeck } from "../utils/api";
import { addDeck } from "../actions";
const uuid = require("uuid/v4");

class NewDeckView extends Component {
    state = {
        title: null
    };

    submit() {
        const { addDeck } = this.props;

        //save to redux
        addDeck({
            title: this.state.title,
            questions: []
        });

        //save to asyncstorage
        saveDeck(this.state.title);

        this.setState({
            title: null
        });
        this.props.navigation.goBack();
    }

    render() {
        const { addDeck } = this.props;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={{ fontSize: 20 }}>
                    Please enter a title for your new deck
                </Text>
                <TextInput
                    style={{
                        width: 200,
                        height: 40,
                        borderColor: "gray",
                        borderWidth: 1,
                        padding: 5,
                        marginTop: 20
                    }}
                    onChangeText={value => this.setState({ title: value })}
                    value={this.state.title}
                    placeholder={"e.g. React Native"}
                    autoFocus={true}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.submit()}
                >
                    <Text style={{ color: white }}>SUBMIT</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addDeck: data => dispatch(addDeck(data))
    };
}

function mapStateToProps(state) {
    return {};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    submitButton: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckView);
