import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useCallback, useEffect, } from 'react'
import { selectTaxQuery } from '../../API/UploadTxn'
import Icon from 'react-native-vector-icons/Feather';
import { selectDownloadTaxQuery } from '../../API/DownloadTxn';
import moment from 'moment';
import filter from 'lodash.filter';

export default function Downloaded_Data(props) {
    const [search, setSearch] = useState()
    const [filtered_data, setFiltereddata] = useState()
    const [master_data, setMasterdata] = useState()


    const loadData = useCallback(async () => {

        try {
            const data = await selectDownloadTaxQuery();
            if (data.length) {
                setFiltereddata(data)
                setMasterdata(data)
            }

        } catch (error) {
            console.error(error);
        }
    })

    useEffect(() => {
        loadData()

    }, [])

    function renderItem({ item }) {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                <View style={{ flex: 2, backgroundColor: '#CECBCB', margin: 5, }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>{item.cus_name}</Text>
                </View>
                <View style={{ flex: 1.5, backgroundColor: '#CECBCB', margin: 5, }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.amount}</Text>
                </View>
                <View style={{ flex: 1.5, backgroundColor: '#CECBCB', margin: 5, }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{moment(item.txn_date).format('YYYY/MM/DD')}</Text>
                </View>
                <TouchableOpacity style={{ flex: 1, backgroundColor: '#CECBCB', margin: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => props.navigation.navigate('view_dowload', { item })}
                >
                    <Icon name="more-horizontal" size={18} color="black" />
                </TouchableOpacity>
            </View >

        )
    }
    function ItemSeparateView() {
        return (
            <View>

            </View>
        )
    }


    const SearchFilter = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(master_data, data => {
            console.log('data', data);
            return contains(data, text);
        });
        setFiltereddata(filteredData);
        setSearch(text);
    };

    const contains = ({ cus_name, amount, txn_date }, query) => {

        if (cus_name.includes(query) || amount.includes(query) || txn_date.includes(query)) {
            return true;
        }

        return false;
    };


    return (
        <View style={{
            flex: 1,
            backgroundColor: '#f8f8f8',
        }}>

            <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        backgroundColor: '#2D9BF1',
                        padding: 10,
                        marginTop: 20,
                        height: 50,
                        justifyContent: 'center',
                        borderRadius: 5,
                        marginBottom: 20

                    }}

                >
                    <Text style={{ color: 'black' }}>Search By</Text>

                </TouchableOpacity>
                <TextInput
                    value={search}
                    onChangeText={(text) => SearchFilter(text)}
                    style={{
                        height: 55,
                        margin: 12,
                        borderWidth: 0.7,
                        padding: 20,
                        borderRadius: 10,
                        marginTop: 20
                    }}
                    placeholder="Name / Amount/ Date"
                />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                <View style={{ flex: 2, backgroundColor: '#2D9BF1', margin: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Name</Text>
                </View>
                <View style={{ flex: 1.5, backgroundColor: '#2D9BF1', margin: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Amount</Text>
                </View>
                <View style={{ flex: 1.5, backgroundColor: '#2D9BF1', margin: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Date</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: '#2D9BF1', margin: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Action</Text>
                </View>
            </View>

            <FlatList data={filtered_data} keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparateView}
                renderItem={renderItem} />


        </View>
    )
}

const styles = StyleSheet.create({

    tableColumnClockInOutTimes: {
        alignItems: "center",
        backgroundColor: "#CECBCB",
        flex: 1.9,
        justifyContent: "center",
        margin: 1,
        padding: 5,
    },
    tableHeadtitle: {
        alignItems: "center",
        backgroundColor: "#2D9BF1",
        flex: 2,
        justifyContent: "center",
        margin: 1
    },
    tableColumnTotals: {
        alignItems: "center",
        backgroundColor: "#CECBCB",
        flex: 2,
        justifyContent: "center",
        margin: 1
    },


    tableColumnAction: {
        alignItems: "center",
        backgroundColor: "#CECBCB",
        flex: 1,
        justifyContent: "center",
        margin: 1
    },


    tableColumndate: {
        alignItems: "center",
        backgroundColor: "#2D9BF1",
        flex: 2,
        justifyContent: "center",
        margin: 1
    },
    tableColumnaction: {
        alignItems: "center",
        backgroundColor: "#2D9BF1",
        flex: 1,
        justifyContent: "center",
        margin: 1
    },
    tableRow: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 30
    },
    tableHeader: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 30
    },

    tableContainer: {
        backgroundColor: "#F0FBFC",
        borderRadius: 5,
        flex: 1,
        marginTop: 0,
        padding: 10
    },

    textLineItem: {
        color: "black"
    }
});

