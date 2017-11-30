
var xhr = new XMLHttpRequest();
xhr.open('get', 'http://opendata2.epa.gov.tw/UV/UV.json', true);
xhr.send(null);
xhr.onload = function () {
    var str = xhr.responseText;
    localStorage.setItem('environment', str);
    
    setTimeout(function () {
        location.reload();
    }, 10 * 60 * 1000);

    var data = JSON.parse(localStorage.getItem('environment'));
    var county = document.getElementById('county');
    var site = document.getElementById('site');
    var content = document.querySelector('.content');
    var stock = [];

    function chooseCounty(e) {
        var option = e.target.value;
        var add = '<option value="default">請選擇地區</option>';
        var len = data.length;
        stock = [];
        for (var i = 0; i < len; i++) {
            if (option == data[i].County) {
                add += '<option value="' + data[i].SiteName + '">' + data[i].SiteName + '</option>';
                stock.push(data[i]);
            }
        }
        site.innerHTML = add;
        content.innerHTML = '';
    }

    function chooseSite(e){
        var option = e.target.value;
        var add = '';
        var len = stock.length;
        for(var i = 0; i < len; i++){
            if (option == stock[i].SiteName) {
                add += '<li>Site Name: <span>' + stock[i].SiteName + '</span></li><li>Publish Time: <span>' + stock[i].PublishTime + '</span></li><li>UVI: <span>' + stock[i].UVI + '</span></li>';
            }
        }
        content.innerHTML = add;
    }
    county.addEventListener('change', chooseCounty, false);
    site.addEventListener('change', chooseSite, false);
};


$(document).ready(function() {
    $('#county').change(function(e){
        var check = e.target.value;
        if(check !== 'default'){
            $('#site').show();
        }else{
            $('#site').hide();
        }
    });
})