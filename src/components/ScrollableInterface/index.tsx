import React from 'react';

import styles from './ScrollableInterface.module.css';

interface ScrollableInterfaceProps {
  children: React.ReactNode,
  width: string,
  height: string,
};

function ScrollableInterface(props: ScrollableInterfaceProps) {
  return (
    <div className={ styles["display-container"] } style={ {width: props.width, height: props.height} }>
      <div className={ styles["display"] }>
        { props.children }
      </div>
      <div className={ styles["scroll-bar-decoration"] }>..........</div>
    </div> 
  );
}

export default ScrollableInterface;
