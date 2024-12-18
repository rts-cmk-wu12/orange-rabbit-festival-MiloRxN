import { useRoutes } from 'react-router';
import routes from '~react-pages';

import './sass/reset.scss'

function App() {

  return (
    <>
      {useRoutes(routes)}
    </>
  )
}

export default App;
