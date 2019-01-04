/**
 *
 * Asynchronously loads the component for IcoList
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
