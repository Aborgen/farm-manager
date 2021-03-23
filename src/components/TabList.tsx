interface TabMember<T> {
  identifier: T,
  name: string,
};

interface TabListProps<T> {
  members: TabMember<T>[],
  selected: T | null,
  setSelected: (identifier: T | null) => void,
  tabsAreToggleButtons: boolean,
};

// When tabsAreToggleButtons prop is true, clicking on an already selected tab causes the selected tab to be set to null in parent.
function TabList<T>(props: TabListProps<T>) {
  function handleClick(identifier: T) {
    if (props.tabsAreToggleButtons && props.selected === identifier) {
      props.setSelected(null);
    }
    else {
      props.setSelected(identifier);
    }
  }

  return (
    <div className="tab-list">
      {
        props.members.map((member, key) => (
          <button key={ key } className={ `tab${ member.identifier === props.selected ? " selected-button" : "" }` }
            onClick={ () => handleClick(member.identifier) }
            tabIndex={ props.selected === null ? -1 : 0 }
            aria-selected={ member.identifier === props.selected }
            disabled={ !props.tabsAreToggleButtons && member.identifier === props.selected }>
          { member.name }
          </button>
        ))
      }
    </div>
  );
}

export type { TabMember };
export default TabList;
