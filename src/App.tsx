// @ts-nocheck
import React, { useContext } from 'react';

import { FarmSupplyProvider } from 'context/FarmSupply';
import Field from 'components/Field';

function App() {
  return (
    <FarmSupplyProvider>
      <Field />
    </FarmSupplyProvider>
  );
}

export default App;
