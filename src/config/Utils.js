
export default class Utils {

  static __instance = null;

  static getInstance(){
    if (this.__instance === null) {
      this.__instance = new Utils();
    }
    return this.__instance;
  }

  clearUser(){
    AsyncStorage.setItem('user_info',JSON.stringify({number:0}))
  }

  alt(str) {

        let englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

        let current = [];

        str = str + '';

        for (var i = 0; i < str.length; i++) {
            if (englishNumbers.indexOf(str.charAt(i)) != -1) {

                var character = parseInt(str.charAt(i));

                current.push(persianNumbers[character])
            } else {
                current.push(str.charAt(i))
            }
        }

        return current;
    }

}
