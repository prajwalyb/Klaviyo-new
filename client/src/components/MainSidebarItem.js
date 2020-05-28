import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPaperPlane , faNewspaper , faStream , faUsers , faUser, faChartBar ,  faCloud , faWifi , faList , faFile , faImage , faTag} from '@fortawesome/free-solid-svg-icons'

export const MainSidebarItem = ({ text, id ,href}) => {
    var icon;
    if(id==='dashboard')
        icon=faHome
    else if(id==='campaigns')
        icon=faPaperPlane
    else if(id==='flows')
        icon=faStream
    else if(id==='emailtemplate')
        icon=faNewspaper
    else if(id==='listsegments')
        icon=faUsers    
    else if(id==='profiles')
        icon=faUser
    else if(id==='metrics')
        icon=faChartBar    
    else if(id==='integrations')
        icon=faCloud
    else if(id==='datafeed')
        icon=faWifi    
    else if(id==='signupforms')
        icon=faList
    else if(id==='prefpages')
        icon=faFile
    else if(id==='imagelibrary')
        icon=faImage
    else if(id==='tags')
        icon=faTag
    return (
            <div className="list">
                <a href={href}>
                    <div className="list-link" >
                        <FontAwesomeIcon icon={icon} className="icon"/>
                        {text}
                    </div>
                </a>
            </div>
    )
}