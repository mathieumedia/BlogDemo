import React from 'react';
import Copyright from './Copyright';
import SimpleBar from 'simplebar-react';

import Header from './Header'

export default function MainContainer(props) {
    return (
        <SimpleBar style={{maxHeight:'100vh'}} forceVisible='y' autoHide={false}>
            <Header  />
            <div style={{paddingBottom: '5rem'}}>
                {props.children}
            </div>
            
            <Copyright  />
        </SimpleBar>
    )
}
