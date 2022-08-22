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
import { Button, Icon, SearchBar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
    const [search, setSearch] = React.useState('');
    const [fullData, setFullData] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [isLoading, setLoading] = React.useState(false);

    const navigation = useNavigation();
    const endpoint = 'https://rxnav.nlm.nih.gov/REST/Prescribe/allconcepts.json?tty=IN+MIN+BN';

    React.useEffect(() => {
        setLoading(true);

        fetch(endpoint)
            .then(response => response.json())
            .then(results => {
                setFullData(results['minConceptGroup']['minConcept']);
                setFilteredData(results['minConceptGroup']['minConcept']);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                setError(e);
            });
    }, []);

    const filterSearch = (search) => {
        if (search) {
            let formattedData = fullData.filter(item => {
                //let regex = new RegExp('^' + search.toLowerCase(), 'g');
               // return item.name.toLowerCase().match(regex)
            });
            setFilteredData(formattedData);
            setSearch(search);
        } else {
            setFilteredData(fullData);
            setSearch(search);
        }
    }

    if (isLoading) {

    }

    if (error) {

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Search</Text>
                <Icon name='filter-list' size={30} color='#000' onPress={() => console.log()}/>
            </View>
            <View style={{ flex: 1 }}>
                {Platform.OS === 'ios' ?
                    <SearchBar
                        platform='ios'
                        containerStyle={{
                            width: '95%',
                            backgroundColor: 'transparent',
                            
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#E0DAC9',
                        }}
                        placeholder='Search medications...'
                        placeholderTextColor='#B5B5B5'
                        value={search}
                        onChangeText={searchQuery => filterSearch(searchQuery)}
                        onCancel={() => setSearch('')}
                    />
                : 
                    <SearchBar
                        platform='android' 
                    />
                }
            </View>
            <View style={styles.list}>
                <FlatList 
                    data={filteredData}
                    keyExtractor={item => item.rxcui}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <Button
                                    title={item.name}
                                    buttonStyle={{
                                        backgroundColor: '#FFF',
                                    }}
                                    containerStyle={{
                                        width: '100%',
                                    }}
                                    titleStyle={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                    }}
                                    onPress={() => {
                                        navigation.navigate('Info', {
                                            name: item.name,
                                            id: item.rxcui,
                                        })
                                    }}
                                />
                            </View>
                        );
                    }}
                />
            </View>
            <View style={styles.footer}>
                <Button
                    icon={{
                        name: 'home',
                        type: 'font-awesome',
                        size: 15,
                        color: '#000',
                    }}
                    buttonStyle={{
                        backgroundColor: '#FFF8E4',
                    }}
                />
                <Button
                    icon={{
                        name: 'home',
                        type: 'font-awesome',
                        size: 15,
                        color: '#000',
                    }}
                    buttonStyle={{
                        backgroundColor: '#FFF8E4',
                    }}
                />
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
    header: {
        flex: 1,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    list: {
        flex: 5,
        width: '90%',
    },
    footer: {
        flex: 1,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default Search;