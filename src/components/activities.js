import React from 'react';
import { Strava } from 'strava';



class Activities extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const strava = new Strava({
            client_id: '59557',
            client_secret: '85b79d5ccde299291a4f2d9f697bd3f38dd6be2e',
            refresh_token: '95094e1cc58cc012e272c3334037d85ae3d13507',
          })
          
          ;(async () => {
            try {
              const activities = await strava.activities.getLoggedInAthleteActivities()
              console.log(activities)
            } catch (error) {
              console.log(error)
            }
          })()
    }
    

    render() {
      return (
        <div>
            <h1>Activities</h1>
        </div>
      )
    }
  }

export default Activities;