import {Linking} from 'react-native'
export default class PaymenetHelper {

  constructor(props){

    this.cid = props.cid;
    this.uid = props.uid;
    this.items = props.items;
  }

  makePayment(){

    let doops = {
      cid : this.cid,
      uid : this.uid,
      items : this.items
    }

    fetch('https://api.namatel.com/api-order.php?action=new',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type': 'application/json',
        'Cache-Control' : 'none'
      },
      body: JSON.stringify(doops)
    }).then((response)=>response.json())
      .then((responseJson)=>{

        let url = 'http://namatel.com/app?action=payment&order_id='+responseJson.result_order_new.order_id;

        Linking.openURL(url)

      }).catch((error) => {
        console.error(error);
      });
  }

  printStatus(){
    console.log(
      'client id : ' + this.cid + '\n' +
      'user id : ' + this.uid + '\n' +
      'items in que : ' + this.items
    );
  }
}
