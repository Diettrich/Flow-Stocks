import React from 'react';

type Props = {
  executionTime: number;
};

export default function TimeConsumed(props: Props) {
  return (
    <div className="h-16 flex items-center">
      temps total d&apos;execution: {(props.executionTime / 1000).toFixed(3)}{' '}
      secondes
    </div>
  );
}
