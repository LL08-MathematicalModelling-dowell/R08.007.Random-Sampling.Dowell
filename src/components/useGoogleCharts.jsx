import { useEffect, useState } from "react";

function useGoogleCharts () {
  const [google, setGoogle] = useState(null);
    
    useEffect(() => {
      
        if (!google) {
            //TODO load google charts
          
            const head = document.head;
let script = document.getElementById('googleChartsScript');

if(script){
    script.remove();
}
    
    script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.id = 'googleChartsScript';
    //console.log("window google before load", window.google)
    script.onload = () => {
     
        setGoogle(window.google);
        if (window.google && window.google.charts) {
            window.google.charts.load('current', {'packages':['corechart']});
        
            window.google.charts.setOnLoadCallback(() => setGoogle(window.google))
          
        }
    };
    console.log("window google1 ",window.google)
    head.appendChild(script);
} else if (window.google && window.google.charts && window.google.visualization) {
    setGoogle(window.google);
   
}
        

       
   }, [google]);

  return google;
}

export default useGoogleCharts;