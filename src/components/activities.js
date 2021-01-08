import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Strava } from 'strava';
import ActivityItem from './activityItem'



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
              const activities = await strava.activities.getLoggedInAthleteActivities({'per_page': 100})
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
                <ActivitiesWrapper>
                    
                    {storeActivities.map(({ id, name, distance, type = 'Run', average_speed, map, average_cadence, moving_time, total_elevation_gain  }) => 
                        <StyledLink key={id} to={`/activity/${id}`}>
                            <ActivityItem
                                type={type}
                                id={id}
                                cadence={average_cadence}
                                time={moving_time}
                                elevation={total_elevation_gain}
                                distance={(distance / 1000).toFixed(2)}
                                speed={average_speed}
                                map={map.summary_polyline}
                                />
                        </StyledLink>
                    )}
                    
                </ActivitiesWrapper>
            )
        }
    }
  }

const ActivitiesWrapper = styled.div`
display:grid;
width:100vw;
grid-template-columns:repeat(12, 1fr);
gap:0
`


 const StyledLink = styled(Link)`
 text-decoration:none;
 text-align:left;

 grid-column:span 4;
 color:#444;
 transition:color 250ms ease;

 &:hover{
     color:black;
 }
`
export default Activities;