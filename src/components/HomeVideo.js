import React from 'react';
import { Link } from "react-router-dom";
import {IoIosCode, IoMdCreate, IoMdPhonePortrait} from "react-icons/io"
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';



const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, 0)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderBottom: '1px solid rgba(0, 0, 0, 0)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '1%',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function HomeVideo() {
    const [expanded, setExpanded] = React.useState('panel1');
    const [learningOpen, setLearningOpen] = React.useState(false)
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    setLearningOpen(!learningOpen)
  };


  return (
    <div>
      <ExpansionPanel square onChange={handleChange('panel1')}>        
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          {/* <p className='learn'>Learn More   </p> */}
          {learningOpen ? <p className='learn'>Learn More {"\n"}{"\n"} {String.fromCharCode(8679)}</p> : <p className="learn"> Learn More {"\n"}{"\n"} {String.fromCharCode(8681)} </p>}
          {/* insert ternary toggling up 	&uArr and down &dArr arrow as well as the panel1 on 60 so that it default to closed but will toggle open/close */}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className ='tab-container'>
            <iframe
                title="demo"
                width="1024"
                height="576"
                src="https://www.youtube.com/embed/nFO9hyGIBrU"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe><br/>
            <div className='in-thirds'>
                <div>
                    {/* i need to find/add the images from the figma and 32% flexbox them */}
                    <IoIosCode color='black' size='10rem' />
                    <p>No programming background needed</p>
                </div>
                <div>
                    {/* i need to find/add the images from the figma and 32% flexbox them */}
                    <IoMdCreate color='black' size='10rem'/>
                    <p>Quickly create, update, and save apps</p>
                </div>
                <div>
                    {/* i need to find/add the images from the figma and 32% flexbox them */}
                    <IoMdPhonePortrait color='black' size='10rem'/>
                    <p>Easily see what you create</p>
                </div>
            </div>
            <Link className='startLink' to ="/login">Get Started</Link>
        </ExpansionPanelDetails>
      </ExpansionPanel>     
    </div>
  );
}