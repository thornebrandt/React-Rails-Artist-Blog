/*eslint-disable */
import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from'redux-devtools-dock-monitor'

const devTools = createDevTools(
	<DockMonitor 
		toggleVisibilityKey="ctrl-h"
		changePositionKey="ctrl-w"
		defaultPosition='bottom'
		defaultIsVisible={false}
	>
		<LogMonitor />
	</DockMonitor>
);

export default devTools;
/*eslint-enable */