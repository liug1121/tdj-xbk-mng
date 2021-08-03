import * as API from './'
export default {
    getCardOrders: params => {
        return API.POST('/bigflow/manage/v1.0/card/orders', params)
      },
}