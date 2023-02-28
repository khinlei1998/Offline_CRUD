import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useCallback, useEffect, } from 'react'
import { selectTaxQuery, sync_txnupload } from '../../API/UploadTxn'
import Button from '../../components/Button';

import { syn_delete_tax } from '../../API/UploadTxn';
export default function Upload_Data() {
    const [filtered_data, setFiltereddata] = useState()
    const [selected_data, setSelected] = useState([])
    const [selected_id, setSelectedID] = useState([])


    const loadData = useCallback(async () => {

        try {
            const data = await selectTaxQuery();
            console.log('deleted data', data.length);
            if (data.length > 0) {
                setFiltereddata(data)
            } else {
                setFiltereddata([])
            }

        } catch (error) {
            console.error(error);
        }
    })

    useEffect(() => {
        loadData()


    }, [])

    const btnupload = () => {
        sync_txnupload(selected_data, (type) => {
            if (type == 'success') {
                syn_delete_tax(selected_id, (type) => {
                    if (type == 'delete_success') {
                        alert("Sync successfully!")
                        loadData()
                    }
                })


            }
        })

    }
    const arrtxn_id = []
    const handleOnpress = (item) => {
        const newItem = filtered_data.map((val) => {
            if (val.id == item.id) {
                return { ...val, selected: !val.selected }
            } else {
                return val
            }
        })
        const arr = newItem.filter(object => object.selected == true).map((val) => {
            arrtxn_id.push(val.id)
            return { "data": [val.cus_name, val.dob, val.amount, val.note, val.txn_date, val.login_id] }
        })
        setSelected(arr)
        setSelectedID(arrtxn_id)
        setFiltereddata(newItem)
    }




    function renderItem({ item }) {
        let data = []
        data.push({ label: item.id, })

        const aa = [
            { label: 'Apples', value: 'appls' },
            { label: 'Oranges', value: 'orngs' },
            { label: 'Pears', value: 'pears' }
        ]
        return (
            <TouchableOpacity onPress={() => handleOnpress(item)}>
                <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: item.selected ? 'green' : 'white' }}>
                    {/* <CheckBox
                        checkBoxSize={40}
                        checkColor='black'
                        squareCheckBox={true}
                        onToggle={() => alert('kk')}
                    /> */}

                    {/* <CheckBox
                    isChecked={toggleCheckBox}
                    checkBoxSize={40}
                    checkColor='darkturquoise'
                    squareCheckBox={true}
                    onToggle={() => alert('kk')}
                /> */}

                    {/* <SelectMultiple
                    items={data}
                    selectedItems={aa}
                    onSelectionsChange={() => alert('kk')} /> */}



                    <View style={{ flex: 2, backgroundColor: '#CECBCB', margin: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>{item.cus_name}</Text>
                    </View>
                    <View style={{ flex: 1.5, backgroundColor: '#CECBCB', margin: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.amount}</Text>
                    </View>
                    <View style={{ flex: 1.5, backgroundColor: '#CECBCB', margin: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.txn_date}</Text>
                    </View>

                </View>
            </TouchableOpacity>

        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }}>



            <View style={{ flexDirection: 'row', marginTop: 30, }}>
                {/* <View style={{ flex: 1, backgroundColor: '#2D9BF1', margin: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Action</Text>
                </View> */}
                <View style={{ flex: 2, backgroundColor: '#2D9BF1', margin: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Name</Text>
                </View>
                <View style={{ flex: 1.5, backgroundColor: '#2D9BF1', margin: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Amount</Text>
                </View>
                <View style={{ flex: 1.5, backgroundColor: '#2D9BF1', margin: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Date</Text>
                </View>

            </View>
            <FlatList data={filtered_data} keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem} />

            <Button title={'Upload Selected Item'} color={'#2D9BF1'} onPress={() => btnupload()} />


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