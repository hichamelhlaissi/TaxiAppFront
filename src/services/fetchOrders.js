
import {APIURL} from '../fetchURL'

export default {
    async fetchOrdersHistory() {
        try {
            let response = await fetch(APIURL+'/api/order');
            let responseJsonData = await response.json();
            return responseJsonData.data;
        }
        catch(e) {
            console.log(e)
        }
    },

    async fetchOrdersScheduled() {
        try {
            let response = await fetch(APIURL+'/api/order/orderscomfirmed');
            let responseJsonData = await response.json();
            return responseJsonData.data;
        }
        catch(e) {
            console.log(e)
        }
    },
    async fetchOrdersRequest() {
        try {
            let response = await fetch(APIURL+'/api/order/orderspending');
            let responseJsonData = await response.json();
            return responseJsonData.data;
        }
        catch(e) {
            console.log(e)
        }
    }
}
