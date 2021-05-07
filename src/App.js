import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import React, { useEffect, useState } from 'react';

const Ons = require('react-onsenui');
const axios = require('axios');

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
                        <Ons.Button modifier="outline" disabled={row.enabled} onClick={()=>window.open(row.authorizationLink)}>{row.status}</Ons.Button>
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
  const token = await axios.get('https://www.tes8.link/oauth/callback/token');
  const res = await axios.get('https://www.tes8.link/oauth/callback/apps', {
    auth: {
      "username": "X-API-KEY",
      "password": token.data.token
    }
  });

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
        item.connection_name = conn[0].connection_name;
        item.status = "Connected";
        item.enabled = true;
      } else {
        item.status = "Connect";
        item.enabled = false;
      }

      return item;
    });
  }

  return app_data;

}

export default App;
