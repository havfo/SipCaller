import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	setRequestUri
} from '../../../actions/stateActions';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	paper: {
		padding : theme.spacing.unit * 2,
		height  : '30vh'
	}
});

const History  = (props) =>
{
	const {
		sessionHistory,
		setRequestUri,
		classes
	} = props;

	return (
		<Paper className={classes.paper}>
			<Typography variant='h6'>
				Call log
			</Typography>
			<List>
				{ sessionHistory.map((entry, index) =>
				{
					return (
						<ListItem
							key={ index }
							button
							onClick=
							{
								() =>
								{
									setRequestUri(entry.sipUri);
								}
							}
						>
							<ListItemText
								primary={ entry.displayName }
								secondary={ entry.sipUri }
							/>
						</ListItem>
					);
				})}
			</List>
		</Paper>
	);
};

History.propTypes =
{
	sessionHistory : PropTypes.array.isRequired,
	setRequestUri  : PropTypes.func.isRequired
};

const mapStateToProps = state =>
({
	sessionHistory : state.sessionHistory
});

const mapDispatchToProps = dispatch =>
({
	setRequestUri : (requestUri) => dispatch(setRequestUri({ requestUri }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(History));
