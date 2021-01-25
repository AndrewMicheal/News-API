let newsRow = document.getElementById('newsRow');
let header = document.getElementById("header");
let newsData = [];
let covid19Data = [];
let navLink = document.querySelectorAll('.nav-link');
let ctx = document.getElementById("myChart").getContext('2d');
let horizontalBar = document.getElementById("horizontalBar").getContext('2d');
let egyptDate = document.getElementById("egyptDate");
let news = document.querySelector('.news');
let NowDate = new Date();


egyptDate.innerHTML = `بتاريخ : ${NowDate.getDate()-1 + "-" + NowDate.getMonth()+1 + "-"+NowDate.getFullYear()}`

for(var j = 0; j < navLink.length; j++){
    navLink[j].onclick = function(){
       getNews(this.getAttribute("value"));
    }
}

async function getNews(value){
    // https://allorigins.win/
    $.getJSON(`http://api.allorigins.win/get?url=http%3A//newsapi.org/v2/top-headlines%3Fcountry%3Deg%26category%3D${value}%26apiKey%3D449c80bba22b4c5591142572047fdb37&callback=?`, function (data) { 
        let apiResponse = JSON.parse(data.contents).articles;
        newsData = apiResponse;
        displayNews();
    });
}

getNews("business");
function displayNews(){
    let news = ``;
    
    for(var i = 0; i < newsData.length; i++){
        if(newsData[i].description!=null && newsData[i].urlToImage!=null){
            news+= ` <div class="col-lg-4 col-md-12 my-2">
            <div class="news-item card text-center pb-3 my-3" onclick = goTotheNew(${i})>
                <div class = "image">
                    <img src = ${newsData[i].urlToImage}  class="w-100" alt="" srcset="">
                </div>
                <span>${newsData[i].title}</span>
                <p>${newsData[i].description}</p>
            </div>
         </div>`
        }
    }
    newsRow.innerHTML = news;
}
{/* <span class = "text-info">بتاريخ : ${date}</span> */}
function goTotheNew(value){
    window.open(newsData[value].url,'_blank');
}

async function getCovid19(){
    let apiRequest = await fetch(`https://covid-api.mmediagroup.fr/v1/cases`);
    let apiResponse = await apiRequest.json();
    covid19Data = apiResponse;
    covid19Data = apiResponse.Egypt.All;
    let allData = apiResponse;
    pieChart();
    horziontalBar();
}
getCovid19();

function pieChart(){

    var chartElement = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['اجمالى الوفيات', 'اجمالى الاصابات', 'اجمالى المتعافين'],
        datasets: [{
            data: [
                covid19Data.deaths,
                covid19Data.confirmed,
                covid19Data.recovered
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
   
});
}

function horziontalBar(){
    let chartElement = new Chart(horizontalBar, {
        type: 'horizontalBar',
        data: {
            labels: ['اجمالى الوفيات', 'اجمالى الاصابات', 'اجمالى المتعافين'],
            datasets: [{
                label : 'Covid 19',
                data: [
                    covid19Data.deaths,
                    covid19Data.confirmed,
                    covid19Data.recovered
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
       
    });
}

// Scroll Event 
$(window).scroll(function(){
    let scroll = $(window).scrollTop();
    if(scroll >= $(news).offset().top){
        $(header).css({"background-color":"#007bff" , "transition":"background-color .5s"})
    }
    else{
        $(header).css("background-color","#373737")
    }
})