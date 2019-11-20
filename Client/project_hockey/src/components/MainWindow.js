import React from 'react';
import CalendarBlock from './CalendarBlock';
import Usersearch from './UserSearch';

class MainWindow extends React.Component {
  render()
      { 
        return (
          <div>
            <h1>Man window man </h1>
            <div>
              <CalendarBlock UserInfo={this.props.UserInfo} />
            </div>
            <div>
              <Usersearch />
            </div>
          </div>
        )
      }
  
}

export default MainWindow;