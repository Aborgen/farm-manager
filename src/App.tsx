import React, { useContext } from 'react';

import { FarmSupplyProvider } from 'context/FarmSupply';
import { PlayerActionsProvider } from 'context/PlayerActions';
import TheUI from 'components/TheUI';
import Field from 'components/Field';

function App() {
  return (
    <PlayerActionsProvider>
    <FarmSupplyProvider>
      <TheUI />
      <Field />
    </FarmSupplyProvider>
    </PlayerActionsProvider>
  );
}

export default App;
