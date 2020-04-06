import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PublishForm from './PublishForm';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PublishModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(0)
  const handleOpen = () => {
    setOpen(true);
    setCount(count + 1)
  };

  const handleClose = () => {
    setOpen(false);
    setCount(0)
  };

  const body = (
    <div style={modalStyle} className={classes.paper, "makeStyles-paper-1"} >
      
      <div id="simple-modal-description">
        <PublishForm open={open} setOpen={setOpen} handleClose={handleClose} count={count} setCount={setCount}/>
      </div>
      <PublishModal />
    </div>
  );

  return (
    <>
        {/* need a way to make this publish button visible only from main canvas page */}
      <button className="{`${count > 0 ? hidden : cursor publish }`}" onClick={handleOpen}> 
        Publish
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
