interface TabMember<T> {
  identifier: T,
  name: string,
};

interface TabListProps<T> {
  members: TabMember<T>[],
  selected: T,
  handleClick: Function,
};
function TabList(props: TabListProps<any>) {
  return (
    <div className="tab-list">
      {
        props.members.map((member, key) => (
          <button key={ key } className={ `tab${ member.identifier === props.selected ? " selected-button" : "" }` }
            onClick={ () => props.handleClick(member.identifier) }>{ member.name }</button>
        ))
      }
    </div>
  );
}

export type { TabMember };
export default TabList;
