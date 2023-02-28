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

export async function delete_downloadtax(id) {
    let selectQuery = await ExecuteQuery("DELETE FROM download_txn WHERE id = " + id, []);
    console.log('success');
}


export async function selectDownloadTaxQuery() {
    const login_id = await AsyncStorage.getItem("login_id")

    const selectQuery = await ExecuteQuery("SELECT * FROM download_txn", []);
    var rows = selectQuery.rows;
    var download_txn_list = []
    for (let i = 0; i < rows.length; i++) {
        var list = rows.item(i);
        download_txn_list.push({ id: list.id, cus_name: list.cus_name, amount: `${list.amount}`, txn_date: list.txn_date, dob: list.dob, note: list.note, login_id: list.login_id })
        // if (login_id == list.login_id) {
        //     download_txn_list.push({ id: list.id, cus_name: list.cus_name, amount: `${list.amount}`, txn_date: list.txn_date, dob: list.dob, note: list.note, login_id: list.login_id })

        // }
    }
    return download_txn_list
}

export async function sync_downloadtxn() {
    await ExecuteQuery("DELETE FROM download_txn", []);
    const login_id = await AsyncStorage.getItem("login_id")

    await axios.get(`https://samplerest.vercel.app/api/txn?loginId=${login_id}`,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
        .then(({ data }) => {
            return new Promise(function (resolve, reject) {
                if (data.status == 'success') {
                    InsertData(data.data);
                    setTimeout(() => {
                        resolve({ "message": data.status });
                    }, 1000);

                } else {

                    setTimeout(() => {
                        reject({ "message": "error" });
                    }, 1000);

                }
            });
        })
        .then(error => console.log(error));
}

const InsertData = (data) => {

    let query = "INSERT OR IGNORE INTO download_txn (id,cus_name,dob,amount,note,txn_date,login_id) VALUES";

    for (let i = 0; i < data.length; ++i) {


        query = query + `(
            ${data[i].id},
            "${data[i].cus_name}",
            "${data[i].dob}",
            "${data[i].amount}",
            "${data[i].note}",
            "${data[i].txn_date}",
            "${data[i].login_id}"
           
            )` ;
        if (i != data.length - 1) {
            query = query + ",";
        }
    }

    ExecuteQuery(query, []);
}