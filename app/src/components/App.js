import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Popover from '@material-ui/core/Popover';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
import History from '@material-ui/icons/History';
import MoreIcon from '@material-ui/icons/MoreVert';
import Account from './Account/Account';
import SessionHistory from './SessionHistory/SessionHistory';
import Sessions from './Sessions/Sessions';
import Dialer from './Dialer/Dialer';
import SessionView from './SessionView/SessionView';

const styles = (theme) => ({
	root : {
		width  : '100%',
		height : '100%'
	},
	grow: {
		flexGrow : 1
	},
	title : {
		display                      : 'none',
		[theme.breakpoints.up('sm')] : {
			display: 'block'
		}
	},
	sectionDesktop : {
		display                      : 'none',
		[theme.breakpoints.up('md')] : {
			display                  : 'flex'
		}
	},
	sectionMobile : {
		display                      : 'flex',
		[theme.breakpoints.up('md')] : {
			display                  : 'none'
		}
	}
});

class App extends Component
{
	state =
	{
		anchorEl           : null,
		mobileMoreAnchorEl : null,
		currentMenu        : null
	};

	handleMenuOpen = (event, menu) =>
	{
		this.setState({
			anchorEl    : event.currentTarget,
			currentMenu : menu
		});
	};

	handleMenuClose = () =>
	{
		this.setState({
			anchorEl    : null,
			currentMenu : null
		});

		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = (event) =>
	{
		this.setState({ mobileMoreAnchorEl : event.currentTarget });
	};

	handleMobileMenuClose = () =>
	{
		this.setState({ mobileMoreAnchorEl : null });
	};

	render()
	{
		const {
			anchorEl,
			mobileMoreAnchorEl,
			currentMenu
		} = this.state;

		const {
			sessions,
			classes
		} = this.props;

		const isMenuOpen = Boolean(anchorEl);
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

		return (
			<div className={ classes.root }>
				<AppBar
					position='static'
					style={{ background : 'transparent', boxShadow : 'none' }}
				>
					<Toolbar>
						<Typography
							className={ classes.title }
							variant='h6'
							color='inherit'
							noWrap
						>
							SipCaller
						</Typography>
						<Dialer />
						<div className={ classes.grow } />
						<div className={ classes.sectionDesktop }>
							<IconButton
								aria-owns={ isMenuOpen && currentMenu === 'sessions' ? 'material-appbar' : undefined }
								aria-haspopup='true'
								onClick={
									(event) =>
									{
										this.handleMenuOpen(event, 'sessions');
									}
								}
								color='inherit'
							>
								<Badge badgeContent={ sessions } color='secondary'>
									<ViewCarousel />
								</Badge>
							</IconButton>
							<IconButton
								aria-owns={ isMenuOpen && currentMenu === 'history' ? 'material-appbar' : undefined }
								aria-haspopup='true'
								onClick={
									(event) =>
									{
										this.handleMenuOpen(event, 'history');
									}
								}
								color='inherit'
							>
								<History />
							</IconButton>
							<IconButton
								aria-owns={ isMenuOpen && currentMenu === 'account' ? 'material-appbar' : undefined }
								aria-haspopup='true'
								onClick={
									(event) =>
									{
										this.handleMenuOpen(event, 'account');
									}
								}
								color='inherit'
							>
								<AccountCircle />
							</IconButton>
						</div>
						<div className={ classes.sectionMobile }>
							<IconButton aria-haspopup='true' onClick={ this.handleMobileMenuOpen } color='inherit'>
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				<Popover
					anchorEl={ anchorEl }
					anchorOrigin={{ vertical : 'bottom', horizontal : 'left' }}
					transformOrigin={{ vertical : 'top', horizontal : 'left' }}
					open={ isMenuOpen }
					onClose={ this.handleMenuClose }
					getContentAnchorEl={ null }
				>
					{ currentMenu === 'sessions' ?
						<Sessions />
						:null
					}
					{ currentMenu === 'history' ?
						<SessionHistory />
						:null
					}
					{ currentMenu === 'account' ?
						<Account />
						:null
					}
				</Popover>
				<Menu
					anchorEl={ mobileMoreAnchorEl }
					anchorOrigin={{ vertical : 'bottom', horizontal : 'left' }}
					transformOrigin={{ vertical : 'bottom', horizontal : 'right' }}
					open={ isMobileMenuOpen }
					onClose={ this.handleMenuClose }
					getContentAnchorEl={ null }
				>
					<MenuItem
						onClick={
							(event) =>
							{
								this.handleMenuOpen(event, 'sessions');
							}
						}
					>
						<IconButton color='inherit'>
							<Badge badgeContent={ sessions } color='secondary'>
								<ViewCarousel />
							</Badge>
						</IconButton>
						<p>Sessions</p>
					</MenuItem>
					<MenuItem
						onClick={
							(event) =>
							{
								this.handleMenuOpen(event, 'history');
							}
						}
					>
						<IconButton color='inherit'>
							<History />
						</IconButton>
						<p>Call log</p>
					</MenuItem>
					<MenuItem
						onClick={
							(event) =>
							{
								this.handleMenuOpen(event, 'account');
							}
						}
					>
						<IconButton color='inherit'>
							<AccountCircle />
						</IconButton>
						<p>Account</p>
					</MenuItem>
				</Menu>
				<SessionView />
			</div>
		);
	}
};

App.propTypes =
{
	sessions : PropTypes.number.isRequired,
	classes  : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
({
	sessions : Object.keys(state.sessions).length
});

export default connect(mapStateToProps, null)(withStyles(styles)(App));
