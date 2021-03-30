import { usePlayerActionsContext } from 'context/PlayerActions';
import MenuTabs from './internal/MenuTabs';
import SeedList from './internal/SeedList';
import styles from './TheUI.module.css';

function TheUI() {
  const playerContext = usePlayerActionsContext();
  function clearFocus() {
    playerContext.clearFocus();
  }

  return (
    <div className={ styles.ui }>
      <MenuTabs />
      <SeedList />
      { playerContext.state.focus && <button onClick={ () => clearFocus() }>clear focus</button> }
    </div>
  );
}

export default TheUI;
