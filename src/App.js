import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import React, { useEffect, useState } from 'react';

var Ons = require('react-onsenui');
var axios = require('axios');

function App() {
  const [conn, setConn] = useState([]);

  useEffect(() => {
    getAppList().then((app_list) => {
      setConn(app_list);
    })
  }, [])

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
                dataSource={conn}
                renderRow={(row) => 
                  <>
                    <Ons.ListItem modifier="longdivider">
                      <div className="left">
                        <div>
                          <Ons.Icon size={{default:25}} icon={row.icon}></Ons.Icon> {row.app}
                        </div>                   
                      </div>
                      <div className="right">
                        <Ons.Button modifier="outline" onClick={()=>window.open(row.authorizationLink)}>Connect</Ons.Button>
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
  const res = await axios.get(process.env.REACT_APP_API_PYOAUTH_BASEURL+'/oauth/callback/apps', {
    auth: {
      username: process.env.REACT_APP_API_PYOAUTH_USERNAME,
      password: process.env.REACT_APP_API_PYOAUTH_PASSWORD
    }
  })

  var app_data = [];

  if (res.status === 200) {
    const conn_data = [
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
    app_data = conn_data.map((item) => {
      var conn = res.data.filter((connection) => {
        return connection.connection_type === item.app
      });

      if (conn) {
        item.connection_name = conn[0].connection_name
        item.status = "Connected"
      } else {
        item.status = "Disconnected"
      }

      return item;
    });
  }

  return app_data;

}

export default App;
