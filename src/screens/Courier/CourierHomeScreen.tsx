import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CourierHomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Courier Dashboard</Text>
            <Text style={styles.subtitle}>View your pending orders</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default CourierHomeScreen;
