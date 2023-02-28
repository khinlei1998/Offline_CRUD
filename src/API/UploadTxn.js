import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    global.db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
        },
            (error) => {
                reject(error);
            });
    });
});

export async function selectTaxQuery() {

    const selectQuery = await ExecuteQuery("SELECT * FROM create_txn", []);
    var rows = selectQuery.rows;
    var tax_list = []
    for (let i = 0; i < rows.length; i++) {
        var list = rows.item(i);
        tax_list.push({ ...list, selected: false })
    }
    return tax_list;
}

export async function delete_tax(id) {
    let selectQuery = await ExecuteQuery("DELETE FROM create_txn WHERE id = " + id, []);
    console.log('success');
}

export async function syn_delete_tax(selected_id, callback = () => { }) {
    for (var i = 0; i < selected_id.length; i++) {
        let selectQuery = await ExecuteQuery("DELETE FROM create_txn WHERE id = " + selected_id[i], []);
        callback("delete_success")
    }
}

export async function sync_txnupload(txn_data, callback = () => { }) {

    for (var i = 0; i < txn_data.length; i++) {

        await axios.post(`https://samplerest.vercel.app/api/txn`,
            {
                "data": txn_data[i].data
            },
            {

                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(({ data }) => {

                return new Promise(function (resolve, reject) {
                    if (data.status == 'success') {
                        callback("success")
                    } else {
                        callback("fail")
                    }
                });
            })
            .then(error => console.log(error))
    }

}



export async function upload_txn(txn_data, callback = () => { }) {
    const selectQuery = await ExecuteQuery(`SELECT * FROM create_txn ORDER BY id DESC LIMIT 1`, []);
    var last_id = 1;

    if (selectQuery.rows.length) {
        last_id = selectQuery.rows.item(0).id;
        last_id = last_id + 1;
    }

    return InsertData(txn_data, last_id)
}

const InsertData = async (data, a_id) => {
    const login_id = await AsyncStorage.getItem("login_id")

    let query = "INSERT OR IGNORE INTO create_txn (id,cus_name,dob,amount,note,txn_date,login_id) VALUES";

    query = query + `(
            ${a_id},
            "${data.cus_name}",
            "${data.dob}",
            "${data.amount}",
            "${data.note}",
            "${data.txn_date}",
            "${login_id}"
           
            )` ;

    ExecuteQuery(query, []);
    return { status: "success", }
}