import { fork } from 'redux-saga/effects';
import { sagaMiddleware } from './configureStore';

import AppSaga from './containers/App/saga';
import CreateIcoSaga from './containers/CreateIco/saga';
import EditIcoSaga from './containers/EditIcoPage/saga';
import IcoDetailSaga from './containers/IcoDetailPage/saga';
import IcoListSaga from './containers/IcoList/saga';
import InfoSaga from './containers/InfoPage/saga';
import RedirectHandlerSaga from './containers/RedirectHandler/saga';

function* root() {
  yield fork(AppSaga);
  yield fork(CreateIcoSaga);
  yield fork(EditIcoSaga);
  yield fork(IcoDetailSaga);
  yield fork(IcoListSaga);
  yield fork(InfoSaga);
  yield fork(RedirectHandlerSaga);
}

const run = () => sagaMiddleware.run(root);

export default run;
