import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import Center from './Center/Center';

const styles = () => ({
	root : {
		flexGrow : 1,
		margin   : '0.5rem'
	}
});

const App = (props) =>
{
	const { classes } = props;

	return (
		<div className={ classes.root }>
			<Grid container spacing={ 8 }>
				<Grid item xs={ 3 }>
					<LeftSideBar />
				</Grid>
				<Grid item xs={ 9 }>
					<Center />
				</Grid>
			</Grid>
		</div>
	);
};

App.propTypes = {
	classes : PropTypes.object.isRequired
};

export default withStyles(styles)(App);
