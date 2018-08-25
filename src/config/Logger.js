import {AsyncStorage} from 'react-native'

const logTraceKey = "log_trace_key";

export default class Logger {
  static instance = null;
  static timestamp;

  constructor(){

  }

  static getInstance(){
    if (this.instance === null) {
      this.instance = new Logger()
      this.instance.newLogSession()
    }
    return this.instance
  }

  newLogSession(){

    console.log("generating a new log session");

    timestamp = Math.round(new Date().getTime()/1000)

    var sessionLog = {
      bulk_id : timestamp,
      uid:1,
      logs : []
    }

    //Save a Reference from the Log
    AsyncStorage.getItem(logTraceKey).then((value)=>{
      valueJson = JSON.parse(value);
      valueJson.push({
        timestamp : timestamp,
        uploaded : false,
      })
      AsyncStorage.setItem(logTraceKey , JSON.stringify(valueJson))
    })

    //Save Session Log
    AsyncStorage.setItem(timestamp.toString(), JSON.stringify(sessionLog))

    AsyncStorage.setItem(logTraceKey,JSON.stringify([]))

    console.log("Session log generated");
    console.log(sessionLog);

  }

  addVideoLog(item){
    console.log("video log added");

    let date = Math.round(new Date().getTime()/1000)

    let log = {
      nid : 1,
      initial_time : date,
      video_logs : []
    };

    AsyncStorage.getItem(timestamp.toString()).then((value)=>{
      valueJson = JSON.parse(value)
      valueJson.logs.push(log)

      console.log(valueJson)

      AsyncStorage.setItem(timestamp.toString(),JSON.stringify(valueJson))
    })
  }

  addVideoLogAction(item){

    console.log("Video Action Log Added");

    let video_log = {
      action : item.action,
      video_current_time : 0, //item.getCurrentTime
      generate_date : Math.round(new Date().getTime()/1000)
    }

    AsyncStorage.getItem(timestamp.toString()).then((value)=>{
      valueJson = JSON.parse(value)

      valueJson.logs[valueJson.logs.length-1].video_logs.push(video_log)

      console.log(valueJson)

      AsyncStorage.setItem(timestamp.toString(),JSON.stringify(valueJson))
    })
  }

  uploadLogSessions(){

    AsyncStorage.getItem(logTraceKey).then((value)=>{

      console.log(JSON.parse(value).length);

      valueJson = JSON.parse(value)

      valueJson.map((item)=>{
        if (!item.uploaded) {
          console.log(item);
          item.uploaded = true
          //change uploaded status

          AsyncStorage.getItem(item.timestamp.toString()).then((value)=>{
            console.log(JSON.parse(value));
            console.log(value);

            fetch('https://api.namatel.com/api-log.php?action=log_action_app_bulk', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: value
            }).then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
            }).catch((error) => {
              console.error(error);
            });

          })
        }
      })

      AsyncStorage.setItem(logTraceKey,JSON.stringify(valueJson))
    })
  }

  garbageCollect(){
    //in this part we need to separate the uploaded files and update the traces
    AsyncStorage.getItem(logTraceKey).then((value)=>{
      valueJson = JSON.parse(value)

      valueJson.map((item)=>{
        if (item.uploaded) {
          //remove session with item timestamp
          AsyncStorage.removeItem(item.timestamp.toString())
        }
      })
    })
  }
}
