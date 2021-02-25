type SellDialogueProps = {
  sell: Function,
};

function SellDialogue(props: SellDialogueProps) {
  return (
    <section className="sell-dialogue dialogue">
      <button onClick={ () => props.sell() }>sell</button>
    </section>
  );
}

export default SellDialogue;
