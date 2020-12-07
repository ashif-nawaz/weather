let button = document.querySelector(".myId");
let container = document.querySelector(".container");
let items = document.querySelectorAll(".item");
let city = document.getElementById("city");
let region = document.getElementById("region");
let time = document.getElementById("time");
let date = document.getElementById("date");
let temperature = document.getElementById("temp");


let latt = "", longi = "";
getCoords(assignCords);

function getCoords(callback){
      let geoLocation = window.navigator.geolocation;
      geoLocation.getCurrentPosition(function(position){
             callback(position.coords);
      }, function(error){
             console.log(error.message);
      });
}

function assignCords(lattNlong){
     latt = lattNlong.latitude;
     longi = lattNlong.longitude;
     getData("http://api.weatherapi.com/v1/current.json?key=33be99f2d7a94580ba3124307200712&q=" + latt + "," + longi, display);
}



function getData(url, callback){
      let xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, true);
            xhttp.onload = function(){
                  if(this.status == 200){
                        callback(this.response);
                  }else{
                        alert(this.status);
                  }
            }
            xhttp.onerror = function(){
                  alert("something went wrong");
            }

            xhttp.send();
}


function display(rsp){
      let weatherJson = JSON.parse(rsp)
      city.innerHTML = weatherJson.location.name;
      region.innerHTML = weatherJson.location.region;
      let d = new Date();
      let minutes = d.getMinutes();
        if(minutes < 10){
              minutes = "0" + minutes;
        }
      let hour = d.getHours();
      if(hour > 12){
            hour -= 12; 
      }
      if(hour < 10){
            hour = "0" + hour;
      }

      time.innerHTML = hour + ":" + minutes;
      let day = "";
      let isDay = weatherJson.current.is_day;
      if(isDay == 0){
            isDay = 1;
      }
      switch(isDay){
            case 1: day = "Monday";
                        break;
            case 2: day = "Tuesday";
                        break;
            case 3: day = "Wednesday";
                        break;
            case 4: day = "Thursday";
                        break;
            case 5: day = "Friday";
                        break;
            case 6: day = "Saturday";
                        break;
            case 7: day = "Sunday";
                        break;
            default: "Someday";

      }

      let tarik = d.getDate();
      let month = d.getMonth();

      switch(month + 1){
            case 1: month = "Jan";
                        break;
            case 2: month = "Feb";
                        break;
            case 3: month = "Mar";
                        break;
            case 4: month = "Apr";
                        break;
            case 5: month = "May";
                        break;
            case 6: month = "Jun";
                        break;
            case 7: month = "Jul";
                        break;
            case 8: month = "Aug";
                        break;
            case 9: month = "Sep";
                        break;
            case 10: month = "Oct";
                        break;
            case 11: month = "Nov";
                        break;
            case 12: month = "Dec";
                        break;
            default: "SomeMonth";

      }


      date.innerHTML = day + ", " + tarik + " " + month + ", " + d.getFullYear();
      temperature.innerHTML = weatherJson.current.feelslike_c + " °c";
      console.log(weatherJson);
 
}
