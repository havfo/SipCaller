import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MediaView extends Component
{
	constructor(props)
	{
		super(props)

		this._mediaStream = null;
	}

	render()
	{
		return (
			<video
				ref='video'
				autoPlay
				playsInline
			/>
		);
	}

	componentDidMount()
	{
		const { mediaStream } = this.props;

		this._setStream(mediaStream);
	}

	componentWillReceiveProps(nextProps)
	{
		const { mediaStream } = nextProps;

		this._setStream(mediaStream);

	}

	_setStream(mediaStream)
	{
		if (this._mediaStream === mediaStream ) return;

		this._mediaStream = mediaStream;

		const { video } = this.refs;

		if ( mediaStream )
		{
			video.srcObject = mediaStream;
		}
		else
		{
			video.srcObject = null;
		}
	}
};

MediaView.propTypes =
{
	mediaStream : PropTypes.any
};

export default MediaView;