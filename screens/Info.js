import * as React from 'react';
import { 
    ActivityIndicator, 
    Dimensions,
    FlatList, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';
import { Button, Icon } from '@rneui/themed';

// CSS Constants
let WIDTH = Dimensions.get('window').width

const Info = ({ route, navigation }) => {
    const { name } = route?.params || {};
    const { id } = route?.params || {};

    const [isLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [relatedInfo, setRelatedInfo] = React.useState(null);

    const endpoint = `https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui/${id}/allrelated.json`;

    React.useEffect(() => {
        setLoading(true);

        fetch(endpoint)
        .then(response => response.json())
        .then(results => {
            setRelatedInfo(results['allRelatedGroup']['conceptGroup']);
            setLoading(false);
        })
        .catch(e => {
            setLoading(false);
            setError(e);
        });
    }, []);

    const getIngredients = (info) => {
        if (info) {
            console.log("ok");
        }
        let conceptGroup = info.filter(x => x.tty === "IN");

        console.log(conceptGroup[0]);
        return conceptGroup[0].conceptProperties[0].name
    }

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignSelf: 'flex-start' }}>
                <Button 
                    title='Library'
                    icon={{
                        name: 'arrow-back-ios',
                        type: 'material',
                        size: 15,
                        color: '#000',
                    }}
                    titleStyle={{
                        color: '#000',
                    }}
                    buttonStyle={{
                        backgroundColor: '#FFF8E4',
                    }}
                    onPress={() => {
                        navigation.navigate('Search')
                    }}
                />
            </View>
            <View style={styles.label_container}>
                <View style={{ height: '100%', borderWidth: 5 }}>
                    <View style={{ borderBottomWidth: 3 }}>
                        <Text style={{ paddingLeft: 4, fontSize: 32, fontStyle: 'italic', fontWeight: 'bold' }}>Drug Facts</Text>
                    </View>
                    <View style={{ borderBottomWidth: 3 }}>
                        <View style={{ paddingLeft: 4, pdadingRight: 4}}>
                            <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: 'bold' }}>Drug Name: </Text>
                            <Text style={{  }}>{name}</Text>
                        </View>
                        <View style={{ paddingLeft: 4, pdadingRight: 4, paddingBottom: 4}}>
                            <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: 'bold' }}>Active Ingredient: </Text>
                            <Text style={{  }}>{relatedInfo && relatedInfo.filter(x => x.tty === "IN")[0].conceptProperties[0].name}</Text>
                        </View>        
                    </View>
                    <View style={{ flexGrow: 1 }}>
                        <View style={{ padding: 4, borderBottomWidth: 3, flexGrow: 0.5 }}>
                            <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: 'bold' }}>Uses: </Text>
                            <View>
                                <Button buttonStyle={{ backgroundColor: 'rgba(209,209,209,0.4)' }} titleStyle={{ color: '#000' }}>
                                    <Icon name='plus' type='entypo' color='#000' />
                                    Add Use
                                </Button>
                            </View>
                        </View>
                        <View style={{ padding: 4, flexGrow: 0.5 }}>
                            <Text style={{ fontSize: 16, fontStyle: 'italic', fontWeight: 'bold' }}>Notes: </Text>
                            <View>
                                <Button buttonStyle={{ backgroundColor: 'rgba(209,209,209,0.4)' }} titleStyle={{ color: '#000' }}>
                                    <Icon name='plus' type='entypo' color='#000' />
                                    Add Note
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8E4',
    },
    label_container: {
        margin: 15, 
        padding: 10, 
        width: (WIDTH* 0.8), 
        flex: 1, 
        backgroundColor: '#FFF'
    },
});

export default Info;