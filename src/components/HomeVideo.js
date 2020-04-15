import React from 'react';
import { Link } from "react-router-dom";

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

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <p className='learn'>Learn More</p>
          {/* insert terinary toggleing up 	&uArr and down &dArr arrow */}
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
                    <p>No programming background needed</p>
                </div>
                <div>
                    {/* i need to find/add the images from the figma and 32% flexbox them */}
                    <p>Quickly create, update, and save apps</p>
                </div>
                <div>
                    {/* i need to find/add the images from the figma and 32% flexbox them */}
                    <p>Easily see what you create</p>
                </div>
            </div>
            <Link className='startLink' to ="/login">Get Started</Link>
        </ExpansionPanelDetails>
      </ExpansionPanel>
     
    </div>
  );
}
