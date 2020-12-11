import React from "react";
import Chart from "react-google-charts";

export default function Charts(props) {
  const data = [['value','transactions']];
  let counter = 1;
  for (let d of props.data.reverse()){
    if(d['type']=='credit'){
    data.push([counter.toString(),parseFloat(d['amount'])]);
    counter++;
    }
   
  }
  console.log(data)
    return (
      <div className="App">
        <Chart
        
          options={{
           
            legend:{
              position:'none'
            },
          
            hAxis: {
              textPosition:'none',
              title:'Time-->',
            
            },
            vAxis: {
              title:'Transactions Amount',
              textPosition:'none',

             
            },
          }}
          curveType="function"
          chartType="AreaChart"
          width="100%"
          height="400px"
          data={data}
        />
      </div>
    );
}
