import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Strava } from 'strava';



class Activities extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            storeActivities: []
        }
    }

    componentDidMount() {
        const strava = new Strava({
            client_id: '59557',
            client_secret: '85b79d5ccde299291a4f2d9f697bd3f38dd6be2e',
            refresh_token: '481bb00a06db5639e61f461a8f77bd9641a09db1',
          })

                  
          ;(async () => {
            try {
              const activities = await strava.activities.getLoggedInAthleteActivities()
              this.setState({
                  isLoaded: true,
                  storeActivities:activities
              })
              console.log(activities)
            } catch (error) {
              console.log(error)
            }
          })()
    }
    

    render() {

        var {storeActivities, isLoaded} = this.state;
        if(!isLoaded) {
            return(
                <h3>Fetching data…</h3>
            )
        } else { 
            return (
                <div>
                    <h1>Activities</h1>
                  
                    {storeActivities.map(({ id, name, distance }) =>
                        <Activity key={id}>{(distance / 1000).toFixed(2)}km</Activity>
                    )}
                    
                </div>
            )
        }
    }
  }

 const Activity = styled.div`
letter-spacing:-0.025em;
font-size:5vw;
font-family:Helvetica Neue;
 ` 

export default Activities;