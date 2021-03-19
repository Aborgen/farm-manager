interface TabMember<T> {
  identifier: T,
  name: string,
};

interface TabListProps<T> {
  members: TabMember<T>[],
  selected: T,
  setSelected: (identifier: T) => void,
};

function TabList(props: TabListProps<any>) {
  return (
    <div className="tab-list">
      {
        props.members.map((member, key) => (
          <button key={ key } className={ `tab${ member.identifier === props.selected ? " selected-button" : "" }` }
            tabIndex={ props.selected === null ? -1 : 0 }
            aria-selected={ member.identifier === props.selected }
            disabled={ member.identifier === props.selected }
            onClick={ () => props.setSelected(member.identifier) }>{ member.name }</button>
        ))
      }
    </div>
  );
}

export type { TabMember };
export default TabList;
