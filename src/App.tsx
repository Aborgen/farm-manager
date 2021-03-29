import React from 'react';

import { FarmSupplyProvider } from 'context/FarmSupply';
import { PlayerActionsProvider } from 'context/PlayerActions';
import TheUI from 'components/TheUI';
import Field from 'components/Field';
import styles from './App.module.css';

function App() {
  return (
    <PlayerActionsProvider>
    <FarmSupplyProvider>
      <div className={ styles.app }>
        <TheUI />
        <Field />
      </div>
    </FarmSupplyProvider>
    </PlayerActionsProvider>
  );
}

export default App;
