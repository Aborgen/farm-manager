import { Crop, GrowthStage } from 'types/Crops';

type RowProps = {
  crop: Crop,
  stage: GrowthStage,
}

function Row(props: RowProps) {
  return (
    <div className={ `${props.crop}-${props.stage}-row` }>
      <span className={ props.crop }>
        { props.crop }, stage {props.stage}
      </span>
    </div>
  );
}

function DefaultRow() {
  return (
    <div className="empty-row">
      <span>empty!</span>
    </div>
  );
}

export type { RowProps };
export { Row, DefaultRow };
