import React from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faEnvelope , faUser , faClock , faCodeBranch, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FlowChartWithState , INodeDefaultProps , IPortDefaultProps } from '@mrblenny/react-flow-chart'
import { connect } from 'react-redux';
import { withRouter , Redirect } from 'react-router-dom';
import { Container, Row, Col , Alert } from 'reactstrap';

import { chartSimple } from '../components/flows/DefaultChart'
import FlowNavBar from '../components/flows/FlowNavBar.js';
import { Page } from '../components/flows/Flowchart-Page'
import { DragAndDropSidebar } from '../components/flows/Flowchart-Sidebar';
import { TriggerSideBar , UpdateProfileSideBar , TimeDelaySideBar , EmailSideBar , ConditionalSplitSideBar } from '../components/flows/SelectedItemSidebar';
import { API_URL } from '../helpers/utils.js';
import { saveFlow } from '../actions/flowActions.js';
import { clearNotifications} from '../actions/popUpActions.js';


const DefaultNode = styled.div`
  position: absolute;
  padding: 12px;
  background: #D9E0E7;
  color: #606A72;;
  border: 2px solid transparent;
  box-shadow: 0 1px 2px rgba(98,111,126,.66);
  width: 305px;
  box-sizing: border-box;
  justify-content: space-between;
  display:flex;
  flex-direction: column;
  &:hover{
        box-shadow: 0 0 6px rgba(43,152,211,.5);
        border: 2px solid rgba(43,152,211,.5);
  }
`
const Actions = styled.div`
  position: absolute;
  padding: 12px;
  background: #FFF;
  color: #606A72;
  border: 2px solid transparent;
  box-shadow: 0 1px 2px rgba(98,111,126,.66);
  width: 305px;
  box-sizing: border-box;
  justify-content: space-between;
  display:flex;
  flex-direction: column;
   &:hover{
        box-shadow: 0 0 6px rgba(43,152,211,.5);
        border: 2px solid rgba(43,152,211,.5);
  }
`
const Timing = styled.div`
  position: absolute;
  padding: 0 14px;
  background: #ECF3F5;
  color: #606A72;
  border: 2px solid transparent;
  box-shadow: 0 1px 2px rgba(98,111,126,.66);
  width: 305px;
  min-height:10x;
  box-sizing: border-box;
  justify-content: space-between;
  display:flex;
  flex-direction: column;
  &:hover{
        box-shadow: 0 0 6px rgba(43,152,211,.5);
        border: 2px solid rgba(43,152,211,.5);
  }
`
const EndNode = styled.div`
  position: absolute;
  background: #F6F8F9;
  color: #606A72;
  border: 2px solid transparent;
  box-shadow: 0 1px 2px rgba(98,111,126,.66);  
  box-sizing: border-box;
  justify-content: space-between;
  display:flex;
  flex-direction: column;
  &:hover{
        box-shadow: 0 0 6px rgba(43,152,211,.5);
        border: 2px solid rgba(43,152,211,.5);
  }
`
const CanvasOuterCustom = styled.div`
  position: relative;
  background-color: #F6F8F9;
  width: 100%;
  height: 100%;
`
const PortDefaultOuter = styled.div`
  width: 16px;
  height: 16px;
  background: #BAC2CA;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:50%;
`

const NodeCustom = React.forwardRef(({ node, children, ...otherProps }: INodeDefaultProps, ref: React.Ref<HTMLDivElement>) => {
  if (node.type === 'Email' || node.type === 'Update Profile Property') {
    return (
      <Actions ref={ref} {...otherProps} >
          {children}
      </Actions>
    )
  } else if (node.type === 'Time Delay') {
    return (
      <Timing ref={ref} {...otherProps}>
          {children}
      </Timing>
    )
  } 
  else if (node.type === 'End') {
    return (
      <EndNode ref={ref} {...otherProps}>
          {children}
      </EndNode>
    )
  } 
  else {
    return (
      <DefaultNode ref={ref} {...otherProps}>
          {children}
      </DefaultNode>
    )
  }
})

const PortCustom = (props: IPortDefaultProps) => (
  <PortDefaultOuter>
    { props.port.properties && (
      <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
        <path fill="white" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg>
    )}
  </PortDefaultOuter>
)

class Flow extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       chart:this.props.flow.flow_body,
       sidebar:'Default'
    }
  }

  componentDidUpdate(prevProps){
        const { popUp } = this.props;
        if(popUp !== prevProps.popUp){
            if(popUp.notification){
                this.setState({
                    notification:popUp.notification
                })
                setTimeout(() => {
                    this.props.clearNotifications();   
                }, 1700);
            }
        else this.setState({
                notification:null
            }) 
        }          
    }

  NodeInnerCustom = ({ node, config }: INodeInnerDefaultProps) => {
    var icon;
    if (node.type === 'When someone Active on Site') 
      icon=faBolt;
    else if (node.type === 'Email')
      icon=faEnvelope
    else if (node.type === 'Update Profile Property')
      icon=faUser
    else if (node.type === 'Time Delay')
      icon=faClock
    else if (node.type === 'Conditional split' || node.type === 'Trigger split')
      icon=faCodeBranch
    if (icon) 
      return (
        <div className="placed-component-body" style={{marginTop:'10px'}}>
          <div className="placed-component-icon-container">
              <div className="placed-component-icon-background">
                  <FontAwesomeIcon icon={ icon} className="icon"/>
              </div>
          </div>
          {node.type}
          <a onClick={this.NodeSettings.bind(this,node)} className="settings"><FontAwesomeIcon icon={faEllipsisH} className="fa-1x" style={{marginRight:'10px', color:"#949AA3"}} /></a>
        </div>
      )
    else 
      return <div style={{margin:'10px'}}>{node.type}</div>    
  }

  NodeSettings = (node) => {
    if(node.type==="When someone Active on Site")
      this.setState({
        sidebar:'When someone Active on Site'
      })
    else if(node.type==="Update Profile Property")
      this.setState({
        sidebar:'Update Profile Property'
      })
    else if(node.type==="Time Delay")
      this.setState({
        sidebar:'Time Delay'
      })
    else if(node.type==="Email"){
      this.setState({
        sidebar:'Email'
      })
    } else if(node.type==="Conditional split")
      this.setState({
        sidebar:'Conditional split'
      })
    else if(node.type==="Conditional split")
      this.setState({
        sidebar:'Conditional split'
      })       
    console.log(node)
  }

  switchtoDefaultSidebar = () => {
    this.setState({
        sidebar:'Default'
      })
  }

  saveFlowIT=()=>{
   console.log("saved",this.state.chart)
    this.props.saveFlow(this.state.chart)
  }  

  render () {     
   if(this.props.flow.flow_id && this.props.flow.flow_name){
      return (
        <>
          <Container fluid={true}>
          <FlowNavBar saveFlowIT={this.saveFlowIT}/>
          {
              this.state.notification ? (
                  <Alert color="success" style={{marginLeft:'40%' , textAlign:'center', fontSize:'20px', width:'25%'}}>{this.state.notification}</Alert>  
              ) : null                                                         
          }
          <Page>
              {
                (()=>{
                  if(this.state.sidebar==='When someone Active on Site')
                    return <TriggerSideBar switchtoDefaultSidebar={this.switchtoDefaultSidebar} />
                  else if(this.state.sidebar==='Update Profile Property')
                    return <UpdateProfileSideBar switchtoDefaultSidebar={this.switchtoDefaultSidebar} />
                  else if(this.state.sidebar==='Time Delay')
                    return <TimeDelaySideBar switchtoDefaultSidebar={this.switchtoDefaultSidebar} />
                  else if(this.state.sidebar==='Email')
                    return <EmailSideBar switchtoDefaultSidebar={this.switchtoDefaultSidebar} />
                  else if(this.state.sidebar==='Conditional split')
                    return <ConditionalSplitSideBar switchtoDefaultSidebar={this.switchtoDefaultSidebar} />
                  // else if(this.state.sidebar==='Trigger split')
                  //   return <ConditionalSplitSideBar switchtoDefaultSidebar={this.switchtoDefaultSidebar} />
                  else return <DragAndDropSidebar/>
                })()
              }
              <FlowChartWithState 
                initialValue={this.state.chart} 
                config={{
                    smartRouting: true ,
                    snapToGrid: true,
                    validateLink: ({ linkId, fromNodeId, fromPortId, toNodeId, toPortId, chart }) => {
                      //console.log(chart.nodes[fromNodeId].type)
                      if (chart.nodes[fromNodeId].ports[fromPortId].type === 'bottom' && chart.nodes[toNodeId].ports[toPortId].type === 'top') return true
                      else{
                        return false
                      }
                    }
                }}
                Components={ {
                  Node: NodeCustom,
                  CanvasOuter: CanvasOuterCustom,
                  Port: PortCustom,
                  NodeInner: this.NodeInnerCustom,
                }}
              />                 
          </Page>
          </Container>
        </>
      )
    } else {
      return(
        <Redirect to='/flow' />
      )
   }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  flow: state.flow,
  popUp:state.popUp
})

export default connect( mapStateToProps , { saveFlow ,clearNotifications } )(withRouter(Flow));
