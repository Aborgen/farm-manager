import React, { useContext } from 'react';

import { FarmSupplyProvider } from 'context/FarmSupply';
import TheUI from 'components/TheUI';
import Field from 'components/Field';

function App() {
  return (
    <FarmSupplyProvider>
      <TheUI />
      <Field />
    </FarmSupplyProvider>
  );
}

export default App;
