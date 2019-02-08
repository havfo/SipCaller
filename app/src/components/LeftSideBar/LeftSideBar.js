import React from 'react';
import Grid from '@material-ui/core/Grid';
import Info from './Me/Info/Info';
import SessionView from './Me/SessionView/SessionView';
import Sessions from './Sessions/Sessions';
import History from './History/History';

const LeftSideBar = () =>
{
	return (
		<Grid container spacing={ 8 }>
			<Grid item xs={ 12 }>
				<Info />
			</Grid>
			<Grid item xs={ 12 }>
				<SessionView />
			</Grid>
			<Grid item xs={ 12 }>
				<Sessions />
			</Grid>
			<Grid item xs={ 12 }>
				<History />
			</Grid>
		</Grid>
	);
};

export default LeftSideBar;
