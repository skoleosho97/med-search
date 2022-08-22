import * as React from 'react';
import { 
    ActivityIndicator, 
    FlatList, 
    Platform, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';
import { Button, Icon, Input } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const UserAuth = () => {
    let [user, setUser] = React.useState('');
    let [pass, setPass] = React.useState('');
    let navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '80%', backgroundColor: '#FFF' }}>
                <View>
                    <Input
                        placeholder='School E-mail' 
                    />
                </View>
                <View>
                    <Input
                        placeholder='Password' 
                    />
                </View>
                <View>
                    <Button title='Sign In' />
                    <Button title='Create an Account' />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E4',
    },
})

export default UserAuth;