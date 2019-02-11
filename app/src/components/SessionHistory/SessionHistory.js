import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as stateActions from '../../actions/stateActions';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = (theme) =>
	({
		paper :
		{
			padding : theme.spacing.unit * 2
		}
	});

const SessionHistory = (props) =>
{
	const {
		sessionHistory,
		setRequestUri,
		classes
	} = props;

	return (
		<Paper className={classes.paper}>
			{ sessionHistory.length > 0 ?
				<List>
					{ sessionHistory.map((entry, index) =>
					{
						return (
							<ListItem
								key={index}
								button
								onClick={() => setRequestUri(entry.sipUri)}
							>
								<ListItemText
									primary={entry.displayName}
									secondary={entry.sipUri}
								/>
							</ListItem>
						);
					})}
				</List>
				:
				<Typography
					color='inherit'
					noWrap
				>
					No history
				</Typography>
			}
		</Paper>
	);
};

SessionHistory.propTypes =
{
	sessionHistory : PropTypes.array.isRequired,
	setRequestUri  : PropTypes.func.isRequired,
	classes        : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		sessionHistory : state.sessionHistory
	});

const mapDispatchToProps = (dispatch) =>
	({
		setRequestUri : (requestUri) => dispatch(
			stateActions.setRequestUri({ requestUri }))
	});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(SessionHistory));
