import jsCookie from 'js-cookie';

const USER_COOKIE = 'sipcaller.user';
const DEVICES_COOKIE = 'sipcaller.devices';

export function getUser()
{
	return jsCookie.getJSON(USER_COOKIE);
}

export function setUser({
	displayName,
	sipAddress,
	password,
	outboundProxy,
	autoRegister
})
{
	jsCookie.set(USER_COOKIE, {
		displayName,
		sipAddress,
		password,
		outboundProxy,
		autoRegister
	});
}

export function getDevices()
{
	return jsCookie.getJSON(DEVICES_COOKIE);
}

export function setDevices({ videoEnabled })
{
	jsCookie.set(DEVICES_COOKIE, { videoEnabled });
}
