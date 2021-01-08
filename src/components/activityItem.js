import React, { useEffect, useState } from 'react';
import polyline from '@mapbox/polyline';

import styled from 'styled-components';

function ActivityItem(props) {
    const { distance = '', speed, map = '', cadence, type, time, elevation} = props
    const [ isActive, setActive ] = useState(false);
    const toggleActive = () => setActive(value => !value)


    if(map) {
        var mapdata = polyline.decode(map);
    }

    function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
    
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay; 
    }

    function pace(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
    
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
        return hDisplay + mDisplay + sDisplay; 
    }
    
   

    return(
        <Activity onClick={toggleActive}>
            {distance} km
            {isActive && 
               <ActivityInner>
                   <li>Type: {type}</li>
                   <li>Pace: {pace((time) / (distance)) }/km</li>
                   <li>Elevation: {elevation}</li>
                   <li>Time: {secondsToHms(time)} </li>

                   <li>Cadence: {   cadence}</li>
               </ActivityInner>
            }
            
            
        </Activity>
    )
}




const Activity = styled.div`
letter-spacing:-0.025em;
border-left:1px solid #ccc;
border-bottom:1px solid #ccc;
padding:.25em;
font-size:5vw;
font-family:Helvetica Neue;
 ` 
const Mapdata = styled.div`
font-size:0.8rem;
font-family:monospace;
`;


const MapInfo = styled.div`
    display:block;
    clear:both;
    float:left;
`

const ActivityInner = styled.ul`
margin:0;
padding:0;
font-size:16px;
letter-spacing:0;
li {
    list-style-type:none;
}
`
export default ActivityItem
