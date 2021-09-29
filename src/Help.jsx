import React from 'react';
import { Dialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
export default class Help extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {Open:false}
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen()
    {
        this.setState({Open:true})
    }

    handleClose()
    {
        this.setState({Open:false})
    }

    render()
    {
        return(
            <div>
                <Button onClick = {this.handleClickOpen}>Help</Button>
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.Open}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose} >
                        Logging in 
                    </DialogTitle>
                    <DialogContent dividers >
                        <Typography gutterBottom>
                            This application uses passport's google oath2.0 strategy to log users in using their google account.
                            This allows users to have different issues on different google accounts. 
                            When logged out, the issues are public and anyone that accesses the site is able to add, delete, and edit issues.
                        </Typography>
                    </DialogContent>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Editing an issue
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            You can edit an issue by clicking the pencil icon on the row of the issue you want to edit. Once in the edit menu, you can change the issue status and effort level.
                            Once an issue has been changed to the closed status, it will appear green on the homepage.
                        </Typography>
                    </DialogContent>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Filtering issues
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            The pages first component consists of a select box that allows you to choose status to filter by. You can also specify the range of effort you would like to filter by. 
                            You can click reset to undo all filters and view all issues.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose} color="primary">
                            close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
