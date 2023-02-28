import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Savelogin_id = async (id) => {
    try {
        await AsyncStorage.setItem('login_id', id.toString());

    } catch (e) {
        console.log('error ::', e)
    }
}

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

export async function selectUserQuery(login_data, callback = () => { }) {
    let selectQuery = await ExecuteQuery("SELECT * FROM login_user", []);
    var rows = selectQuery.rows;
    if (rows.length > 0) {
        for (let i = 0; i < rows.length; i++) {
            var item = rows.item(i);
            if (item.uname == login_data.uname && item.password == login_data.password) {
                Savelogin_id(item.id)
                callback('login_success')
            } else {
                callback('invalid')

            }
        }
    } else {
        callback('invalid')
    }





}

export async function sync_userdata() {
    await ExecuteQuery("DELETE FROM login_user", []);
    await axios.get(`https://samplerest.vercel.app/api/getUsers`,
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

    let query = "INSERT OR IGNORE INTO login_user (id,uname,password,fname,lname,date_created) VALUES";

    for (let i = 0; i < data.length; ++i) {

        query = query + `(
            ${data[i].id},
            "${data[i].uname}",
            "${data[i].password}",
            "${data[i].fname}",
            "${data[i].lname}",
            "${data[i].date_created}"
           
            )` ;

        if (i != data.length - 1) {
            query = query + ",";
        }
    }

    ExecuteQuery(query, []);
}