import React from 'react';
import {Button} from '@material-ui/core'
import {FormControl} from '@material-ui/core'
import {InputLabel} from '@material-ui/core'
import {MenuItem} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import {Typography} from '@material-ui/core'
import {Paper} from '@material-ui/core'
import {Container} from '@material-ui/core'
export class IssueFilter extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            status: props.initFilter.status || '', 
            effortFrom: props.initFilter.effortFrom || '',
            effortTo: props.initFilter.effortTo || '',
            changed: false
        };
        this.setFilterOpen = this.setFilterOpen.bind(this);
        this.setFilterAssigned = this.setFilterAssigned.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeEffortFrom = this.onChangeEffortFrom.bind(this);
        this.onChangeEffortTo = this.onChangeEffortTo.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    setFilterOpen(e)
    {
        e.preventDefault();
        this.props.setFilter({status:'open'})
    }

    setFilterAssigned(e) 
    {
        e.preventDefault();
        this.props.setFilter({ status: 'Assigned' });
    }

    clearFilter(e) 
    {
        e.preventDefault();
        this.props.setFilter({});
    }

    onChangeStatus(e)
    {
        this.setState({status: e.target.value, changed: true})
    }

    onChangeEffortFrom(e)
    {
        this.setState({effortFrom: e.target.value, changed: true})
    }
    
    onChangeEffortTo(e)
    {
        this.setState({effortTo: e.target.value, changed: true})
    }

    clearFilter()
    {
        this.props.setFilter({});
    }

    applyFilter()
    {
        const newFilter = {};
        if (this.state.status) newFilter.status = this.state.status;
        if (this.state.effortFrom) newFilter.effortFrom = this.state.effortFrom;
        if (this.state.effortTo) newFilter.effortTo = this.state.effortTo;
        this.props.setFilter(newFilter);
    }

    render()
    {
        const Separator = () =><span> | </span>;
        return(
            <Container component = {Paper} style = {{marginLeft:0, marginBottom:'10px'}} maxWidth = {false}>
                <FormControl>
                    <InputLabel id='statusLabel'>Status</InputLabel>
                    <Select value = {this.state.status} label='Status' labelid='statusLabel' id='status' onChange = {this.onChangeStatus} style={{minWidth:'110px',}}>
                        <MenuItem value={''}>Any</MenuItem>
                        <MenuItem value={'New'}>New</MenuItem>
                        <MenuItem value={'Open'}>Open</MenuItem>
                        <MenuItem value={'Assigned'}>Assigned</MenuItem>
                        <MenuItem value={'Fixed'}>Fixed</MenuItem>
                        <MenuItem value={'Verified'}>Verified</MenuItem>
                        <MenuItem value={'Closed'}>Closed</MenuItem>
                    </Select>
                </FormControl>
                
                <FormControl>
                    <InputLabel id='effortFromLabel'>Effort from</InputLabel>
                    <Select value = {this.state.effortFrom} label='effortFrom' labelid='effortFromLabel' id='effortFrom' onChange = {this.onChangeEffortFrom} style={{minWidth:'110px'}}>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
                
                <FormControl>
                    <InputLabel id='effortToLabel'>Effort To</InputLabel>
                    <Select value = {this.state.effortTo} label='effortTo' labelid='effortTo' id='effortto' onChange = {this.onChangeEffortTo} style={{minWidth:'110px'}}>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
                
                <Button onClick={this.clearFilter} variant='outlined' style = {{verticalAlign:'Bottom'}}> reset </Button>
                <Button onClick={this.applyFilter} variant='outlined' style = {{verticalAlign:'Bottom'}}> Apply </Button>
            </Container>
        );
    }
}