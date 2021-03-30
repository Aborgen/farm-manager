import styles from './OpenedMenu.module.css';

interface OpenedMenuProps {
  style: string,
  menu: React.ReactElement | null,
};

function OpenedMenu(props: OpenedMenuProps) {
  return (
    <>
      {
        props.menu !== null &&
        <div className={ `${styles["menu-container"]} ${props.style}` }>
          <span className={ styles["spacer-before"] }></span>
          <div className={ styles["menu-content"] }>
            { props.menu }
          </div>
          <span className={ styles["spacer-after"] }></span>
        </div>
      }
    </>
  );
}

export default OpenedMenu;
