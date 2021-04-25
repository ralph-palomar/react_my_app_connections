import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import React from 'react';

var Ons = require('react-onsenui');

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
                dataSource={
                  [
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
                }
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

export default App;
