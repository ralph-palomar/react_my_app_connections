import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import React from 'react';

var Ons = require('react-onsenui');
var axios = require('axios');

function App() {
  return (
    <Ons.Page 
      renderToolbar={() =>
        <>
          <Ons.Toolbar>
            <div className="center">
              <b>My Connected Applications</b>
            </div>
          </Ons.Toolbar>
          <Ons.Card/>
          <Ons.Card>
            <Ons.List
                modifier="inset"
                dataSource={getAppList}
                renderRow={(row) => 
                  <>
                    <Ons.ListItem modifier="longdivider">
                      <div className="left">
                        <div>
                          <Ons.Icon size={{default:25}} icon={row.icon}></Ons.Icon> {row.app}
                        </div>                   
                      </div>
                      <div className="right">
                        {
                          row.status === "Disconnected" ? 
                            <Ons.Button modifier="outline" onClick={()=>window.open(row.authorizationLink)}>Connect</Ons.Button>
                          : <b>Connected</b>
                        }
                      </div>
                    </Ons.ListItem>
                  </>
                }
            ></Ons.List>
          </Ons.Card>
        </>
      }
    ></Ons.Page>
  );
}

async function getAppList() {
  const res = await axios.get('https://www.tes8.link/oauth/callback/apps', {
    auth: {
      username: process.env.REACT_APP_API_PYOAUTH_USERNAME,
      password: process.env.REACT_APP_API_PYOAUTH_PASSWORD
    }
  })

  if (res.status === 200) {
    var app_data = [
      {
        app: 'Twitter', 
        icon: 'fa-twitter',
        authorizationLink: 'https://www.tes8.link/oauth/callback/twitter/authorize'
      },
      {
        app: 'Google',
        icon: 'fa-google',
        authorizationLink: 'https://www.tes8.link/oauth/callback/google/authorize'
      }
    ]
    app_data.forEach((item, index) => {
      var conn = res.data.filter((connection) => {
        return connection.connection_type === item.app
      });
      if (conn) {
        item.status = "Connected"
      } else {
        item.status = "Disconnected"
      }
    });

    return app_data

  } else {
    return []
  }

}

export default App;
