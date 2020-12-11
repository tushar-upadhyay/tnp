import { Paper, Typography } from "@material-ui/core";
import React from "react";

import RefreshIcon from "@material-ui/icons/Refresh";
export default  function Tile(props){
    return (
        <Paper style={{width:"250px",height:100}}>
        <div style={{height:'100%',justifyContent:'space-evenly',display:'flex',alignItems:'center'}}>
          <props.icon style={{fontSize:'40',color:props.color}}/>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-end'}}>
            <Typography variant="h6" component="p">
                {props.title}
            </Typography>
            <Typography variant="h3" component="h1">
               {props.value}
            </Typography>
          </div>
          
        </div>
        {/* <hr style={{width:'100%'}}/> */}
        {/* <div style={{justifyContent:'center',alignItems:'flex-start',display:'flex',flexDirection:'row',color:'#9D968C'}} >
         <RefreshIcon/>Refresh
        </div> */}
      </Paper>
    );
}