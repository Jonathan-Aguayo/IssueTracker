import IssueAdd from './IssueAdd.jsx';
import {IssueFilter} from './IssueFilter.jsx';
import React from 'react';
import 'whatwg-fetch';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Edit} from '@material-ui/icons';
import issues from '../server/issues.js';
import { Redirect } from 'react-router';
 
const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

class IssueRow extends React.Component 
{
    constructor(props)
    {
        super();
        this.props = props;
    }
        
    
    render()
    {
    let backgroundColor = ''
    this.props.issue.status === 'Closed' ? backgroundColor = 'SeaGreen' : backgroundColor = ''
    return(
    <TableRow style={{backgroundColor : backgroundColor}}>
        <TableCell><IconButton color='secondary' onClick={() => {this.props.deleteIssue(this.props.issue._id)}}> <Delete/> </IconButton></TableCell>
        <TableCell><IconButton style={{color:'grey'}} href = {`/edit/${this.props.issue._id}`}><Edit/> </IconButton></TableCell>
        <TableCell>{this.props.issue._id}</TableCell>
        <TableCell>{this.props.issue.status}</TableCell>
        <TableCell>{this.props.issue.owner}</TableCell>
        <TableCell>{this.props.issue.created.toDateString()}</TableCell>
        <TableCell>{this.props.issue.effort}</TableCell>
        <TableCell>{this.props.issue.completionDate ?
        this.props.issue.completionDate.toDateString() : ''}</TableCell>
        <TableCell>{this.props.issue.title}</TableCell>
    </TableRow>
    );  
    } 
}

class IssueTable extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
    const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} deleteIssue={this.props.deleteIssue} />)
    return (
        <TableContainer component={Paper}>
            <Table aria-label='Simple Table'>
                <TableHead key = 'head'>
                    <TableRow key = 'titles'>
                        <TableCell component="th" scope="row"> Delete </TableCell>
                        <TableCell component="th" scope="row"> Edit</TableCell>
                        <TableCell component="th" scope="row"> ID </TableCell>
                        <TableCell component="th" scope="row"> Status </TableCell>
                        <TableCell component="th" scope="row"> Owner </TableCell>
                        <TableCell component="th" scope="row"> Created </TableCell>
                        <TableCell component="th" scope="row"> Effort </TableCell>
                        <TableCell component="th" scope="row"> Completion Date </TableCell>
                        <TableCell component="th" scope="row"> Title </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {issueRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
    }
}

export class IssueList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {issues: new Array(), mounted:false};
        this.createIssue = this.createIssue.bind(this);
        this.deleteIssue= this.deleteIssue.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    setFilter(search)
    {
        const searchParams = new URLSearchParams(search);
        this.props.history.push({ pathname: this.props.location.pathname, search:searchParams.toString() })
    }

    componentDidUpdate(prevProps) 
    {
        const oldQuery = prevProps.location.search;
        const newQuery = this.props.location.search;
        if (oldQuery === newQuery) {
        return;
        }
        this.loadData();
    }

    componentDidMount()
    {
        this.loadData();
    }

    deleteIssue(IssueID)
    {
        fetch(`/api/v1/issues/${IssueID}`, 
        {method: 'DELETE',
        headers: {'Content-Type': 'application/json '}
        }
        ).then(response => {
            if(response.ok){
                const updatedIssues = this.state.issues.filter( (value, index, arr) =>
                {
                    console.log(value);
                    return value._id != IssueID;
                });
                this.setState({issues: updatedIssues})
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    loadData()
    {
        fetch(`/api/v1/issues${this.props.location.search}`).then(response => 
            response.json()).then(data => 
            {
                console.log("Total count of records:", data._metadata.total_count);
                data.records.forEach(issue => 
                    {
                        issue.created = new Date(issue.created);
                        if (issue.completionDate)
                            issue.completionDate = new Date(issue.completionDate);
                    });
                    this.setState({ issues:data.records });
            }).catch(err => 
                {
                    alert(`Error: ${err}`)
                })
    }


    createIssue(newIssue)
    {
        fetch('/api/v1/issues', 
        {method: 'POST',
        headers: {'Content-Type': 'application/json '},
        body: JSON.stringify(newIssue),
        }).then(response => {
            if(response.ok) {
                response.json().then(updatedIssue => {updatedIssue.created = new Date(updatedIssue.created);
                if (updatedIssue.completionDate)
                    updatedIssue.completionDate = new Date (updatedIssue.completionDate);
                const newIssues = this.state.issues.concat(updatedIssue);
                this.setState({ issues: newIssues });
                });
            }
            else{
                response.json().then(error => {alert('Failed to add issue: ' + error)
                });
            }
        }).catch(err => {alert('Error in sending data to server: ' + err.message)});
    }
 
    render()
    {
        return(
            <div>
                <IssueFilter setFilter = {this.setFilter} initFilter={this.props.location.search} />
                <IssueTable deleteIssue = {this.deleteIssue} issues = {this.state.issues}/>
                <IssueAdd createIssue = {this.createIssue}/>
            </div>
        );
    }
}