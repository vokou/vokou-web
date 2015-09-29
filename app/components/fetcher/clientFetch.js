import reqwest from 'reqwest';
import servers from '../../config/servers';

function getInfo(dataDOM, hotelURL, callBack, failCallBack) {
  _getInfo(dataDOM, hotelURL)
    .then((info) => {
      if (info.then)
        info.then(result => callBack(result));
      else
        callBack(info);
    })
    .catch((err) => {
      console.log(err);
      failCallBack()
    });
}

function _getInfo(dataDOM, hotelURL) {
  let params = {
    url: `${servers.proxy}/${hotelURL}`,
    method: 'get',
    withCredentials : true
  };
  return reqwest(params)
    .then((response) => {
      dataDOM.innerHTML = response;
      let rows = dataDOM.childNodes[0].querySelectorAll('tr');
      if (rows.length == 0) {
        //console.log('Enter');
        var promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            reqwest(params).then(response => resolve(response));
          }, 2000);
        });
        return promise.then((response) => {
          return fetchInfo(dataDOM, response);
        });
      } else {
        return fetchInfo(dataDOM, response);
      }
    });
}

function fetchInfo(dataDOM, response) {
  
  dataDOM.innerHTML = response;
  let rows = dataDOM.childNodes[0].querySelectorAll('tr');
  let minPrice = -1;
  let minURL = '';
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    // Filter out Ctrip
    if (!row.dataset.providercode || row.dataset.providercode === "CTE") {
      continue;
    }
    let anchorTag = row.querySelector('.hc_tbl_col2 a');
    if (anchorTag) {
      let url = anchorTag.href;
      url = url.substring(url.indexOf('Provider'));
      let price = parseInt(anchorTag.innerText.replace('$', '').replace(',', ''));
      if (minPrice < 0) {
        minPrice = price;
        minURL = url;
      } else if (price < minPrice) {
        minPrice = price;
        minURL = url;
      }
    }
  }
  return {
    url: minURL,
    price: minPrice
  }
}

export default getInfo;
