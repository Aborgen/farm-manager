import { Crop, GrowthStage } from 'types/Crops';

interface RowProps {
  crop: Crop,
  stage: GrowthStage,
}

function Row(props: RowProps) {
  return (
    <div className={ `${props.crop}-${props.stage}-row` }>
      <span className={ props.crop }>{ props.crop }, stage {props.stage}</span>
    </div>
  );
}

export type { RowProps };
export default Row;
